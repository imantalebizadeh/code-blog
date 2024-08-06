import type { NextRequest } from "next/server";

import { Prisma } from "@prisma/client";

import prisma from "@/server/db";

import { POSTS_LIMIT } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const pageParam = Number(searchParams.get("pageParam"));
  const userId = searchParams.get("userId");

  const nextPage = pageParam + 1;

  if (userId) {
    const condition: Prisma.BookmarkWhereInput = { userId };

    const bookmarksCountData = prisma.bookmark.count({ where: condition });
    const bookmarksData = prisma.bookmark.findMany({
      where: condition,
      include: { post: { include: { author: true, category: true } } },
      skip: pageParam * POSTS_LIMIT,
      take: POSTS_LIMIT,
    });

    const [bookmarksCount, bookmarks] = await Promise.all([
      bookmarksCountData,
      bookmarksData,
    ]);

    return Response.json({
      data: bookmarks,
      currentPage: pageParam,
      nextPage:
        (pageParam + 1) * POSTS_LIMIT < bookmarksCount ? nextPage : null,
    });
  }
}
