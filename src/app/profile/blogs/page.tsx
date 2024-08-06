"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts";

import { cn, fetcher } from "@/lib/utils";

import Icon from "@/components/common/icon";
import PostList from "@/components/post-list";
import PostsSkeleton from "@/components/posts-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import type { ApiResponse, PostWithAuthorAndCategory } from "@/types";

export default function BlogPage() {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const { data, error, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts", userId],
    queryFn: ({ pageParam }) =>
      fetcher<ApiResponse<PostWithAuthorAndCategory[]>>({
        endpoint: "posts",
        searchParams: {
          authorId: userId!,
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
    <section className="flex flex-col gap-5 rounded-xl bg-accent/50 p-4">
      <header className="flex w-full items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          مقالات من
        </h4>
        <Button size={"sm"} asChild>
          <Link href="/create">ایجاد پست جدید</Link>
        </Button>
      </header>

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
