import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import type { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";

import { NavItem } from "@/types";

export const navLinks: NavItem[] = [
  {
    title: "همه مقالات",
    href: "/posts",
  },
  {
    title: "درباره ما",
    href: "/about-us",
  },
  {
    title: "قوانین و مقرارت",
    href: "/terms-conditions",
  },
];

export const transliterationMap: Record<string, string> = {
  ا: "a",
  ب: "b",
  پ: "p",
  ت: "t",
  ث: "s",
  ج: "j",
  چ: "ch",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "z",
  ر: "r",
  ز: "z",
  ژ: "zh",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "z",
  ط: "t",
  ظ: "z",
  ع: "‘",
  غ: "gh",
  ف: "f",
  ق: "q",
  ک: "k",
  گ: "g",
  ل: "l",
  م: "m",
  ن: "n",
  و: "v",
  ه: "h",
  ی: "y",
};

export const editorExtensions: Extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  TextAlign.configure({
    defaultAlignment: "right",
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "متن مورد نظر خود را در اینجا بنویسید...",
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(all),
    HTMLAttributes: {
      dir: "ltr",
      class: "dark:bg-secondary",
    },
  }),
  Link.configure({
    openOnClick: "whenNotEditable",
    validate: (href) => /^https?:\/\//.test(href),
  }),
  Highlight,
  Underline,
];

export const DEFAULT_SERVER_ERROR =
  "خطایی در سمت سرور رخ داده است. لطفا مجددا تلاش کنید.";
