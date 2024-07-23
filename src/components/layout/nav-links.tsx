import Link from "next/link";

import { navLinks } from "@/lib/constants";

type NavLinksProps = {} & React.ComponentPropsWithoutRef<"nav">;

export default function NavLinks(props: NavLinksProps) {
  return (
    <nav {...props}>
      <ul className="flex flex-col gap-x-6 gap-y-4 md:flex-row">
        {navLinks.map(({ title, href }) => (
          <li key={title}>
            <Link
              href={href}
              className="transition-colors duration-300 hover:text-muted-foreground"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
