import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { transliterationMap } from "./constants";

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
