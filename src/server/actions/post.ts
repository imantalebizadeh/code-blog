"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { authenticatedActionClient } from "@/lib/safe-action";
import {
  createCommentSchema,
  createPostSchema,
  deleteCommentSchema,
  togglePostBookmarkSchema,
  updatePostSchema,
} from "@/lib/schemas/post.schema";

import prisma from "../prisma";

export const createPost = authenticatedActionClient
  .schema(createPostSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { categoryId, ...postData } = parsedInput;

    await prisma.post.create({
      data: {
        ...postData,
        author: { connect: { id: user.id } },
        category: { connect: { id: categoryId } },
      },
    });

    revalidatePath("/profile/blogs");
  });

export const deletePost = authenticatedActionClient
  .schema(z.object({ postId: z.string() }))
  .action(async ({ parsedInput: { postId }, ctx: { user } }) => {
    await prisma.post.delete({ where: { id: postId, authorId: user.id } });

    revalidatePath("/profile/blogs");
  });

export const updatePost = authenticatedActionClient
  .schema(updatePostSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { id, categoryId, ...postData } = parsedInput;

    await prisma.post.update({
      where: { id, authorId: user.id },
      data: {
        ...postData,
        category: { connect: { id: categoryId } },
      },
    });

    revalidatePath("/profile/blogs");
  });

export const togglePostBookmark = authenticatedActionClient
  .schema(togglePostBookmarkSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { postId, postSlug } = parsedInput;

    return await prisma.$transaction(async (tx) => {
      const bookmark = await tx.bookmark.findFirst({
        where: { AND: { postId, userId: user.id } },
      });

      if (bookmark) {
        await tx.bookmark.delete({
          where: {
            bookmarks_pky: {
              postId: bookmark.postId,
              userId: bookmark.userId,
            },
          },
        });

        revalidatePath(`/blog/${postSlug}`);
        return { bookmarked: false };
      }

      await tx.bookmark.create({
        data: { postId, userId: user.id! },
      });

      revalidatePath(`/blog/${postSlug}`);
      return { bookmarked: true };
    });
  });

export const createComment = authenticatedActionClient
  .schema(createCommentSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { content, parentId, postId, postSlug } = parsedInput;

    await prisma.comment.create({
      data: {
        postId,
        content: content,
        authorId: user.id as string,
        parentId,
      },
    });

    revalidatePath(`/blog/${postSlug}`);
  });

export const deleteComment = authenticatedActionClient
  .schema(deleteCommentSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { id, postSlug } = parsedInput;

    await prisma.comment.delete({
      where: {
        id,
        authorId: user.id,
      },
    });

    revalidatePath(`/blog/${postSlug}`);
  });
