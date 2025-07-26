import { sendOtpHandler } from "@/backend/controllers/authController";

export async function POST(req) {
  return sendOtpHandler(req);
}
