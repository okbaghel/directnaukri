import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/admin/login"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/ routes except /admin/login
  if (pathname.startsWith("/admin") && !PUBLIC_PATHS.includes(pathname)) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      // Verify JWT (same secret used in your login API)
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next(); // Allow everything else
}
