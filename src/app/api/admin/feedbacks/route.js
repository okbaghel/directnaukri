import { NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db";
import Feedback from "@/backend/models/Feedback"; // your feedback model path

export async function GET() {
  try {
    await connectDB();

    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}
