/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware only to admin paths
};