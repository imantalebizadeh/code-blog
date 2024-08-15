import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavLinksProps = {} & React.ComponentPropsWithoutRef<"nav">;

export default function NavLinks(props: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav {...props}>
      <ul className="flex flex-col gap-x-6 gap-y-4 md:flex-row">
        {navLinks.map(({ title, href }) => (
          <li key={title}>
            <Link
              href={href}
              className={cn(
                "text-muted-foreground transition-colors duration-300 hover:text-foreground",
                { "text-foreground": pathname === href },
              )}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
