import { notFound } from "next/navigation";

import type { User } from "@prisma/client";

import { auth } from "@/server/auth";
import { getUserByUsername } from "@/server/data/user";

import PasswordEditForm from "@/components/forms/password-form";
import ProfileForm from "@/components/forms/profile-form";
import ProfileCard from "@/components/profile-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function generateMetadata() {
  const session = await auth();

  if (!session?.user) notFound();

  return {
    title: {
      absolute: `پروفایل - ${session.user.name}`,
    },
  };
}

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
          {/* اطلاعات من */}
          <div className="grid grid-cols-1 grid-rows-[1fr_auto] gap-8 rounded-xl bg-primary-foreground p-6 md:grid-cols-2 md:grid-rows-1">
            <section className="divide-y">
              <h4 className="mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
                ویرایش اطلاعات
              </h4>
              <ProfileForm user={user} />
            </section>
            <section className="divide-y">
              <h4 className="mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
                تغییر رمز عبور
              </h4>
              <PasswordEditForm className="pt-5" />
            </section>
          </div>
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
