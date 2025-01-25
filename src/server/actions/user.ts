"use server";

import { revalidatePath } from "next/cache";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcryptjs";

import { SERVER_ERROR_MESSAGE } from "@/lib/constants";
import { authenticatedActionClient } from "@/lib/safe-action";
import { userSchema } from "@/lib/schemas/user.schema";

import prisma from "../prisma";

export const updateUser = authenticatedActionClient
  .schema(userSchema.partial())
  .action(async ({ parsedInput: userData, ctx: { user } }) => {
    // Check if the username is already taken
    try {
      await prisma.user.update({
        where: { username: user.username },
        data: {
          ...userData,
          password: userData.password && (await hash(userData.password, 10)),
        },
      });

      revalidatePath("/profile");
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new Error("این نام کاربری قبلا ثبت شده است");
      } else {
        throw new Error(SERVER_ERROR_MESSAGE);
      }
    }
  });
