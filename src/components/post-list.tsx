import type { InfiniteData } from "@tanstack/react-query";

import { cn, isBookmark } from "@/lib/utils";

import PostItem from "./post-item";
import type {
  ApiResponse,
  BookmarkWithPost,
  PostWithAuthorAndCategory,
} from "@/types";

type PostListProps = {
  data: InfiniteData<
    ApiResponse<PostWithAuthorAndCategory[] | BookmarkWithPost[]>
  >;
  viewMode?: "profile" | "home";
};

export default function PostList({ data, viewMode = "home" }: PostListProps) {
  return (
    <>
      {data.pages.map((page) => (
        <section
          key={page.currentPage}
          className={cn("grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2", {
            "lg:grid-cols-3": viewMode === "home",
            "lg:grid-cols-4": viewMode === "profile",
          })}
        >
          {page.data.map((data) => {
            if (isBookmark(data)) {
              return (
                <PostItem
                  key={data.post.id}
                  post={data.post}
                  viewMode={viewMode}
                />
              );
            } else {
              return <PostItem key={data.id} post={data} viewMode={viewMode} />;
            }
          })}
        </section>
      ))}
    </>
  );
}
