import { cache } from "react";

import prisma from "../db";
import { Prisma } from "@prisma/client";

export const getPostsData = async (args: Prisma.PostFindManyArgs) =>
  await prisma.post.findMany(args);

export const getPostsCount = async (args: Prisma.PostCountArgs) =>
  await prisma.post.count(args);

export const getAuthorById = cache(async (id: string) => {
  const author = await prisma.user.findUnique({
    where: { id },
  });

  return author;
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

export const getCategoryById = cache(async (id: string) => {
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    return category;
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});

export const getComments = cache(async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { AND: [{ postId }, { parentId: null }] },
      include: {
        author: true,
        children: { include: { author: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});

export const getBookmark = cache(
  async ({
    articleId,
    userId,
  }: {
    articleId: string;
    userId: string | undefined;
  }) => {
    if (userId) {
      return await prisma.bookmark.findUnique({
        where: {
          bookmarks_pkey: {
            postId: articleId,
            userId: userId,
          },
        },
      });
    } else return null;
  },
);
