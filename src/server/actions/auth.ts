"use server";

import { AuthError } from "next-auth";

import { nextAuthSignIn } from "../auth";
import prisma from "../db";
import { hash } from "bcryptjs";

import { action } from "@/lib/action.client";
import { generateUniqueUsername } from "@/lib/utils";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";

export const signIn = action(signInSchema, async ({ email, password }) => {
  try {
    await nextAuthSignIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "ایمیل یا رمز عبور اشتباه است" };

        default:
          return { error: "خطای نامشخص, لطفا مجددا تلاش کنید" };
      }
    }

    throw err;
  }
});

export const signUp = action(
  signUpSchema,
  async ({ name, email, password }) => {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) return { error: "این ایمیل قبلا ثبت شده است" };

    try {
      const passwordHash = await hash(password, 10);
      const username = generateUniqueUsername(name);

      await prisma.user.create({
        data: {
          name,
          username,
          email,
          image: "/assets/user-avatar.png",
          password: passwordHash,
        },
      });
    } catch (error) {
      console.error(error);
      return { error: "خطای نامشخص, لطفا مجددا تلاش کنید" };
    }

    await signIn({ email, password });
  },
);

export const githubSignIn = async () => {
  await nextAuthSignIn("github", { redirectTo: "/" });
};
