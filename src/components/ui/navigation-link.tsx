"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import * as React from "react";

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

type NavigationLinkProps = React.ComponentProps<typeof NextLink>;

const NavigationLink = ({ href, children, ...props }: NavigationLinkProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NextLink href={href} legacyBehavior passHref {...props}>
      <NavigationMenuLink
        active={isActive}
        className={navigationMenuTriggerStyle()}
      >
        {children}
      </NavigationMenuLink>
    </NextLink>
  );
};

export { NavigationLink };
