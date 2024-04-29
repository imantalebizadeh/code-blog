"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html>
      <body className="flex flex-col items-center justify-center gap-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          خطایی رخ داده است
        </h2>
        <Button onClick={() => reset()}>تلاش مجدد</Button>
      </body>
    </html>
  );
}
