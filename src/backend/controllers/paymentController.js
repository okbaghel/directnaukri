import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "../lib/db";
import User from "../models/User";
import { cookies } from "next/headers"; // ✅ FIX for App Router cookies
import jwt from "jsonwebtoken"; // ✅ Needed to decode token

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
export async function createRazorpayOrder() {
  const options = {
    amount: 9900, // ₹99 in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  const order = await razorpay.orders.create(options);
  return NextResponse.json({ order });
}

// ✅ Verify Razorpay Payment & Activate Subscription
export async function verifyRazorpayPayment(req) {
  await connectDB();
  const body = await req.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
  }

  // ✅ FIX: Use cookies() from App Router to get token
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, error: "Login required" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  // ✅ Update user with subscription status and expiry
  await User.findByIdAndUpdate(userId, {
    subscribed: true,
    subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  return NextResponse.json({ success: true });
}
