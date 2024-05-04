import { cache } from "react";

import prisma from "../db";

export const getUserByUsername = cache(async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
});
