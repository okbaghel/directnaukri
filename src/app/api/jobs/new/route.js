import { createJob } from "@/backend/controllers/jobController";

export async function POST(req) {
  return createJob(req);
}
