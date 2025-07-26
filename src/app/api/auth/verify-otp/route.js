import { verifyOtpHandler } from "@/backend/controllers/authController";

export async function POST(req) {
  return verifyOtpHandler(req);
}
