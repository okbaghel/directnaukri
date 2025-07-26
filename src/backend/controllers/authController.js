import { connectDB } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
// import { sendOTP } from "../utils/sendOTP";
// import {verifyOTP} from "../utils/verifyToken";
import { NextResponse } from "next/server";

// ========== Register with Email ==========
export async function register(req) {
  await connectDB();
  const { name, email, password } = await req.json();
  console.log(email);

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "Email already used" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return NextResponse.json({ message: "Registered" });
}

// ========== Login with Email ==========
export async function login(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = generateToken(user._id);
  const res = NextResponse.json({ message: "Logged in" });
  res.cookies.set("token", token, { httpOnly: true });
  return res;
}

// ========== Send OTP to Phone ==========


// ========== Verify OTP & Login/Register ==========

