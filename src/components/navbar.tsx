import dynamic from "next/dynamic";
import Link from "next/link";

import { auth } from "@/server/auth";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Icon from "./common/icon";
import Logo from "./logo";
import MobileNav from "./mobile-nav";
import NavLinks from "./nav-links";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
});

export default async function Navbar() {
  const session = await auth();

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
          <UserMenu user={session.user} />
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full"
                  size={"icon"}
                  variant={"secondary"}
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
