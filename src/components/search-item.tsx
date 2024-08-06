import Link from "next/link";

import { formatDate } from "@/lib/utils";

import { Badge } from "./ui/badge";
import type { PostWithAuthorAndCategory } from "@/types";

type SearchListItemProps = {
  post: PostWithAuthorAndCategory;
};

export default function SearchListItem({ post }: SearchListItemProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="space-y-3 rounded-lg border p-5">
        <div className="flex gap-3">
          <Badge variant="secondary">{post.category.name}</Badge>
          <span className="select-none text-sm font-medium text-muted-foreground">
            {formatDate(
              "fa-IR",
              { year: "numeric", month: "long", day: "numeric" },
              new Date(post.createdAt),
            )}
          </span>
        </div>

        <h4 className="line-clamp-1 text-xl font-semibold tracking-tight">
          {post.title}
        </h4>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {post.summary}
        </p>
      </article>
    </Link>
  );
}
