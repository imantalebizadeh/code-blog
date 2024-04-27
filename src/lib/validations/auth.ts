import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "وارد کردن ایمیل الزامی می باشد" })
    .min(1, "وارد کردن ایمیل الزامی می باشد")
    .email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z
    .string({ required_error: "لطفا رمز عبور خود را وارد کنید" })
    .min(1, "لطفا رمز عبور خود را وارد کنید"),
});

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "وارد کردن نام و نام خانوادگی الزامی می باشد" })
    .min(3, "نام و نام خانوادگی حداقل باید 3 کاراکتر باشد")
    .max(50, "نام و نام خانوادگی حداکثر باید 50 کاراکتر باشد"),
  email: z
    .string({ required_error: "وارد کردن ایمیل الزامی می باشد" })
    .min(1, "وارد کردن ایمیل الزامی می باشد")
    .email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z
    .string({ required_error: "لطفا رمز عبور خود را وارد کنید" })
    .min(6, "رمز عبور حداقل باید 6 کاراکتر باشد"),
});
