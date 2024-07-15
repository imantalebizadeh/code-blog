"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SidebarItemProps = { text: string } & ComponentPropsWithoutRef<
  typeof Link
>;

export default function SidebarItem({ text, href }: SidebarItemProps) {
  const pathname = usePathname();

  return (
    <li
      className={cn(
        "flex h-9 shrink-0 items-center justify-center px-3 py-2 font-semibold md:justify-start",
        {
          "md:border-r-2 md:border-r-primary": href === pathname,
        },
      )}
    >
      <Link
        href={href}
        className={cn("hover:text-primary", {
          "text-primary": href === pathname,
        })}
      >
        {text}
      </Link>
    </li>
  );
}
