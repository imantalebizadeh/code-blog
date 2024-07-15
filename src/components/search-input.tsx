"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import Icon from "./common/icon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
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
        onClick={() => router.push(`/search?q=${search}`)}
      >
        <Icon name="Search" size={16} />
      </Button>
    </div>
  );
}
