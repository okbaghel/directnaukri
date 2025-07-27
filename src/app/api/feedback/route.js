import { NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db";
import Feedback from "@/backend/models/Feedback";

// Handle POST request to save chatbot feedback
export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await req.json();

   const {
  wantIncrease,
  hiredFromPlatform,
  hrDetails,
  yourDetails,
} = body;



    // Basic validation
    if (!wantIncrease || !hiredFromPlatform || !hrDetails || !yourDetails) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Save feedback to MongoDB
    await Feedback.create({
      wantIncrease,
      hiredFromPlatform,
      hrDetails,
      yourDetails,
    });

    return NextResponse.json(
      { message: "Feedback successfully saved." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Feedback API Error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
