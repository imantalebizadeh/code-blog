import { NextResponse } from "next/server";

import NextAuth from "next-auth";

import authConfig from "@/server/auth/config";

const { auth } = NextAuth(authConfig);

export const authRoutes: string[] = ["/sign-in", "/sign-up"];

export const protectedRoutes: string[] = [
  "/profile/:path*",
  "/edit/:path*",
  "/create",
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && authRoutes.includes(nextUrl.pathname)) return;

  if (isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) return;

  return NextResponse.redirect(new URL("/", nextUrl));
});

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/profile/:path*",
    "/create",
    "/edit/:path*",
  ],
};
