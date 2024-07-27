import Image from "next/image";
import Link from "next/link";

import prisma from "@/server/db";

type MoreArticlesProps = {
  articleId: string;
};

export default async function MoreArticles({ articleId }: MoreArticlesProps) {
  const articles = await prisma.post.findMany({
    where: { NOT: { id: articleId } },
    include: { author: true },
    take: 3,
  });

  return (
    <>
      <h3 className="text-lg font-semibold">مطالب بیشتر</h3>
      <ul className="mt-5 space-y-5">
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/blog/${article.id}`} className="group">
              <article className="flex h-[66px] items-center justify-between">
                <div className="flex h-full flex-col justify-between">
                  <p className="line-clamp-2 group-hover:text-primary">
                    {article.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {article.author.name}
                  </p>
                </div>

                <div className="shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    width={104}
                    height={66}
                    className="h-[66px] w-[104px] rounded-md border"
                  />
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
