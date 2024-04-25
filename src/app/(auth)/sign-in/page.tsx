import type { Metadata } from "next";
import Link from "next/link";

import LoginForm from "@/components/forms/login-form";
import GithubLoginButton from "@/components/github-login-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ورود",
};

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">ورود به کد بلاگ</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Github login */}
        <form>
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

        <LoginForm />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          ثبت نام نکرده اید؟{" "}
          <Link href={"/sign-up"} className="text-primary underline">
            ثبت نام کنید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
