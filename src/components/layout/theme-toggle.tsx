"use client";

import { useTheme } from "next-themes";

import * as React from "react";

import Icon from "../common/icon";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <Button
          variant="secondary"
          type="button"
          size="icon"
          className={cn("rounded-full", className)}
          onClick={() => setTheme("dark")}
        >
          <Icon name="Moon" size={20} />
        </Button>
      ) : (
        <Button
          variant="secondary"
          type="button"
          size="icon"
          className={cn("rounded-full", className)}
          onClick={() => setTheme("light")}
        >
          <Icon name="Sun" size={20} />
        </Button>
      )}
    </>
  );
};

export default ThemeToggle;
