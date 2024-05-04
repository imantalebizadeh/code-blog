"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../auth";
import prisma from "../db";
import { z } from "zod";

import { action } from "@/lib/action.client";

const imageSchema = z.string().url();

export const updateUserImage = action(imageSchema, async (image) => {
  const session = await auth();

  await prisma.user.update({
    where: { username: session?.user.username },
    data: { image },
  });

  revalidatePath("/profile");
});
