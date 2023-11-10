import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import pool from "../../../../utils/db";
import uid from "uid";

const client = await pool.connect();

export const POST = async (req, res) => {
  // const secretKey = uid(32);
  const { email, password } = await req.json();
  if (email && password) {
    const result = await client.query(
      "SELECT * FROM signUser where email = $1",
      [email]
    );
    const user = result.rows[0];
    if (user.password !== password) {
      return NextResponse.json(
        { message: "invaild credantial" },
        { status: 404 }
      );
    }
    const token = sign(
      { userId: user.id, username: user.username },
      "secretKey",
      {
        expiresIn: "1h",
      }
    );
    return NextResponse.json(
      { result: "Login Successful", accessToken: token },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "error" }, { status: 404 });
  }
};
