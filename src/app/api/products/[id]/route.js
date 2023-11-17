import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";
const client = await pool.connect();

export const PUT = async (req, res) => {
  const payload = await req.json();
  payload.id = res.params.id;
  try {
    if (!payload.name || !payload.product_detail) {
      return NextResponse.json(
        { error: "Invalid field", isSuccess: false },
        { status: 400 }
      );
    } else {
      const existingProduct = await client.query(
        "SELECT id FROM products WHERE name = $1 AND id != $2",
        [payload.name, payload.id]
      );

      if (existingProduct.rows.length > 0) {
        return NextResponse.json(
          { error: "Product name already exists", isSuccess: false },
          { status: 400 }
        );
      }

      await client.query(
        "UPDATE products SET name = $1, product_detail = $2 WHERE id = $3",
        [payload.name, payload.product_detail, payload.id]
      );

      return NextResponse.json(
        { data: "Product Update Deleted", isSuccess: true },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", isSuccess: false },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, res) => {
  const id = res.params.id;
  try {
    const user = await client.query("DELETE FROM products WHERE id = $1", [id]);
    if (user.rowCount === 0) {
      return NextResponse.json(
        { error: "DATA NOT FOUND", isSuccess: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { data: "Product Successfully Deleted", isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", isSuccess: false },
      { status: 500 }
    );
  }
};
