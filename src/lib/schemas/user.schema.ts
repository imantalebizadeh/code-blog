import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nullable(),
  id: z.string(),
  email: z.string(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  username: z.string(),
  password: z.string().nullable(),
  lastLoginAt: z.date().nullable(),
  status: z.nativeEnum(UserStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
});

export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "وارد کردن رمز عبور قبلی الزامی می باشد" })
      .max(30, "رمز عبور حداکثر باید 30 کاراکتر باشد"),
    newPassword: z
      .string({ required_error: " وارد کردن رمز عبور جدید الزامی می باشد" })
      .min(6, "رمز عبور حداقل باید 6 کاراکتر باشد")
      .max(30, "رمز عبور حداکثر باید 30 کاراکتر باشد"),
    confirmPassword: z
      .string({ required_error: "وارد کردن تکرار رمز عبور الزامی می باشد" })
      .max(30, "رمز عبور حداکثر باید 30 کاراکتر باشد"),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "تکرار رمز عبور صحیح نمی باشد",
      path: ["confirmPassword"],
    },
  );
