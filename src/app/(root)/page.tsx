import { getPosts, getPostsCount } from "@/server/data/post";

import PostList from "@/components/post-list";

export default async function Home() {
  const postsData = getPosts({ limit: 34 });
  const postsCountData = getPostsCount();

  const [posts, postsCount] = await Promise.all([postsData, postsCountData]);

  return <PostList InitialPosts={posts} postsCount={postsCount} mode="home" />;
}
