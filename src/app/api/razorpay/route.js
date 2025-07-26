import { createRazorpayOrder } from "@/backend/controllers/paymentController";

export async function POST(req) {
  return createRazorpayOrder(req);
}
