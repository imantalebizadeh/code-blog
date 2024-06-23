import { getAllCategories } from "@/server/data/post";

import PostForm from "@/components/forms/post-form";

export default async function CreatePostPage() {
  const categories = await getAllCategories();

  return (
    <section className="flex flex-col gap-3">
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        ایجاد مقاله جدید
      </h1>
      <div className="rounded-lg bg-muted/40 p-4">
        <PostForm type={"Create"} categories={categories} />
      </div>
    </section>
  );
}
