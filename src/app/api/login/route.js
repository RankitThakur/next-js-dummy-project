import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import pool from "../../../../utils/db";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  if (email && password) {
    const result = await pool.query("SELECT * FROM signUser WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];
    console.log(user);
    console.log(password);

    if (!user || !password === user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";

    const token = sign(
      { userId: user.id, username: user.username },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json(
      { result: "Login Successful", accessToken: token },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
};
