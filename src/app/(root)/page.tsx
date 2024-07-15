import { getPosts } from "@/server/data/post";
import prisma from "@/server/db";

import PostList from "@/components/post-list";

export default async function Home() {
  const postsData = getPosts({ limit: 34 });
  const postsCountData = await prisma.post.count();

  const [posts, postsCount] = await Promise.all([postsData, postsCountData]);

  return <PostList InitialPosts={posts} postsCount={postsCount} mode="home" />;
}
