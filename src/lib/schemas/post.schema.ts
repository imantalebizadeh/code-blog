import { z } from "zod";

const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  summary: z.string(),
  cover_image: z.string(),
  viewCount: z.number(),
  isDeleted: z.boolean(),
  authorId: z.string(),
  categoryId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const bookmarkSchema = z.object({
  postId: z.string(),
  userId: z.string(),
});

const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  postId: z.string(),
  parentId: z.string().nullable(),
});

export const createPostSchema = postSchema
  .omit({
    id: true,
    viewCount: true,
    isDeleted: true,
    authorId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    title: z
      .string({ required_error: "عنوان مقاله الزامی می باشد" })
      .min(3, "عنوان حداقل باید 3 کاراکتر باشد")
      .max(100, "عنوان حداکثر باید 100 کاراکتر باشد"),
    content: z
      .string({ required_error: "محتوای مقاله الزامی می باشد" })
      .min(1, "محتوای مقاله الزامی می باشد"),
    summary: z
      .string({ required_error: "خلاصه مقاله الزامی می باشد" })
      .min(1, "خلاصه مقاله الزامی می باشد")
      .max(800, "خلاصه مقاله حداکثر باید 800 کاراکتر باشد"),
    categoryId: z.string({
      required_error: "دسته بندی مقاله الزامی می باشد",
    }),
  });

export const updatePostSchema = postSchema
  .omit({
    viewCount: true,
    isDeleted: true,
    authorId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    title: z
      .string({ required_error: "عنوان مقاله الزامی می باشد" })
      .min(3, "عنوان حداقل باید 3 کاراکتر باشد")
      .max(100, "عنوان حداکثر باید 100 کاراکتر باشد"),
    content: z
      .string({ required_error: "محتوای مقاله الزامی می باشد" })
      .min(1, "محتوای مقاله الزامی می باشد"),
    summary: z
      .string({ required_error: "خلاصه مقاله الزامی می باشد" })
      .min(1, "خلاصه مقاله الزامی می باشد")
      .max(800, "خلاصه مقاله حداکثر باید 800 کاراکتر باشد"),
    categoryId: z.string({
      required_error: "دسته بندی مقاله الزامی می باشد",
    }),
  });

export const deletePostSchema = postSchema.pick({ id: true });

export const togglePostBookmarkSchema = bookmarkSchema
  .omit({ userId: true })
  .extend({ postSlug: z.string() });

export const createCommentSchema = commentSchema
  .omit({
    id: true,
    authorId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({ postSlug: z.string() });

export const deleteCommentSchema = commentSchema
  .pick({ id: true })
  .extend({ postSlug: z.string() });
