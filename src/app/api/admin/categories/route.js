import { NextResponse } from "next/server";
import { Category } from "@/backend/models/Category";
import { connectDB } from "@/backend/lib/db";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json({ categories });
}

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();
  const category = await Category.create({ name });
  return NextResponse.json({ category });
}
