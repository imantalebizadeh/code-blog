import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({ required_error: "وارد کردن نام و نام خانوادگی الزامی می باشد" })
    .min(1, "وارد کردن نام و نام خانوادگی الزامی می باشد"),
  email: z
    .string({ required_error: "وارد کردن ایمیل الزامی می باشد" })
    .min(1, "وارد کردن ایمیل الزامی می باشد")
    .email("لطفا یک ایمیل معتبر وارد کنید"),
  username: z
    .string({ required_error: "وارد کردن نام کاربری الزامی است" })
    .min(3, "نام کاربری حداقل باید 3 کاراکتر باشد")
    .max(50, "نام کاربری حداکثر باید 50 کاراکتر باشد")
    .regex(
      /^[a-z0-9_-]{3,50}$/g,
      "نام کاربری باید شامل حروف a تا z, اعداد,- و _ باشد",
    ),
  bio: z.string().max(500, "بیوگرافی حدااکثر باید 500 کاراکتر باشد").optional(),
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
