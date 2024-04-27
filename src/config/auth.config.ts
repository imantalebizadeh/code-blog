import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import { compare } from "bcryptjs";

import prisma from "@/server/db";

import { signInSchema } from "@/lib/validations/auth";

export default {
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        const passwordMatch = await compare(password, user?.password || "");

        if (!user || !passwordMatch) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
