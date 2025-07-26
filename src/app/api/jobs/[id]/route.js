import { getJobById } from "@/backend/controllers/jobController";

export async function GET(req, context) {
  return getJobById(req, context);
}
