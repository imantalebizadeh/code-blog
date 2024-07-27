"use client";

import type { Session } from "next-auth";

import type { Bookmark } from "@prisma/client";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import BookmarkButton from "./article/bookmark-button";
import Icon from "./common/icon";

type ArticleSidebarProps = {
  session: Session | null;
  bookmark: Bookmark | null;
  articleId: string;
};

export default function ArticleSidebar({
  session,
  bookmark,
  articleId,
}: ArticleSidebarProps) {
  const isMediaMatches = useMediaQuery("(max-width: 768px)");

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("لینک مقاله کپی شد");
    });
  }

  async function handleShare() {
    if (navigator.canShare({ url: window.location.href })) {
      await navigator.share({
        url: window.location.href,
      });
    } else {
      toast.error("مرورگر شما امکان اشتراک گذاری را ندارد");
    }
  }

  return (
    <aside>
      <div className="fixed inset-x-0 bottom-0 z-10 flex flex-row items-center justify-around gap-8 bg-secondary p-2 md:sticky md:top-10 md:mt-24 md:flex-col md:justify-normal md:border-none md:bg-background md:p-0">
        {/* Comments button */}
        <TooltipProvider>
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="group"
                onClick={() => {
                  document
                    .getElementById("comments")!
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Icon
                  name="MessageSquareMore"
                  size={20}
                  className="transition-colors group-hover:stroke-amber-400"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" hidden={isMediaMatches}>
              <p>بخش نظرات</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Bookmark button */}
        <BookmarkButton
          session={session}
          bookmark={bookmark}
          articleId={articleId}
          isMediaMatches={isMediaMatches}
        />

        {/* More actions button */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icon name="Ellipsis" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isMediaMatches ? "end" : "start"}
            side={isMediaMatches ? "top" : "left"}
            className="*:gap-2"
          >
            <DropdownMenuItem onClick={handleCopy}>
              <Icon name="Copy" size={16} />
              <span>کپی کردن</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Icon name="Share2" size={16} />
              <span>اشتراک گذاری</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
