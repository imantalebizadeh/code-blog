import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 34 }, (_, i) => (
        <div key={i} className="flex w-full max-w-full flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[162px] w-full rounded-xl" />

            <Skeleton className="h-4 w-[50px] rounded-xl" />

            <Skeleton className="h-5 w-[100px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[280px]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[50px]" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
