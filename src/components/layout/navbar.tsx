"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Icon from "../common/icon";
import Logo from "../common/logo";
import { Button } from "../ui/button";
import UserMenu from "../user-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import MobileNav from "./mobile-nav";
import NavLinks from "./nav-links";

const ThemeToggle = dynamic(() => import("@/components/layout/theme-toggle"), {
  ssr: false,
});

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="container flex items-center justify-between py-6">
      {/* Mobile menu button */}
      <MobileNav />

      {/* Logo and desktop navigation links */}
      <div className="flex items-center gap-10">
        <Link href={"/"}>
          <Logo />
        </Link>

        <NavLinks className="hidden md:block" />
      </div>

      {/* Theme and login buttons */}
      <div className="flex gap-3">
        {session?.user ? (
          <UserMenu user={session.user} status={status} />
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full"
                  size={"icon"}
                  variant={"secondary"}
                  disabled={status === "loading"}
                >
                  <Link href={"/login"}>
                    <Icon name={"UserRound"} size={20} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side={"right"}>
                <p>ورود به حساب کاربری</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <ThemeToggle className="hidden md:inline-flex" />
      </div>
    </header>
  );
}
