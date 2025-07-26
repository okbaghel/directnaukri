import jwt from "jsonwebtoken";

export function checkAdminAuth(req) {
  const token = req.cookies.get("admin-token")?.value;

  if (!token) return false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.admin === true;
  } catch {
    return false;
  }
}
