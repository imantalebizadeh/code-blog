"use client";

import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";

import { ComponentPropsWithoutRef } from "react";

import type { Category, Post } from "@prisma/client";
import { toast } from "sonner";

import { removePost } from "@/server/actions/post";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Icon from "./common/icon";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type PostItemProps = {
  post: Post & { category: Category };
} & ComponentPropsWithoutRef<"div">;

export default function PostItem({ post, ...props }: PostItemProps) {
  const { execute: deletePost } = useAction(removePost, {
    onError: (err) => {
      toast.error(err.serverError);
    },
    onSuccess: () => {
      toast.success("پست با موفقیت حذف شد");
    },
  });

  return (
    <Card className="gap-3 rounded-lg p-2 md:flex-row" {...props}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={post.cover_image}
            alt={post.title}
            width={256}
            height={102}
            className="w-full max-w-full"
          />

          <Link
            href={`/categories/${post.category.name}`}
            className="hover:underline"
          >
            <Badge className="absolute bottom-2 right-2 rounded-md">
              {post.category.name}
            </Badge>
          </Link>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 *:text-muted-foreground">
              <Icon
                name={post.published ? "BadgeCheck" : "BadgeInfo"}
                size={16}
              />
              <p className="text-sm">
                {post.published ? "منتشر شده" : "پیش نویس"}
              </p>
            </div>

            <AlertDialog>
              <DropdownMenu dir="rtl" modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full"
                    title="گزینه ها"
                  >
                    <Icon name="EllipsisVertical" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`/edit/${post.id}`}>
                    <DropdownMenuItem className="gap-2">
                      <Icon name="Pencil" size={16} />
                      <span>ویرایش</span>
                    </DropdownMenuItem>
                  </Link>

                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="gap-2">
                      <Icon name="Trash2" size={16} />
                      <span>حذف مقاله</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent className="max-w-[360px] rounded-lg md:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    آیا از انجام این کار مطمئن هستید؟
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    با حذف این مقاله، همه مطالب مرتبط به این مقاله پاک خواهند شد
                    و دیگر قابل بازیابی نخواهد بود.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>انصراف</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deletePost({ postId: post.id })}
                  >
                    حذف مقاله
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <h4 className="scroll-m-20 truncate text-xl font-semibold tracking-tight">
            {post.title}
          </h4>
        </div>
      </CardContent>
    </Card>
  );
}
