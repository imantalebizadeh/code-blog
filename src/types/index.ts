import { Category, Post, User } from "@prisma/client";

export type NavItem = {
  title: string;
  href: string;
};
export type BlogPost = Post & {
  author: User;
  category: Category;
};
