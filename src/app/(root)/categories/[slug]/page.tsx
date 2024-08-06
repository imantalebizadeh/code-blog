"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts";

import { cn, fetcher } from "@/lib/utils";

import PostList from "@/components/post-list";
import PostsSkeleton from "@/components/posts-skeleton";

import type { ApiResponse, PostWithAuthorAndCategory } from "@/types";

type CategoryPageProps = {
  params: { slug: string };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.slug;

  const { data, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts", category],
    queryFn: ({ pageParam }) =>
      fetcher<ApiResponse<PostWithAuthorAndCategory[]>>({
        endpoint: `posts/${category}`,
        searchParams: { pageParam: pageParam.toString() },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange(isIntersecting) {
      if (isIntersecting) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className="flex flex-col items-stretch">
      {status === "pending" ? (
        <PostsSkeleton viewMode="home" />
      ) : status === "error" ? (
        <p className="text-center text-lg text-destructive">{error.message}</p>
      ) : (
        <div className="space-y-10">
          <PostList data={data} />

          <div
            ref={ref}
            className={cn("mx-auto block text-muted-foreground", {
              hidden: !hasNextPage,
            })}
          >
            در حال بارگذاری...
          </div>
        </div>
      )}
    </div>
  );
}
