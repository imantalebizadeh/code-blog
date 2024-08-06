import { cn } from "@/lib/utils";

import { Skeleton } from "./ui/skeleton";

type Props = {
  viewMode: "home" | "profile";
};

const PostsSkeleton = ({ viewMode }: Props) => (
  <section
    className={cn("grid grid-cols-1 gap-x-10 gap-y-8", {
      "md:grid-cols-3": viewMode === "home",
      "md:grid-cols-4": viewMode === "profile",
    })}
  >
    {Array.from({ length: viewMode === "home" ? 3 : 4 }, (_, i) => (
      <div key={i} className={"flex w-full max-w-full flex-col gap-3"}>
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

export default PostsSkeleton;
