import type { NextRequest } from "next/server";

import { Prisma } from "@prisma/client";

import { getPostsCount, getPostsData } from "@/server/data/post";

import { POSTS_LIMIT } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");
  const pageParam = Number(searchParams.get("pageParam"));

  const nextPage = pageParam + 1;

  if (query) {
    const condition: Prisma.PostWhereInput = {
      title: {
        contains: query,
      },
    };

    const postsCountData = getPostsCount({ where: condition });
    const postsData = getPostsData({
      where: condition,
      skip: pageParam * POSTS_LIMIT,
      take: POSTS_LIMIT,
      include: { author: true, category: true },
      orderBy: { createdAt: "desc" },
    });

    const [posts, postsCount] = await Promise.all([postsData, postsCountData]);

    return Response.json({
      data: posts,
      currentPage: pageParam,
      nextPage: (pageParam + 1) * POSTS_LIMIT < postsCount ? nextPage : null,
    });
  }

  return Response.json([]);
}
