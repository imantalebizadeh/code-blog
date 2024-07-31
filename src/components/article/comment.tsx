import type { Session } from "next-auth";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";

import Icon from "../common/icon";
import { Button } from "../ui/button";
import type { Comment as CommentType, User } from "@prisma/client";
import { toast } from "sonner";

import { deleteComment } from "@/server/actions/post";

import { cn, formatDate } from "@/lib/utils";

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

import type { SubComment } from "@/types";

type CommentProps = {
  comment: CommentType & { author: User };
  parentId?: string;
  loggedInUser: Session["user"] | null | undefined;
  showCommentBox: (subComment: SubComment) => void;
};

export default function Comment({
  comment,
  parentId,
  loggedInUser,
  showCommentBox,
}: CommentProps) {
  const { execute, status } = useAction(deleteComment, {
    onSuccess: () => {
      toast.success("نظر شما با موفقیت حذف شد");
    },
  });

  return (
    <div
      key={comment.id}
      className={cn(
        "flex flex-col space-y-3 rounded-lg border-2 border-border p-4",
        {
          "mr-5 bg-secondary": comment.parentId === parentId,
        },
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={comment.author.image ?? "/assets/user-avatar.ong"}
            alt={comment.author.name ?? "تصویر کاربر"}
            width={50}
            height={50}
            className={cn(
              "rounded-full ring-1 ring-primary ring-offset-4 ring-offset-[#FAFBFB] dark:ring-offset-[#0E1421]",
              {
                "ring-offset-secondary dark:ring-offset-secondary": !!parentId,
              },
            )}
          />

          <div className="flex flex-col gap-2">
            <p className="font-medium">{comment.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(
                "fa-IR",
                { year: "numeric", month: "long", day: "numeric" },
                comment.createdAt,
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {/* Delete button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                title="حذف نظر"
                disabled={status === "executing"}
                className={cn("size-8 rounded-full", {
                  hidden: comment.author.id !== loggedInUser?.id,
                })}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[360px] rounded-lg md:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  آیا از حذف این نظر مطمئن هستید؟
                </AlertDialogTitle>
                <AlertDialogDescription>
                  با حذف این نظر, همه مطالب مرتبط با این نظر پاک خواهند شد و
                  دیگر قابل بازیابی نخواهد بود.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction onClick={() => execute(comment.id)}>
                  ادامه
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Reply button */}
          <Button
            size="icon"
            variant="outline"
            title="باز پاسخ"
            className={cn(
              "size-8 rounded-full bg-[#FAFBFB] dark:bg-[#0E1421]",
              {
                hidden: !!parentId,
              },
            )}
            onClick={() =>
              showCommentBox({
                id: comment.id,
                authorName: comment.author.name as string,
              })
            }
          >
            <Icon name="Reply" size={16} />
          </Button>
        </div>
      </div>

      <hr
        className={cn("border-dashed border-secondary", {
          "border-background": !!parentId,
        })}
      />

      <p className="leading-7 [&:not(:first-child)]:mt-6">{comment.content}</p>
    </div>
  );
}
