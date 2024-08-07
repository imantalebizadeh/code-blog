import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex space-x-8 bg-accent/50 pt-5">
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-full bg-background/80" />
        ))}

        <Skeleton className="w-24 bg-background/80" />
      </div>
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full bg-background/80" />
        ))}

        <Skeleton className="w-24 bg-background/80" />
      </div>
    </section>
  );
}
