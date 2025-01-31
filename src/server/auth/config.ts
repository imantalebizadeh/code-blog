import type { DefaultSession, NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { compare } from "bcryptjs";

import prisma from "@/server/prisma";

import { signInFormSchema } from "@/lib/schemas/auth";
import { generateUsername } from "@/utils/generate-username";

// The `JWT` interface can be found in the `next-auth/jwt` submodule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id */
      id: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const { email, password } =
          await signInFormSchema.parseAsync(credentials);

        const user = await prisma.user.findUnique({ where: { email } });

        if (user && user.password) {
          const isPasswordMatches = await compare(password, user.password);

          if (!isPasswordMatches) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  events: {
    async signIn({ user, account }) {
      if (user && account?.provider === "google") {
        const data = await prisma.user.findUnique({
          where: { id: user.id },
          select: { username: true },
        });

        if (!data?.username) {
          await prisma.user.update({
            where: { id: user.id },
            data: { username: await generateUsername(user.name!) },
          });
        }
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    },
  },
} satisfies NextAuthConfig;
