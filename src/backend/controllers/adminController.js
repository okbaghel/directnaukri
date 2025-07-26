import { connectDB } from "../lib/db";
import Job from "../models/Job";
import { NextResponse } from "next/server";

// Add new job
export async function addJob(req) {
  await connectDB();
  const body = await req.json();

  const job = await Job.create(body);
  return NextResponse.json({ job });
}

// Get all active jobs
export async function getAllJobs(req) {
  await connectDB();

  const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
  return NextResponse.json({ jobs });
}
