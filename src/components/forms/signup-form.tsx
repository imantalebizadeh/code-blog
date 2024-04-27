"use client";

import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";

import Icon from "../common/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signUp } from "@/server/actions/auth";

import { signUpSchema } from "@/lib/validations/auth";

import { Alert, AlertDescription } from "@/components/ui/alert";
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

export default function SignUpForm() {
  const { execute, result, status } = useAction(signUp);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input autoComplete="email" className="font-inter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور</FormLabel>
              <FormControl>
                <Input type="password" className="font-inter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {result.data?.error && (
          <Alert variant={"destructive"} dir="rtl">
            <Icon name="CircleAlert" size={20} />
            <AlertDescription>{result.data.error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={status === "executing"}
        >
          {status === "executing" ? (
            <Icon name="LoaderCircle" size={20} className="animate-spin" />
          ) : (
            "ثبت نام"
          )}
        </Button>
      </form>
    </Form>
  );
}
