import { Fragment } from "react";

import type { InfiniteData } from "@tanstack/react-query";

import SearchItem from "./search-item";
import type { ApiResponse, PostWithAuthorAndCategory } from "@/types";

type SearchListProps = {
  data: InfiniteData<ApiResponse<PostWithAuthorAndCategory[]>>;
  queryParam: string;
};

export default function SearchList({ data, queryParam }: SearchListProps) {
  return (
    <>
      {data.pages.map((page) => {
        if (page.data && page.data.length > 0) {
          return (
            <Fragment key={page.currentPage}>
              {page.data.map((post) => (
                <SearchItem key={post.id} post={post} />
              ))}
            </Fragment>
          );
        } else {
          return (
            <p key={page.currentPage} className="text-center text-lg">
              {queryParam
                ? `نتیجه ای برای عبارت "${queryParam}" وجود ندارد.`
                : "نتیجه ای برای این عبارت وجود ندارد."}
            </p>
          );
        }
      })}
    </>
  );
}
