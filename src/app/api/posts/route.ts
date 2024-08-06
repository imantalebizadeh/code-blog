import type { NextRequest } from "next/server";

import { Prisma } from "@prisma/client";

import { getPostsCount, getPostsData } from "@/server/data/post";

import { POSTS_LIMIT } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const pageParam = Number(searchParams.get("pageParam"));
  const authorId = searchParams.get("authorId");

  const nextPage = pageParam + 1;

  const condition: Prisma.PostWhereInput = {
    authorId: authorId ? { equals: authorId } : undefined,
  };

  const postsCountData = getPostsCount({ where: condition });
  const postsData = getPostsData({
    where: condition,
    skip: pageParam * POSTS_LIMIT,
    take: POSTS_LIMIT,
    include: { author: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  const [postsCount, posts] = await Promise.all([postsCountData, postsData]);

  return Response.json({
    data: posts,
    currentPage: pageParam,
    nextPage: (pageParam + 1) * POSTS_LIMIT < postsCount ? nextPage : null,
  });
}
