// src/app/api/auth/login/route.js
import { login } from "@/backend/controllers/authController";

export async function POST(req) {
  return login(req);
}
