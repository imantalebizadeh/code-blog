"use client";

import { useAction } from "next-safe-action/hooks";

import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import Icon from "../common/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";

import { updateUserPassword } from "@/server/actions/user";

import { cn } from "@/lib/utils";
import { passwordFormSchema } from "@/lib/validations/user";

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

type Props = {
  user: User;
} & ComponentPropsWithoutRef<"form">;

export default function PasswordEditForm({ user, className }: Props) {
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: !user.password
      ? {
          currentPassword: "",
          newPassword: undefined,
          confirmPassword: undefined,
        }
      : {
          currentPassword: undefined,
          newPassword: undefined,
          confirmPassword: undefined,
        },
  });

  const { execute, status } = useAction(updateUserPassword, {
    onError(err) {
      toast.error(err.serverError);
    },
    onSuccess() {
      user.password
        ? toast.success("رمز عبور با موفقیت تغییر یافت")
        : toast.success("رمز عبور با موفقیت ذخیره شد");

      // TODO: Check form reset
      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof passwordFormSchema>) => {
    const { currentPassword, newPassword } = values;

    execute({ currentPassword, newPassword });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-5", className)}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور قبلی</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="font-inter"
                  disabled={!user.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور جدید</FormLabel>
              <FormControl>
                <Input type="password" className="font-inter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تکرار رمز عبور جدید</FormLabel>
              <FormControl>
                <Input type="password" className="font-inter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={status === "executing"}
        >
          {status === "executing" ? (
            <>
              <Icon
                name="LoaderCircle"
                size={16}
                className="ml-2 animate-spin"
              />
              {user.password ? (
                <span>تغییر رمز عبور</span>
              ) : (
                <span>ثبت رمز عبور</span>
              )}
            </>
          ) : user.password ? (
            <span>تغییر رمز عبور</span>
          ) : (
            <span>ثبت رمز عبور</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
