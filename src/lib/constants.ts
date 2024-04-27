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
