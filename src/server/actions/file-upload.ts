"use server";

import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { authenticatedActionClient } from "@/lib/safe-action";
import { generateS3Key } from "@/utils/generate-s3-key";

import { env } from "@/env";

import { uploadFileSchema } from "../../lib/schemas/file-upload.shcema";

const s3 = new S3({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
});

export const uploadFileAction = authenticatedActionClient
  .schema(uploadFileSchema)
  .action(async ({ parsedInput: { file, uploadType }, ctx: { user } }) => {
    // Validate file exists
    if (!file) {
      throw new Error("فایل یافت نشد");
    }

    // Generate a key for the file
    const Key = generateS3Key(uploadType, file.name, user.id!);

    // Create the S3 command
    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000", // 1 year cache
      Metadata: {
        "original-name": file.name,
        "uploaded-by": user.username,
      },
    });

    // Get signed URL
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });

    // Upload to S3
    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error("خطا در بارگذاری تصویر");
    }

    const imageUrl = `${env.S3_PUBLIC_URL}/${Key}`;
    return { imageUrl };
  });
