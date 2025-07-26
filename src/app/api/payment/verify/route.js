// src/app/api/payment/verify/route.js
import { connectDB } from "@/backend/lib/db";
import User from "@/backend/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  // ✅ Step 1: Verify payment signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
  }

  // ✅ Step 2: Get logged in user
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: "Login required" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, {
      subscribed: true,
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("JWT decode failed", err);
    return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
  }
}
