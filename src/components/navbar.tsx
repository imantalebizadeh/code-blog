import dynamic from "next/dynamic";
import Link from "next/link";

import CustomTooltip from "./common/custom-tooltip";
import Icon from "./common/icon";
import Logo from "./logo";
import NavLinks from "./nav-links";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

export default async function Navbar() {
  return (
    <header className="container flex items-center justify-between py-6">
      {/* Mobile menu button */}
      {/* <MobileNav /> */}

      {/* Logo and desktop navigation links */}
      <div className="flex items-center gap-10">
        <Link href={"/"}>
          <Logo />
        </Link>

        <NavLinks className="hidden md:block" />
      </div>

      {/* Theme and login buttons */}
      <div className="flex gap-3">
        <CustomTooltip label={"ورود به حساب کاربری"} side="right">
          <Button className="rounded-full" size={"icon"} variant={"secondary"}>
            <Link href={"/login"}>
              <Icon name={"UserRound"} size={20} />
            </Link>
          </Button>
        </CustomTooltip>

        <ThemeToggle className="hidden md:inline-flex" />
      </div>
    </header>
  );
}
