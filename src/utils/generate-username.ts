import { transliterationMap } from "@/lib/constants";
import prisma from "@/server/prisma";

interface UsernameOptions {
  isPersian?: boolean;
  maxLength?: number;
}

function generateUniqueUsername(name: string, options: UsernameOptions = {}) {
  if (!name?.trim()) {
    throw new Error("نام نمیتواند خالی باشد");
  }

  const { isPersian = isContainsPersian(name), maxLength = 20 } = options;

  // Remove extra spaces and normalize whitespace
  const normalizedName = name.trim().replace(/\s+/g, " ");

  let processedName = "";

  if (isPersian) {
    // Handle Persian name
    processedName = normalizedName
      .split("")
      .map((char) => transliterationMap[char.toLowerCase()] || char)
      .join("");
  } else {
    // Handle English name
    processedName = normalizedName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Keep spaces for now
      .trim()
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  // Clean up and limit length
  processedName = processedName
    .replace(/[^a-z0-9-]/g, "") // Remove any remaining non-alphanumeric characters except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
    .slice(0, maxLength);

  if (!processedName) {
    throw new Error(
      isPersian
        ? "نام باید حداقل شامل یک حرف فارسی باشد"
        : "Name must contain at least one valid character",
    );
  }

  // Generate a random 6-character string using numbers and lowercase letters
  const randomString = Math.random().toString(36).substring(2, 8);

  return `${processedName}-${randomString}`;
}

async function isUsernameUnique(username: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  return !!user;
}

// Helper function to detect Persian characters
function isContainsPersian(text: string): boolean {
  const persianPattern = /[\u0600-\u06FF]/;
  return persianPattern.test(text);
}

export async function generateUsername(
  name: string,
  options: UsernameOptions = {},
  maxAttempts = 3,
): Promise<string | undefined> {
  try {
    for (let i = 0; i < maxAttempts; i++) {
      const username = generateUniqueUsername(name, options);
      if (await isUsernameUnique(username)) {
        return username;
      }
    }
  } catch {
    throw new Error("Unable to generate a unique username. Please try again.");
  }
}
