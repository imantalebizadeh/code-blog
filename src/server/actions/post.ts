"use server";

import { revalidatePath } from "next/cache";

import { getBookmark, getPosts } from "../data/post";
import prisma from "../db";
import { z } from "zod";

import { action, authAction } from "@/lib/action.client";
import { postFormSchema } from "@/lib/validations/post";

const editSchema = postFormSchema.extend({
  postId: z.string(),
});

type fetchPostsParams = {
  limit: number;
  skip: number;
  filter?: {
    category?: string;
    search?: string;
  };
};

//** Use this function to receive the data of posts on the client side, so that sensitive and important data can be prevented from being stolen on the client side by running this function on the server side.
export const fetchPosts = async (params: fetchPostsParams) => {
  return await getPosts(params);
};

export const createPost = authAction(postFormSchema, async (values, user) => {
  const { title, content, summary, category, image } = values;

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        summary,
        cover_image: image as string,
        published: true,
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

    revalidatePath("/profile/blogs");
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

      revalidatePath("/profile/blogs");
    } catch (error) {
      console.error(error);
      throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
    }
  },
);

export const editPost = action(editSchema, async (values) => {
  const { postId, title, content, summary, category, image } = values;

  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        summary,
        cover_image: image as string,
        category: { connect: { id: category } },
      },
    });

    revalidatePath("/profile/blogs");
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});

export const addBookmark = authAction(
  z.object({ articleId: z.string() }),
  async ({ articleId }, user) => {
    try {
      const bookmark = await getBookmark({
        articleId,
        userId: user.id,
      });

      if (bookmark) {
        await prisma.bookmark.delete({
          where: {
            bookmarks_pkey: {
              postId: bookmark.postId,
              userId: bookmark.userId,
            },
          },
        });

        revalidatePath(`/blog/${articleId}`);

        return { bookmarked: false };
      } else {
        await prisma.bookmark.create({
          data: {
            postId: articleId,
            userId: user.id!,
          },
        });

        revalidatePath(`/blog/${articleId}`);

        return { bookmarked: true };
      }
    } catch (error) {
      console.error(error);
      throw new Error("خطای , لطفا مجددا تلاش کنید");
    }
  },
);

export const createComment = authAction(
  z.object({
    comment: z.string(),
    articleId: z.string(),
    commentId: z.string().optional(),
  }),
  async ({ comment, articleId, commentId }, user) => {
    try {
      await prisma.comment.create({
        data: {
          postId: articleId,
          content: comment,
          authorId: user.id as string,
          parentId: commentId,
        },
      });

      revalidatePath(`/blog/${articleId}`);
    } catch (error) {
      console.error(error);
      throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
    }
  },
);

export const deleteComment = action(z.string(), async (commentId) => {
  try {
    const res = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(`/blog/${res.postId}`);
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});
