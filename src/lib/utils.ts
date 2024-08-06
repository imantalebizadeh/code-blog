import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { transliterationMap } from "./constants";
import { env } from "@/env";
import type { fetcherOptions } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueUsername(persianName: string) {
  // Transliterate the Persian name
  // I know that this Persian to English translation operation does not work correctly, but it works correctly to generate a unique username :)
  const transliteratedName = persianName
    .split("")
    .map((char) => transliterationMap[char] || char)
    .join("")
    .split(" ")
    .join("");

  // Generate a random number between 1000 and 9999
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  // Combine the transliterated name with the random number
  const uniqueUsername = `${transliteratedName}-${randomNumber}`;

  return uniqueUsername;
}

export function formatDate(
  locale: string,
  options: Intl.DateTimeFormatOptions,
  date: Date,
) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export async function fetcher<T>({
  endpoint,
  searchParams,
  segments,
}: fetcherOptions): Promise<T> {
  const BASE_URL =
    env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:3000" : "";
  const url = new URL(`/api/${endpoint}`, BASE_URL);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  if (segments) {
    segments.forEach((segment) => {
      url.pathname += `/${segment}`;
    });
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("خطای در سمت سرور رخ داده است, لطفا مجددا تلاش کنید");
  }

  return response.json();
}
