import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Hardcoded admin credentials (can replace with DB later)
const ADMIN = {
  email: "yogesh@gmail.com",
  password: "Yogesh@123", // change this later!
};

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (email === ADMIN.email && password === ADMIN.password) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
