"use server";

import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { auth } from "@/server/auth";

import { env } from "@/env";

const s3 = new S3({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
});

export const uploadImage = async (formData: FormData) => {
  const session = await auth();

  if (!session?.user) return { error: "احراز هویت نشده است" };

  const file = formData.get("file") as File;

  if (file) {
    try {
      const signedUrl = await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: env.S3_BUCKET,
          Key: `${session.user.username}-${file.name}`,
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
    }
  }
};
