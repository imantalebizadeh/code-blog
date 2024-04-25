import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(1, "لطفا رمز عبور خود را وارد کنید"),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "نام و نام خانوادگی حداقل باید 3 کاراکتر باشد")
    .max(50, "نام و نام خانوادگی حداکثر باید 50 کاراکتر باشد"),
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور حداقل باید 6 کاراکتر باشد"),
});
