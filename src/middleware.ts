import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "./config/auth.config";

const { auth } = NextAuth(authConfig);

export const authRoutes: readonly string[] = ["/login", "/sign-up"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && authRoutes.includes(nextUrl.pathname)) return;

  if (isLoggedIn && nextUrl.pathname.startsWith("/profile")) {
    return;
  }

  return NextResponse.redirect(new URL("/", nextUrl));
});

export const config = {
  matcher: ["/login", "/sign-up", "/profile/:path*"],
};
