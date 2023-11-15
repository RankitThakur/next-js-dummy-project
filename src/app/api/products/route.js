import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

const client = await pool.connect();

export const GET = async (req, res) => {
  const data = await client.query("SELECT * FROM products");
  console.log(data);
  return NextResponse.json(data.rows, { status: 200 });
};

export const POST = async (req, res) => {
  const payload = await req.json();
  if (!payload.name || !payload.product_detail) {
    return NextResponse.json({ error: "Product not added" }, { status: 404 });
  } else {
    const newProduct = await client.query(
      "INSERT INTO products (name,product_detail ) VALUES ($1, $2) RETURNING *",
      [payload.name, payload.product_detail]
    );
    return NextResponse.json(
      { data: newProduct, success: true },
      { status: 201 }
    );
  }
};
