import React from "react";

import { getPosts } from "@/server/data/post";
import prisma from "@/server/db";

import PostList from "@/components/post-list";

export default async function CategoryPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const category = decodeURI(slug);

  const postsData = getPosts({
    limit: 34,
    filter: { category: category },
  });
  const postsCountData = await prisma.post.count({
    where: { category: { name: category } },
  });

  const [posts, postsCount] = await Promise.all([postsData, postsCountData]);

  return (
    <PostList
      mode={"home"}
      InitialPosts={posts}
      postsCount={postsCount}
      filter={{ category }}
    />
  );
}
