import { notFound } from "next/navigation";

import { getAllCategories, getPostById } from "@/server/data/post";

import PostForm from "@/components/forms/post-form";

type Props = {
  params: {
    postId: string;
  };
};

export default async function EditPostPage({ params }: Props) {
  const postData = getPostById(params.postId);
  const categoriesData = getAllCategories();

  const [post, categories] = await Promise.all([postData, categoriesData]);

  if (!post || !categories) notFound();

  return <PostForm type="Edit" categories={categories} post={post} />;
}
