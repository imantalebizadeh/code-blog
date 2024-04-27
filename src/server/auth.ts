import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { generateUniqueUsername } from "@/lib/utils";

import authConfig from "@/config/auth.config";

import prisma from "./db";

export const {
  handlers,
  auth,
  signIn: nextAuthSignIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.username = token.username;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.email) return token;

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (!dbUser) {
        if (user) {
          token.sub = user?.id;
        }
        return token;
      }

      /*
        Check if user doesn't have a username then
        generate a unique username when user signs in with oauth providers
      */
      if (!dbUser.username) {
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { username: generateUniqueUsername(dbUser.name!) },
        });
      }

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.username = dbUser.username!;
      token.role = dbUser.role;

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  ...authConfig,
});
