import { cache } from "react";

import prisma from "../db";
import { User } from "@prisma/client";

type getPostsParams = {
  limit?: number;
  skip?: number;
  filter?: {
    category?: string;
    search?: string;
  };
};

export const getAuthorById = cache(async (id: string) => {
  const author = await prisma.user.findUnique({
    where: { id },
  });

  return author;
});

export const getPosts = cache(async (params: getPostsParams) => {
  const { limit, skip, filter } = params;

  let posts;

  try {
    if (filter?.search || filter?.category) {
      posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              category: {
                name: filter?.category,
              },
            },
            {
              title: {
                contains: filter?.search,
              },
            },
          ],
        },
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        include: { author: true, category: true },
      });
    } else {
      posts = await prisma.post.findMany({
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        include: { author: true, category: true },
      });
    }

    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});

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
