// src/backend/middleware/authMiddleware.js
import { verifyToken } from "../utils/verifyToken";
import { NextResponse } from "next/server";

export async function isAuthenticated(req) {
  const token = req.cookies.get("token")?.value;
  const user = token && verifyToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return user;
}
