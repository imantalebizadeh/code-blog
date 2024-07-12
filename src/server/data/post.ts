import { cache } from "react";

import prisma from "../db";

export const getPosts = cache(
  async ({ limit, skip }: { limit?: number; skip?: number }) => {
    try {
      const posts = await prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { author: true, category: true },
      });
      return posts;
    } catch (error) {
      console.error(error);
      throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
    }
  },
);

export const getPostsCount = async () => await prisma.post.count();

export const getPostById = cache(async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});

export const getAllCategories = cache(async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});
