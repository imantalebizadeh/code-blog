"use client";

import { useEffect, useState } from "react";

import { useIntersectionObserver } from "usehooks-ts";

import { fetchPosts } from "@/server/actions/post";

import { cn } from "@/lib/utils";

import PostItem from "./post-item";
import type { BlogPost } from "@/types";

type PostListProps = {
  mode: "profile" | "home";
  limit?: number;
  InitialPosts: BlogPost[];
  postsCount: number;
  filter?: {
    category?: string;
  };
};

export default function PostList({
  InitialPosts,
  postsCount,
  mode,
  filter,
}: PostListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(InitialPosts);
  const [skip, setSkip] = useState(0);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange(isIntersecting) {
      if (isIntersecting) {
        setSkip(skip + 34);
      }
    },
  });

  useEffect(() => {
    if (isIntersecting) {
      fetchPosts({ limit: 34, skip, filter }).then((res) => {
        setPosts([...posts, ...res]);
      });
    }
  }, [skip]);

  return (
    <div className="flex flex-col items-center gap-10">
      <section className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} mode={mode} />
        ))}
      </section>

      <div
        ref={ref}
        className={cn("mx-auto block text-muted-foreground", {
          hidden: !posts.length || posts.length === postsCount,
        })}
      >
        در حال بارگذاری...
      </div>
    </div>
  );
}
