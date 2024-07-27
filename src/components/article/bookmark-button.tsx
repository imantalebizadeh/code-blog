import type { Session } from "next-auth";
import { useOptimisticAction } from "next-safe-action/hooks";

import Icon from "../common/icon";
import { Button } from "../ui/button";
import type { Bookmark } from "@prisma/client";
import { toast } from "sonner";

import { addBookmark } from "@/server/actions/post";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type BookmarkButtonProps = {
  session: Session | null;
  bookmark: Bookmark | null;
  articleId: string;
  isMediaMatches: boolean;
};

export default function BookmarkButton({
  session,
  bookmark,
  articleId,
  isMediaMatches,
}: BookmarkButtonProps) {
  const { execute, status, optimisticData } = useOptimisticAction(
    addBookmark,
    { bookmarked: bookmark ? true : false },
    ({ bookmarked }) => {
      if (bookmarked) {
        return { bookmarked: false };
      } else {
        return { bookmarked: true };
      }
    },
    {
      onSuccess: (data) => {
        if (!data.bookmarked) {
          toast.success("مقاله با موفقیت از لیست شما حذف شد");
        } else {
          toast.success("مقاله با موفقیت ذخیره شد");
        }
      },
    },
  );

  function handleBookmark() {
    if (session?.user) execute({ articleId });
    else toast.error("برای ذخیره کردن مقاله ابتدا وارد حساب کاربری خود شوید");
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="group"
            onClick={handleBookmark}
            disabled={status === "executing"}
          >
            <Icon
              name="Bookmark"
              size={20}
              className={cn("transition-colors group-hover:stroke-primary", {
                "fill-primary stroke-primary": optimisticData.bookmarked,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" hidden={isMediaMatches}>
          {bookmark ? <p>حذف کردن</p> : <p>ذخیره کردن</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
