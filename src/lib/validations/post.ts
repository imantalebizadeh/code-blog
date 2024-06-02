import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(3, "عنوان حداقل باید 3 کاراکتر باشد")
    .max(100, "عنوان حداکثر باید 100 کاراکتر باشد"),
  content: z.string(),
  category: z.string({
    required_error: "یک دسته بندی برای مقاله انتخاب کنید",
  }),
});
