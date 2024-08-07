import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string({ required_error: "عنوان مقاله الزامی می باشد" })
    .min(3, "عنوان حداقل باید 3 کاراکتر باشد")
    .max(100, "عنوان حداکثر باید 100 کاراکتر باشد"),
  content: z
    .string({ required_error: "محتوای مقاله الزامی می باشد" })
    .min(1, "محتوای مقاله الزامی می باشد"),
  summary: z
    .string({ required_error: "خلاصه مقاله الزامی می باشد" })
    .min(1, "خلاصه مقاله الزامی می باشد")
    .max(800, "خلاصه مقاله حداکثر باید 800 کاراکتر باشد"),
  category: z.string({
    required_error: "دسته بندی مقاله الزامی می باشد",
  }),
  image: z.union([
    z.instanceof(File, { message: "تصویر مقاله الزامی می باشد" }),
    z.string({ required_error: "تصویر مقاله الزامی می باشد" }).url(),
  ]),
});
