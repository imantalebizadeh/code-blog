"use client";

import { useAction } from "next-safe-action/hooks";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Icon from "../common/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";

import { updateUser } from "@/server/actions/user";

import { userSchema } from "@/lib/validations/user";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = { user: User };

export default function ProfileForm({ user }: Props) {
  const [changed, setChanged] = useState<boolean>(false);

  const { execute, status } = useAction(updateUser, {
    onError(err) {
      if (err.serverError) {
        toast.error(err.serverError);
      }
    },
    onSuccess() {
      setChanged(false);
      toast.success("اطلاعات با موفقیت ذخیره شد");
    },
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      username: user.username || "",
      bio: user.bio || "",
    },
  });

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    execute(values);
  };

  const handleOnChange = () => {
    if (!changed) {
      setChanged(true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-5">
        {/* fullname input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  onChangeCapture={handleOnChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  className="font-inter"
                  disabled
                  onChangeCapture={handleOnChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* username input */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام کاربری</FormLabel>
              <FormControl>
                <Input
                  className="font-inter"
                  onChangeCapture={handleOnChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* bio input */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>بیوگرافی</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="یکم از خودت برامون بگو :)"
                  className="resize-y"
                  spellCheck
                  onChangeCapture={handleOnChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={!changed || status === "executing"}
        >
          {status === "executing" ? (
            <>
              <Icon
                name="LoaderCircle"
                size={16}
                className="ml-2 animate-spin"
              />
              <span>ذخیره اطلاعات</span>
            </>
          ) : (
            "ذخیره اطلاعات"
          )}
        </Button>
      </form>
    </Form>
  );
}
