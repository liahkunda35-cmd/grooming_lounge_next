import { NextResponse } from "next/server";
import { destroySession, SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  await destroySession();

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
