"use client";

import { useAction } from "next-safe-action/hooks";
import Link from "next/link";

import { ComponentPropsWithoutRef } from "react";

import { toast } from "sonner";

import { removePost } from "@/server/actions/post";

import { cn } from "@/lib/utils";

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
import { Button } from "./ui/button";

type PostActionsProps = {
  postId: string;
} & ComponentPropsWithoutRef<typeof Button>;

export default function PostActions({
  postId,
  className,
  ...props
}: PostActionsProps) {
  const { execute: deletePost } = useAction(removePost, {
    onError: (err) => {
      toast.error(err.serverError);
    },
    onSuccess: () => {
      toast.success("پست با موفقیت حذف شد");
    },
  });

  return (
    <AlertDialog>
      <DropdownMenu dir="rtl" modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className={cn("size-8 rounded-full", className)}
            title="گزینه ها"
            {...props}
          >
            <Icon name="EllipsisVertical" size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/edit/${postId}`}>
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
            با حذف این مقاله، همه مطالب مرتبط به این مقاله پاک خواهند شد و دیگر
            قابل بازیابی نخواهد بود.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePost({ postId })}>
            حذف مقاله
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
