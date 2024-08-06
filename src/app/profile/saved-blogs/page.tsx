"use client";

import { useSession } from "next-auth/react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts";

import { cn, fetcher } from "@/lib/utils";

import Icon from "@/components/common/icon";
import PostList from "@/components/post-list";
import PostsSkeleton from "@/components/posts-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import type { ApiResponse, BookmarkWithPost } from "@/types";

export default function SavedPostsPage() {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const { data, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["bookmarks", userId],
    queryFn: ({ pageParam }) =>
      fetcher<ApiResponse<BookmarkWithPost[]>>({
        endpoint: "bookmarks",
        searchParams: {
          userId: userId!,
          pageParam: pageParam.toString(),
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
    enabled: !!userId,
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
    <section className="rounded-xl bg-accent/50 p-4">
      {status === "pending" ? (
        <PostsSkeleton viewMode="profile" />
      ) : status === "error" ? (
        <Alert variant="destructive">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : (
        <>
          {data.pages[0].data.length === 0 ? (
            <section className="flex justify-center rounded-xl bg-background/80 p-10">
              <div className="space-y-3">
                <Icon
                  name="PackageOpen"
                  size={32}
                  className="mx-auto stroke-accent-foreground"
                />
                <p className="text-accent-foreground">شما هیچ پستی ندارید!</p>
              </div>
            </section>
          ) : (
            <div className="space-y-10">
              <PostList viewMode="profile" data={data} />

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
        </>
      )}
    </section>
  );
}
