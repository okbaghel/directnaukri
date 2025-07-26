import { getJobs } from "@/backend/controllers/jobController";

export async function GET(req) {
  return getJobs(req);
}
