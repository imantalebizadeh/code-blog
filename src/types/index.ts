import { Prisma } from "@prisma/client";

const postWithAuthorAndCategory = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { author: true, category: true },
});

const bookmarkWithPost = Prisma.validator<Prisma.BookmarkDefaultArgs>()({
  include: { post: { include: { author: true, category: true } } },
});

export type PostWithAuthorAndCategory = Prisma.PostGetPayload<
  typeof postWithAuthorAndCategory
>;

export type BookmarkWithPost = Prisma.BookmarkGetPayload<
  typeof bookmarkWithPost
>;

export type ApiResponse<T> = {
  data: T;
  currentPage: number;
  nextPage: number | null;
};

export type fetcherOptions = {
  endpoint: string;
  searchParams?: Record<string, string>;
  segments?: string[];
};

export type NavItem = {
  title: string;
  href: string;
};

export type SubComment = { id: string; authorName: string } | null;
