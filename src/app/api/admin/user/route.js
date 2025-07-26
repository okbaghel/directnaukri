// app/api/admin/users/route.js

import { NextResponse } from "next/server";
import User from "@/backend/models/User";
import { connectDB } from "@/backend/lib/db";

console.log("api file loaded");

export async function GET() {
  try {
    await connectDB();
    console.log("connected in user api");

    const users = await User.find();
    console.log(users.length);
    console.log("yes continue");

    return NextResponse.json(users );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
