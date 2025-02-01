"use client";

import Image from "next/image";
import Link from "next/link";

import { FormEvent } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  signInWithCredentialsAction,
  signInWithGoogleAction,
} from "@/server/actions/auth";

import { signInFormSchema } from "@/lib/schemas/auth";

import Spinner from "@/components/common/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Icon from "../common/icon";

export default function SignInForm() {
  const boundAction = signInWithCredentialsAction.bind(null, "/");
  const {
    execute: signInWithCredentials,
    isExecuting,
    result,
  } = useAction(boundAction);

  const { execute: signInWithGoogle, isExecuting: IsGoogleSignInExecuting } =
    useAction(signInWithGoogleAction);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  // Sign in form handler
  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    signInWithCredentials(values);
  }

  // A function to handle the google sign in
  function handleGoogleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithGoogle();
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">ورود به کد بلاگ</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Google sign in form*/}
        <form onSubmit={handleGoogleSignIn}>
          <Button
            type="submit"
            variant="secondary"
            className="w-full gap-2"
            disabled={IsGoogleSignInExecuting}
          >
            {IsGoogleSignInExecuting ? (
              <Spinner />
            ) : (
              <>
                <Image
                  src="/google.svg"
                  alt="لوگو گوگل"
                  width={20}
                  height={20}
                />
                ورود با گوگل
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">یا</span>
          </div>
        </div>

        {/* Sign in form */}
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
              {isExecuting ? <Spinner /> : "ورود"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          حساب کاربری ندارید؟{" "}
          <Link href={"/sign-up"} className="text-primary underline">
            ثبت نام کنید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
