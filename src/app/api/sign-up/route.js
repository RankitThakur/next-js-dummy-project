import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

let client = await pool.connect();
export const POST = async (req, res) => {
  const payload = await req.json();
  try {
    const exitingUser = await client.query(
      "SELECT * FROM signUser where email = $1",
      [payload.email]
    );
    if (exitingUser?.rows?.length > 0) {
      return NextResponse.json(
        {
          error: "email is already exists",
          isSuccss: false,
        },
        { status: 400 }
      );
    }
    const newUser = await client.query(
      "INSERT INTO signUser (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [payload.name, payload.email, payload.password]
    );
    return NextResponse.json({ data: "test", isSuccss: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error", isSuccss: false },
      { status: 500 }
    );
  }
};
