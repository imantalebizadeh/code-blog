import React from "react";

import { getAllCategories } from "@/server/data/post";

import HeroSection from "@/components/layout/hero-section";
import Sidebar from "@/components/layout/sidebar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const categories = await getAllCategories();

  return (
    <div>
      <HeroSection />

      <div className="md:mt-26 mt-24 grid grid-cols-1 grid-rows-[auto_1fr] gap-8 md:grid-cols-[auto_1fr] md:grid-rows-1">
        <Sidebar categories={categories} />
        {children}
      </div>
    </div>
  );
}
