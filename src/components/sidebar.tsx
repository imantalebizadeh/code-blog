"use client";

import { useState } from "react";

import type { Category } from "@prisma/client";

import Icon from "./common/icon";
import SidebarItem from "./sidebar-item";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  categories: Category[];
};

export default function Sidebar({ categories }: Props) {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex w-full max-w-full flex-col gap-5 md:max-w-sm">
      {/* Search input */}
      <div className="relative">
        <Input
          type="text"
          placeholder="جستجو"
          className="pl-10"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute left-1 top-1/2 size-8 -translate-y-1/2 bg-transparent"
          disabled={!search}
        >
          <Icon name="Search" size={16} />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex w-full flex-col gap-2">
        <h3 className="hidden text-sm font-medium md:block">دسته بندی ها</h3>

        <ul className="flex flex-row gap-2 overflow-x-scroll md:flex-col md:overflow-hidden">
          <SidebarItem href="/">همه پست ها</SidebarItem>
          {categories.map((category) => (
            <SidebarItem
              key={category.name}
              href={`/categories/${category.name}`}
            >
              {category.name}
            </SidebarItem>
          ))}
          <SidebarItem href="/categories">همه دسته بندی ها</SidebarItem>
        </ul>
      </div>
    </div>
  );
}
