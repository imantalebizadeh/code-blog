"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="space-y-5 text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          404
        </h1>
        <h3 className="select-none scroll-m-20 text-2xl font-semibold tracking-tight">
          صفحه مد نظر یافت نشد!
        </h3>
        <Button
          variant={"default"}
          onClick={() => router.push("/", { scroll: false })}
        >
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
}
