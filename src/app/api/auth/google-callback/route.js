// src/app/api/auth/google-callback/route.js
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db";
import User from "@/backend/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  await connectDB(); // ✅ Ensure DB connected

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }


const origin = `${url.protocol}//${url.host}`;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${origin}/api/auth/google-callback` // Dynamic!
);


  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    const { name, email, picture } = data;

    // ✅ 1. Check if user already exists in DB
    let user = await User.findOne({ email });

    // ✅ 2. If not, create a new user (signup)
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        subscribed: false,
      });
    }

    // ✅ 3. Create JWT with MongoDB _id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ 4. Set JWT as HttpOnly cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "lax",
      path: "/",
    });

    // ✅ 5. Redirect user to homepage or dashboard
   const redirectOrigin = `${url.protocol}//${url.host}`;
return NextResponse.redirect(`${redirectOrigin}/jobs`);
// Change in production
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
