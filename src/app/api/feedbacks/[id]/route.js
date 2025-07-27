import { NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db";
import Feedback from "@/backend/models/Feedback";

// DELETE /api/feedbacks/[id]
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return NextResponse.json({ success: false, message: "Feedback not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
