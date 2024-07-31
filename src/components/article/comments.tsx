"use client";

import type { Session } from "next-auth";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";

import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

import Icon from "../common/icon";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Comment as CommentType, User } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";

import { createComment } from "@/server/actions/post";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import Comment from "./comment";
import { SubComment } from "@/types";

type CommentsProps = {
  comments: (CommentType & {
    author: User;
    children: (CommentType & { author: User })[];
  })[];
  articleId: string;
  session: Session | null;
};

const formSchema = z.object({
  comment: z.string({ required_error: "نظر خود را وارد کنید" }).min(3, {
    message: "نظر شما حداقل باید 3 کاراکتر باشد",
  }),
});

export default function Comments({
  comments,
  articleId,
  session,
}: CommentsProps) {
  const [open, setOpen] = useState(false);
  const [subComment, setSubComment] = useState<SubComment>(null);

  const { execute, status } = useAction(createComment, {
    onError: ({ serverError }) => {
      toast.error(serverError);
    },
    onSuccess: () => {
      setOpen(false);
      form.resetField("comment");
      toast.success("نظر شما با موفقیت ثبت شد");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = ({ comment }: z.infer<typeof formSchema>) => {
    if (subComment) {
      execute({ comment, articleId, commentId: subComment.id });
      setSubComment(null);
    } else {
      execute({ comment, articleId });
    }
  };

  const showCommentBox = (subComment?: SubComment) => {
    if (session?.user) {
      if (subComment) {
        setSubComment(subComment);
        setOpen(true);

        document
          .getElementById("comments")!
          .scrollIntoView({ behavior: "smooth" });
      } else setOpen(true);
    } else {
      toast.error("برای ثبت نظر ابتدا وارد حساب کاربری خود شوید");
    }
  };

  return (
    <section
      className="flex scroll-mt-5 flex-col gap-y-5 rounded-xl bg-secondary/40 p-4"
      id="comments"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="MessagesSquare" size={32} />
          <h3 className="scroll-m-20 text-2xl font-semibold">نظرات</h3>
        </div>
        <Button
          className="rounded-full"
          onClick={() => {
            subComment && setSubComment(null);
            showCommentBox();
          }}
        >
          <span>افزودن نظر جدید</span>
          <Icon name="MessageSquareMore" size={20} className="mr-2" />
        </Button>
      </div>

      {open && (
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/user-avatar.png"
              alt={""}
              width={50}
              height={50}
              className="rounded-full ring-1 ring-primary ring-offset-4 ring-offset-background"
            />

            <div className="flex flex-col gap-2">
              <p className="font-medium">{session?.user.name}</p>
              <p className="text-sm text-muted-foreground">
                {subComment
                  ? `پاسخ شما به نظر: ${subComment.authorName}`
                  : "ثبت نظر جدید"}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
              id="comment-box"
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={8}
                        placeholder="نظر خود را در اینجا بنویسید..."
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-5">
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-transparent"
                  onClick={() => {
                    setOpen(false);
                    form.resetField("comment");
                    subComment && setSubComment(null);
                  }}
                >
                  لغو
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full"
                  disabled={status === "executing"}
                >
                  {status === "executing" && (
                    <Icon
                      name="LoaderCircle"
                      size={16}
                      className="ml-2 animate-spin"
                    />
                  )}
                  <span> ثبت نظر</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/*TODO: Comments list */}
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <Fragment key={comment.id}>
              <Comment
                comment={comment}
                loggedInUser={session?.user}
                showCommentBox={showCommentBox}
              />
              {comment.children.map((subComment, i) => (
                <Comment
                  key={subComment.id}
                  comment={subComment}
                  parentId={comment.id}
                  loggedInUser={session?.user}
                  showCommentBox={showCommentBox}
                />
              ))}
            </Fragment>
          ))}
        </>
      ) : (
        <div className="flex flex-col gap-5 rounded-lg bg-secondary/40 p-8 text-secondary-foreground">
          <Icon name="MessagesSquare" size={48} className="self-center" />
          <p className="text-center">نظری برای این مقاله ثبت نشده است</p>
        </div>
      )}
    </section>
  );
}
