import { z } from "zod";
import { zfd } from "zod-form-data";

import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
  UPLOAD_TYPE,
} from "@/lib/constants";

export const uploadFileSchema = z.object({
  uploadType: z.enum([UPLOAD_TYPE.AVATAR, UPLOAD_TYPE.POST]),
  file: zfd
    .file()
    .refine((file) => file.size > 0, {
      message: "لطفا تصویر را انتخاب کنید.",
    })
    .refine(
      (file) =>
        ACCEPTED_FILE_TYPES.includes(
          file.type as (typeof ACCEPTED_FILE_TYPES)[number],
        ),
      {
        message: "تنها فرمت های .jpg, .jpeg, .png مجاز هستند.",
      },
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "حداکثر حجم تصویر می تواند 3 مگابایت باشد.",
    }),
});
