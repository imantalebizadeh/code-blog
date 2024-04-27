import NextAuth, { type DefaultSession } from "next-auth";
import type { Role } from "@prisma/client";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: Role;
    username: string;
  }
}
