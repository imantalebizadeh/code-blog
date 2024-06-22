"use server";

import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";
import { z } from "zod";

import { authAction } from "@/lib/action.client";

import { env } from "@/env";

const s3 = new S3({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
});

const MAX_FILE_SIZE = 3000000;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const uploadSchema = z.object({
  formData: z
    .instanceof(FormData)
    .refine(
      (formData) =>
        (formData.get("image") as File).size === 0 ||
        formData.get("image") === null
          ? false
          : true,
      "لطفا تصویر را انتخاب کنید.",
    )

    .refine(
      (formData) =>
        ACCEPTED_IMAGE_TYPES.includes((formData.get("image") as File)?.type),
      "تنها فرمت های .jpg, .jpeg, .png مجاز هستند.",
    )
    .refine(
      (formData) => (formData.get("image") as File)?.size <= MAX_FILE_SIZE,
      `حداکثر حجم تصویر می تواند 3 مگابایت باشد.`,
    ),
  isAvatar: z.boolean().optional(),
});

export const uploadImage = authAction(
  uploadSchema,
  async ({ formData, isAvatar }, user) => {
    try {
      const file = formData.get("image") as File;
      const Key = isAvatar
        ? `${user.username}-${file.name}`
        : `${crypto.randomBytes(8).toString("hex")}-${file.name}`;

      const signedUrl = await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: env.S3_BUCKET,
          Key,
        }),
        {
          expiresIn: 60,
        },
      );

      const data = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      return { imageUrl: data.url.split("?")[0] };
    } catch (error) {
      console.error(error);
      throw new Error("خطای در بارگذاری تصویر, لطفا مجددا تلاش کنید");
    }
  },
);
