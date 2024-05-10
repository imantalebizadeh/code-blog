"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../auth";
import { getUserByUsername } from "../data/user";
import prisma from "../db";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

import { action, authAction } from "@/lib/action.client";
import { userSchema } from "@/lib/validations/user";

const imageSchema = z.string().url();

//Check this action
export const updateUserImage = action(imageSchema, async (image) => {
  const session = await auth();

  await prisma.user.update({
    where: { username: session?.user.username },
    data: { image },
  });

  revalidatePath("/profile");
});

export const updateUser = action(
  userSchema,
  async ({ name, email, username, bio }) => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { username: true },
    });

    if (user && user.username !== username) {
      const userExistByUsername = await prisma.user.findUnique({
        where: { username },
        select: { username: true },
      });

      if (userExistByUsername) {
        throw new Error("این نام کاربری قبلا ثبت شده است");
      }
    }

    await prisma.user.update({
      where: { email },
      data: {
        name,
        email,
        username,
        bio,
      },
    });

    revalidatePath("/profile");
  },
);

export const updateUserPassword = authAction(
  z.object({ currentPassword: z.string(), newPassword: z.string() }),
  async ({ currentPassword, newPassword }, { username }) => {
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error("کاربر یافت نشد");
    }

    if (!user.password) {
      const passwordHash = await hash(newPassword, 10);

      await prisma.user.update({
        where: { username },
        data: { password: passwordHash },
      });
    } else {
      const passwordMatch = await compare(currentPassword, user.password);

      if (!passwordMatch) {
        throw new Error("رمز عبور وارد شده اشتباه است");
      }

      const passwordHash = await hash(newPassword, 10);

      await prisma.user.update({
        where: { username },
        data: { password: passwordHash },
      });
    }

    revalidatePath("/profile");
  },
);
