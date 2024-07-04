import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function SidebarItem({
  href,
  key,
  children,
}: React.ComponentPropsWithoutRef<typeof Link>) {
  const pathname = usePathname();

  return (
    <li
      key={key}
      className={cn(
        "flex h-9 shrink-0 items-center justify-center px-3 py-2 font-semibold md:justify-start",
        {
          "md:border-r-2 md:border-r-primary": href === pathname,
        },
      )}
    >
      <Link
        href={href}
        className={cn("hover:text-primary", {
          "text-primary": href === pathname,
        })}
      >
        {children}
      </Link>
    </li>
  );
}
