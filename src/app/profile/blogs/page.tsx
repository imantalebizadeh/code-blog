import Link from "next/link";
import { notFound } from "next/navigation";

import { getSession } from "@/server/auth";
import prisma from "@/server/db";

import Icon from "@/components/common/icon";
import PostList from "@/components/post-list";
import { Button } from "@/components/ui/button";

export default async function BlogPage() {
  const session = await getSession();

  if (!session?.user) notFound();

  const posts = await prisma.post.findMany({
    where: { authorId: session.user.id },
    include: { category: true },
  });

  return posts && posts.length > 0 ? (
    <section className="flex flex-col gap-5 rounded-xl bg-accent/50 p-4">
      <header className="flex w-full items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          مقالات من
        </h4>
        <Button size={"sm"} asChild>
          <Link href="/create">ایجاد پست جدید</Link>
        </Button>
      </header>

      <PostList posts={posts} />
    </section>
  ) : (
    <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-accent/50 p-10">
      <div className="space-y-3">
        <Icon
          name="PackageOpen"
          size={32}
          className="mx-auto stroke-accent-foreground"
        />
        <p className="text-accent-foreground">شما هیچ پستی ندارید!</p>
      </div>
      <Button asChild>
        <Link href="/create">ایجاد پست جدید</Link>
      </Button>
    </div>
  );
}
