import { notFound } from "next/navigation";

import * as React from "react";

import { auth } from "@/server/auth";
import { getUserByUsername } from "@/server/data/user";

import ProfileCard from "@/components/layout/profile-card";
import { NavigationLink } from "@/components/ui/navigation-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export async function generateMetadata() {
  const session = await auth();

  if (!session?.user) notFound();

  return {
    title: {
      absolute: `پروفایل - ${session.user.name}`,
    },
  };
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function ProfileLayout({ children }: Props) {
  const session = await auth();

  if (!session?.user) notFound();

  const user = await getUserByUsername(session.user.username);

  if (!user) notFound();

  return (
    <div className="flex flex-1 flex-col gap-3">
      <ProfileCard user={user} />

      <NavigationMenu dir="rtl" className="w-full max-w-full [&>div]:w-full">
        <NavigationMenuList className="h-auto rounded-xl bg-accent/50 p-2 *:w-full *:sm:w-auto">
          <NavigationMenuItem>
            <NavigationLink href="/profile">اطلاعات من</NavigationLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationLink href="/profile/blogs">مقالات من</NavigationLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationLink href="/profile/saved-blogs">
              مقالات ذخیره شده
            </NavigationLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {children}
    </div>
  );
}
