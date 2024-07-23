import type { Category } from "@prisma/client";

import SearchInput from "./search-input";
import SidebarItem from "./sidebar-item";

type SidebarProps = {
  categories: Category[];
};

export default function Sidebar({ categories }: SidebarProps) {
  return (
    <div className="flex w-full max-w-full flex-col gap-5 md:max-w-sm">
      {/* Search input */}
      <SearchInput />

      {/* Categories */}
      <div className="flex w-full flex-col gap-2">
        <h3 className="hidden text-sm font-medium md:block">دسته بندی ها</h3>

        <ul className="flex flex-row gap-2 overflow-x-scroll md:flex-col md:overflow-hidden">
          <SidebarItem text="همه پست ها" href="/" />
          {categories.map((category) => (
            <SidebarItem
              key={category.name}
              text={category.name}
              href={encodeURI(`/categories/${category.name}`)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
