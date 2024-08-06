"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounceCallback } from "usehooks-ts";

import { cn, fetcher } from "@/lib/utils";

import SearchList from "@/components/search-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import type { ApiResponse, PostWithAuthorAndCategory } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const queryParam = searchParams.get("q") ?? "";

  const handleSearch = useDebounceCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      const params = new URLSearchParams(searchParams);

      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", queryParam],
    queryFn: ({ pageParam }) =>
      fetcher<ApiResponse<PostWithAuthorAndCategory[]>>({
        endpoint: "search",
        searchParams: { query: queryParam, pageParam: pageParam.toString() },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="mt-10 flex flex-col gap-5">
      <div className="relative h-14 w-full">
        <hr className="-translate-y-50 absolute top-1/2 -z-10 w-full" />

        <div className="mx-auto h-full w-4/5 bg-background">
          <Input
            type="text"
            placeholder="جستجو در بین مقالات..."
            className="h-full rounded-xl text-lg"
            defaultValue={queryParam}
            onChange={handleSearch}
          />
        </div>
      </div>

      {status === "pending" ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ) : status === "error" ? (
        <p className="text-center text-lg text-destructive">{error.message}</p>
      ) : (
        <SearchList data={data} queryParam={queryParam} />
      )}

      <Button
        type="button"
        size="sm"
        variant="secondary"
        className={cn("mx-auto rounded-full", { hidden: !hasNextPage })}
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "در حال بارگذاری..." : "مشاهده بیشتر"}
      </Button>
    </section>
  );
}
