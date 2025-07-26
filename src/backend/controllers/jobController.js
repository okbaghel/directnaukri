// src/backend/controllers/jobController.js
import { connectDB } from "../lib/db";
import Job from "../models/Job";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ⬅️ Admin - Create Job
export async function createJob(req) {
  await connectDB();
  const data = await req.json();

  const job = await Job.create(data);
  return NextResponse.json({ job });
}

// ⬅️ Public - Get All Jobs (with filters)
export async function getJobs(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q") || "";
  const category = searchParams.get("category");

  const query = {
    ...(keyword && {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    }),
    ...(category && { category }),
  };

  const jobs = await Job.find(query).sort({ createdAt: -1 });
  return NextResponse.json(jobs);
}

// ⬅️ Public - Get Job Detail by ID (with validation)
export async function getJobById(req, { params }) {
  await connectDB();
  const { id } =await params;

  // ✅ Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
  }

  const job = await Job.findById(id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
