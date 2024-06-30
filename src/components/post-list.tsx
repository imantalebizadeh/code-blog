import type { Category, Post } from "@prisma/client";

import PostItem from "./post-item";

type PostListProps = {
  posts: (Post & { category: Category })[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
