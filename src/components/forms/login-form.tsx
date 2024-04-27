"use client";

import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";

import Icon from "../common/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signIn } from "@/server/actions/auth";

import { signInSchema } from "@/lib/validations/auth";

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

export default function LoginForm() {
  const { execute, result, status } = useAction(signIn);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input autoComplete="email" {...field} />
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

        <Button type="submit" className="w-full">
          {status === "executing" ? (
            <Icon name="LoaderCircle" size={20} className="animate-spin" />
          ) : (
            "ورود"
          )}
        </Button>
      </form>
    </Form>
  );
}
