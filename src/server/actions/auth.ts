"use server";

import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { z } from "zod";

import { SERVER_ERROR_MESSAGE } from "@/lib/constants";
import { publicActionClient } from "@/lib/safe-action";
import { signInFormSchema, signupActionSchema } from "@/lib/schemas/auth";
import { generateUsername } from "@/utils/generate-username";

import { signIn } from "../auth";
import prisma from "../prisma";

export const signInWithGoogleAction = publicActionClient
  .bindArgsSchemas<[redirectTo: z.ZodString]>([z.string()])
  .action(async ({ bindArgsParsedInputs }) => {
    const [redirectTo] = bindArgsParsedInputs;

    await signIn("google", { redirectTo });
  });

export const signInWithCredentialsAction = publicActionClient
  .schema(signInFormSchema)
  .bindArgsSchemas<[redirectTo: z.ZodString]>([z.string()])
  .action(async ({ parsedInput, bindArgsParsedInputs }) => {
    const { email, password } = parsedInput;
    const [redirectTo] = bindArgsParsedInputs;

    try {
      await signIn("credentials", { email, password, redirectTo });
      return { error: "" };
    } catch (error) {
      if (error instanceof CredentialsSignin)
        return { error: "ایمیل یا رمز عبور اشتباه است" };
      throw error;
    }
  });

export const signupAction = publicActionClient
  .schema(signupActionSchema)
  .bindArgsSchemas<[redirectTo: z.ZodString]>([z.string()])
  .action(
    async ({ parsedInput }) => {
      const { email, password, name } = parsedInput;

      // check if user already exists
      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      // if user already exists, throw error
      if (userExists) throw new Error("این ایمیل قبلا ثبت شده است");

      // hash password
      const passwordHash = await hash(password, 10);
      // generate unique username
      const username = await generateUsername(name);

      if (username) {
        // create user
        await prisma.user.create({
          data: {
            name,
            username,
            email,
            image: "/assets/user-avatar.png",
            password: passwordHash,
          },
        });

        return { email, password };
      }
    },
    {
      async onError(error) {
        // TODO: Log error to sentry
        console.log(error);

        throw new Error(SERVER_ERROR_MESSAGE);
      },
      async onSuccess({ data, bindArgsParsedInputs }) {
        if (data) {
          const { email, password } = data;
          const [redirectTo] = bindArgsParsedInputs;
          await signIn("credentials", { email, password, redirectTo });
        }
      },
    },
  );
