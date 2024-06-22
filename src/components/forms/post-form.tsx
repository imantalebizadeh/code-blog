"use client";

import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import Icon from "../common/icon";
import TiptapEditor from "../tiptap-editor";
import UploadDropzone from "../upload-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Post } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";

import { createPost } from "@/server/actions/post";
import { uploadImage } from "@/server/actions/upload";

import { cn } from "@/lib/utils";
import { postFormSchema } from "@/lib/validations/post";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PostFormProps = {
  type: "Create" | "Update";
  categories: Category[];
  post?: Post;
} & ComponentPropsWithoutRef<"form">;

export default function PostForm({
  className,
  type,
  categories,
  post,
  ...props
}: PostFormProps) {
  const router = useRouter();

  const { execute: uploadCoverImage, status: uploadStatus } = useAction(
    uploadImage,
    {
      onError: (err) => {
        toast.error(err.serverError);
      },
      onSuccess: (res) => {
        const { title, content, category } = form.getValues();

        addPost({
          title,
          content,
          category,
          image: res.imageUrl,
        });
      },
    },
  );

  const { execute: addPost, status: addStatus } = useAction(createPost, {
    onError(err) {
      toast.error(err.serverError);
    },
    onSuccess() {
      toast.success("مقاله با موفقیت ذخیره شد");

      router.push("/profile");
    },
  });

  const form = useForm<z.infer<typeof postFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(postFormSchema),
    defaultValues: post
      ? {
          title: post.title,
          content: post.content as string,
          category: post.categoryId,
        }
      : undefined,
  });

  const onSubmit = ({ image }: z.infer<typeof postFormSchema>) => {
    const formData = new FormData();
    formData.append("image", image);

    uploadCoverImage({ formData });
  };

  const disabled = [uploadStatus, addStatus].some(
    (status) => status === "executing",
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
        {...props}
      >
        <div className="flex flex-col gap-8 *:flex-1 md:flex-row">
          {/* Post Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان مقاله</FormLabel>
                <FormControl>
                  <Input autoFocus {...field} />
                </FormControl>
                <FormDescription>
                  عنوان مقاله حداکثر باید 100 کاراکتر باشد
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته بندی</FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته بندی" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Post Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تصویر مقاله</FormLabel>
              <FormControl>
                <UploadDropzone
                  defaultImageUrl={post?.cover_image}
                  onFileAccepted={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Post Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>محتوای مقاله</FormLabel>
              <FormControl>
                <TiptapEditor onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit and Cancel button */}
        <div className="flex w-full items-center justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <Icon name="ArrowRight" size={16} className="ml-2" />
            <span>انصراف</span>
          </Button>

          <Button type="submit" disabled={disabled}>
            {disabled ? (
              <Icon
                name="LoaderCircle"
                size={16}
                className="ml-2 animate-spin"
              />
            ) : (
              <Icon
                name={type === "Create" ? "Plus" : "Pen"}
                size={16}
                className="ml-2"
              />
            )}

            <span>{type === "Create" ? "ایجاد مقاله" : "ویرایش مقاله"}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
