import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Suspense } from "react";

import { auth } from "@/server/auth";
import { getBookmark, getComments, getPostById } from "@/server/data/post";
import prisma from "@/server/db";

import { formatDate } from "@/lib/utils";

import ArticleContent from "@/components/article-content";
import ArticleSidebar from "@/components/article-sidebar";
import Comments from "@/components/article/comments";
import Icon from "@/components/common/icon";
import MoreArticles from "@/components/more-articles";
import { Skeleton } from "@/components/ui/skeleton";

type ArticlePageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const post = await getPostById(params.slug);

  if (!post) return notFound();

  return {
    title: post.title,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const session = await auth();

  const article = await prisma.post.findUnique({
    where: { id: params.slug },
    include: {
      author: true,
      category: true,
      _count: { select: { comments: true } },
    },
  });

  if (!article) return notFound();

  const articleComments = await getComments(article.id);

  const bookmark = await getBookmark({
    articleId: article.id,
    userId: session?.user.id,
  });

  return (
    <div className="mt-10 grid grid-cols-1 grid-rows-[1fr_auto_auto] gap-8 md:grid-cols-[50px_1fr_300px] md:grid-rows-[1fr_auto]">
      <ArticleSidebar
        session={session}
        bookmark={bookmark}
        articleId={article.id}
      />

      <main>
        <article className="flex flex-col space-y-4 rounded-xl bg-secondary/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Icon
                name="SquareUserRound"
                className="stroke-muted-foreground"
                size={20}
              />
              <Link
                href={`/author/${article.author.id}`}
                className="text-sm font-medium hover:text-primary"
              >
                {article.author.name}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                name="CalendarDays"
                className="stroke-muted-foreground"
                size={20}
              />
              <small className="select-none text-sm font-medium">
                {formatDate(
                  "fa-IR",
                  { year: "numeric", month: "long", day: "numeric" },
                  article.createdAt,
                )}
              </small>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                name="SquareLibrary"
                className="stroke-muted-foreground"
                size={20}
              />
              <Link
                href={`/categories/${article.category.name}`}
                className="text-sm font-medium hover:text-primary"
              >
                {article.category.name}
              </Link>
            </div>
          </div>

          {/* article title */}
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
            {article.title}
          </h2>

          {/* article cover image */}
          <div className="w-full max-w-full overflow-hidden rounded-xl">
            <Image
              src={article.cover_image}
              alt="تصویر کاور مقاله"
              width={854}
              height={474}
              className="w-full rounded-xl"
              priority
            />
          </div>

          {/* article summary */}
          <p className="prose max-w-none">{article.summary}</p>

          <hr className="border-dashed" />

          {/* article content */}
          <ArticleContent content={article.content as string} />
        </article>
      </main>

      <div className="order-2 mb-0 md:order-none md:mb-5">
        <Suspense fallback={<MoreArticlesSkeleton />}>
          <MoreArticles articleId={article.id} />
        </Suspense>
      </div>

      <div className="order-1 md:order-none md:col-start-2 md:col-end-3 md:mb-5">
        <Comments
          comments={articleComments}
          articleId={article.id}
          session={session}
        />
      </div>
    </div>
  );
}

function MoreArticlesSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-6 w-20 rounded-md" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex h-[66px] items-center justify-between">
          <div className="flex h-full flex-col justify-between">
            <Skeleton className="h-5 w-28 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>

          <Skeleton className="h-[66px] w-[104px] rounded-md" />
        </div>
      ))}
    </div>
  );
}
