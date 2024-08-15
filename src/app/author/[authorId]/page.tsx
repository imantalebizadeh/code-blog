import Image from "next/image";
import { notFound } from "next/navigation";

import { getAuthorById } from "@/server/data/post";

type AuthorPageProps = {
  params: { authorId: string };
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorById(params.authorId);

  if (!author) notFound();

  return (
    <div className="grid grid-cols-1 grid-rows-[6rem_3.5rem_3.5rem_500px] rounded-xl bg-accent/50">
      <div className="col-start-1 col-end-2 row-start-1 row-end-3 rounded-t-xl bg-gradient-to-r from-[#fbe9d7] to-[#f6d5f7]" />
      <div className="col-start-1 col-end-2 row-start-2 row-end-4 px-4 md:px-6">
        <Image
          src={author.image ?? "/assets/user-avatar.png"}
          alt={author.name || "نام نویسنده"}
          width={120}
          height={120}
          className="z-10 aspect-square rounded-full ring-4 ring-[#F9F9FA] ring-offset-0 dark:ring-[#111825]"
          priority
        />
      </div>
      <div className="row-start-4 row-end-5 px-4 pb-4 pt-10 md:px-6 md:pb-6">
        <h3 className="mb-1 scroll-m-20 text-2xl font-semibold tracking-tight">
          {author.name}
        </h3>
        <small className="font-inter text-sm font-medium leading-none text-muted-foreground">
          {author.username}@
        </small>

        <p className="leading-7 [&:not(:first-child)]:mt-6">{author.bio}</p>
      </div>
    </div>
  );
}
