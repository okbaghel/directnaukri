import { verifyRazorpayPayment } from "@/backend/controllers/paymentController";

export async function POST(req) {
  return verifyRazorpayPayment(req);
}
