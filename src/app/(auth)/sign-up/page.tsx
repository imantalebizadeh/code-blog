import type { Metadata } from "next";
import Link from "next/link";

import { githubSignIn } from "@/server/actions/auth";

import SignUpForm from "@/components/forms/signup-form";
import GithubLoginButton from "@/components/github-login-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ثبت نام",
};

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">عضویت در کد بلاگ</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Github login */}
        <form action={githubSignIn}>
          <GithubLoginButton />
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

        <SignUpForm />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          حساب کاربری دارید؟{" "}
          <Link href={"/login"} className="text-primary underline">
            وارد شوید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
