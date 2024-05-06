import { notFound } from "next/navigation";

import type { User } from "@prisma/client";

import { auth } from "@/server/auth";
import { getUserByUsername } from "@/server/data/user";

import ProfileCard from "@/components/profile-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) notFound();

  const user = (await getUserByUsername(session.user.username)) as User;

  return (
    <div className="flex flex-col items-stretch gap-3">
      <ProfileCard user={user} />

      <Tabs defaultValue="account" dir="rtl" className="w-full space-y-3">
        <TabsList className="h-auto w-full rounded-xl bg-primary-foreground p-2 *:w-full md:justify-start *:md:w-auto">
          <TabsTrigger value="account" className="rounded-xl px-4 py-4">
            اطلاعات من
          </TabsTrigger>
          <TabsTrigger value="posts" className="rounded-xl px-4 py-4">
            مقالات من
          </TabsTrigger>
          <TabsTrigger value="savedPosts" className="rounded-xl px-4 py-4">
            مقالات ذخیره شده
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          {/* Show user form here. */}
          اطلاعات من
        </TabsContent>
        <TabsContent value="posts">
          {/* Show user's posts here. */}
          مقالات من
        </TabsContent>
        <TabsContent value="savedPosts">
          {/* Show user's saved posts here */}
          مقالات ذخیره شده
        </TabsContent>
      </Tabs>
    </div>
  );
}
