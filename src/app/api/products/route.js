import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

const client = await pool.connect();

export const GET = async (req, res) => {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = req.query?.pageSize || 10;
  const offset = (page - 1) * pageSize;
  try {
    const result = await client.query(
      "SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2",
      [pageSize, offset]
    );
    console.log(result);
    const totalCount = await client.query("SELECT COUNT(*) FROM products");
    const totalItems = Number(totalCount.rows[0].count);
    const totalPages = Math.ceil(totalItems / pageSize);
    const responseData = {
      data: result.rows,
      metadata: {
        pageSize: pageSize,
        totalItems: totalItems,
        totalPages: totalPages,
        nextPage: null,
        currentPage: page,
      },
    };

    if (page < totalPages) {
      responseData.metadata.nextPage = page + 1;
    }
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  }
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
