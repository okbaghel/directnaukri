import { connectDB } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { sendOTP } from "../utils/sendOTP";
import {verifyOTP} from "../utils/verifyToken";
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
export async function sendOtpHandler(req) {
  await connectDB();
  const { phone } = await req.json();

  const otp = await sendOTP(phone); // generated & stored in memory
  console.log(`OTP sent to ${phone}: ${otp}`); // log or integrate SMS here

  return NextResponse.json({ success: true, message: "OTP sent" });
}

// ========== Verify OTP & Login/Register ==========
export async function verifyOtpHandler(req) {
  await connectDB();
  const { phone, otp } = await req.json();

  const valid = await verifyOTP(phone, otp);
  if (!valid) {
    return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 401 });
  }

  // Find or create user
  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });

  const token = generateToken(user._id);
  const res = NextResponse.json({ success: true, user });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return res;
}
