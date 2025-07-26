import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Job from "@/backend/models/Job";
import {connectDB} from "@/backend/lib/db";



// Token check middleware
function verifyAdminToken(req) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// GET all jobs
export async function GET(req) {
  await connectDB();
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const jobs = await Job.find();
  return NextResponse.json({ jobs });
}

// POST a job
export async function POST(req) {
  await connectDB();
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const job = await Job.create(body);
  return NextResponse.json({ job });
}

// DELETE a job
export async function DELETE(req) {
  await connectDB();
  const admin = verifyAdminToken(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  await Job.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
