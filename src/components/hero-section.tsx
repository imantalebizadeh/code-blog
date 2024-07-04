import Link from "next/link";

import HeroImage from "./hero-img";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 grid-rows-[1fr_auto] items-start justify-items-center gap-10 py-0 md:grid-cols-2 md:grid-rows-1 md:items-center">
      <div className="place-self-end overflow-hidden sm:size-[400px] md:order-1 md:size-[600px]">
        <HeroImage className="size-[95%] self-end" />
      </div>

      <div className="relative flex flex-col items-center gap-5 md:items-start">
        <div className="absolute -right-40 -top-40 size-64 rounded-full bg-primary/10 blur-3xl" />
        <h1 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight md:text-start md:text-5xl lg:text-5xl">
          کد بلاگ, دنیای مقالات برنامه نویسی
        </h1>
        <p className="max-w-xl text-center text-base text-muted-foreground md:text-start md:text-lg">
          اینجا می تونی مقالات مختلف مربوط به حوزه برنامه نویسی رو بخونی و یه
          عامله چیزای جدید یاد بگیری , و یا دانسته های خودت رو با بقیه به اشتراک
          بزاری :)
        </p>
        <Button size="lg" className="rounded-full" asChild>
          <Link href="/create">شروع به نوشتن</Link>
        </Button>
      </div>
    </section>
  );
}
