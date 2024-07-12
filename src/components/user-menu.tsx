"use client";

import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Icon from "./common/icon";

type UserMenuProps = {
  user: Session["user"];
};

export default function UserMenu({ user }: UserMenuProps) {
  const matches = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger
        className={cn("block", { invisible: pathname === "/profile" })}
      >
        <Avatar>
          <AvatarImage src={user?.image as string} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={matches ? "end" : "start"} sideOffset={10}>
        <DropdownMenuLabel>
          <div className="flex w-full items-center gap-3">
            <Avatar>
              <AvatarImage
                src={user?.image || "/user-avatar.png"}
                className="h-full w-full rounded-[inherit] object-cover"
                fetchPriority="high"
              />
            </Avatar>

            <div className="flex h-full flex-col gap-2">
              <span>{user.name}</span>
              <small className="font-medium leading-none text-muted-foreground">
                {user.email}
              </small>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href={"/profile"}>
          <DropdownMenuItem className="gap-2">
            <Icon name="CircleUserRound" size={16} />
            <span>حساب کاربری</span>
          </DropdownMenuItem>
        </Link>
        <Link href={"/profile/blogs"}>
          <DropdownMenuItem className="gap-2">
            <Icon name="Newspaper" size={16} />
            <span>مقالات من</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()} className="group gap-2">
          <Icon
            name="LogOut"
            size={16}
            className="group-hover:stroke-destructive"
          />
          <span className="group-hover:text-destructive">خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
