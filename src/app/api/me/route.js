import { connectDB } from "@/backend/lib/db";
import User from "@/backend/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

   // ✅ Must await cookies() in App Router
  const cookieStore =await cookies(); 
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  let isStillSubscribed = user.subscribed;
    if (
      user.subscribed &&
      user.subscriptionExpiresAt &&
      new Date(user.subscriptionExpiresAt) < new Date()
    ) {
      isStillSubscribed = false;
      user.subscribed = false;
      await user.save(); // ❗ important: update in DB
    }

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        subscribed: isStillSubscribed, // ← use this if you want auto-expiry logic
        // subscribed: user.subscribed, ← or use this if you're not auto-expiring
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
