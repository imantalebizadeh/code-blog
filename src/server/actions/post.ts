"use server";

import { revalidatePath } from "next/cache";

import prisma from "../db";
import { z } from "zod";

import { action, authAction } from "@/lib/action.client";
import { postFormSchema } from "@/lib/validations/post";

const createPostSchema = postFormSchema.extend({
  image: z.string().url(),
});

export const createPost = authAction(createPostSchema, async (values, user) => {
  const { title, content, category, image } = values;

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        cover_image: image,
        author: {
          connect: {
            id: user.id,
          },
        },
        category: {
          connect: {
            id: category,
          },
        },
      },
    });

    revalidatePath("/profile");
  } catch (error) {
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});

export const removePost = action(
  z.object({ postId: z.string() }),
  async ({ postId }) => {
    try {
      await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      revalidatePath("/profile");
    } catch (error) {
      console.error(error);
      throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
    }
  },
);

export const updatePost = action(z.object({}), async () => {});
