import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, formatDate } from "@/lib/utils";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Icon from "./common/icon";
import PostActions from "./post-actions";
import { Avatar, AvatarImage } from "./ui/avatar";
import type { PostWithAuthorAndCategory } from "@/types";

type Props = {
  post: PostWithAuthorAndCategory;
  viewMode: "profile" | "home";
};

export default function PostItem({ post, viewMode }: Props) {
  const pathname = usePathname();

  return (
    <Card
      className={cn("space-y-4 border-none bg-transparent p-0 shadow-none", {
        "bg-background/70 p-4":
          pathname === "/profile/blogs" || pathname === "/profile/saved-posts",
      })}
    >
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="relative overflow-hidden rounded-md border">
          <Link href={`/blog/${post.id}`}>
            <Image
              src={post.cover_image}
              alt={post.title}
              width={288}
              height={162}
              loading="lazy"
              className="aspect-video w-full transition-transform hover:scale-105"
            />
          </Link>

          {viewMode === "profile" && pathname === "/profile/blogs" && (
            <PostActions postId={post.id} className="absolute left-2 top-2" />
          )}
        </div>

        <div className="space-y-2">
          <small className="text-sm font-medium leading-none text-primary">
            {post.category?.name}
          </small>

          <div className="flex items-center justify-between">
            <h4 className="peer line-clamp-1 w-fit scroll-m-20 text-xl font-semibold tracking-tight">
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </h4>

            <Icon
              name="ArrowUpLeft"
              size={20}
              className="transition-transform peer-hover:-rotate-45"
            />
          </div>

          <p className="line-clamp-2 text-sm leading-normal text-muted-foreground">
            {post.summary}
          </p>
        </div>
      </CardContent>

      {viewMode === "home" && (
        <CardFooter className="p-0">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage
                src={post.author?.image || "/assets/user-avatar.png"}
                alt="تصویر نویسنده"
              />
            </Avatar>

            <div className="space-y-[0.5]">
              <small className="text-base font-medium leading-none">
                {post.author?.name}
              </small>
              <p className="text-sm text-muted-foreground">
                {formatDate(
                  "fa-IR",
                  { year: "numeric", month: "numeric", day: "numeric" },
                  new Date(post.createdAt),
                )}
              </p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
