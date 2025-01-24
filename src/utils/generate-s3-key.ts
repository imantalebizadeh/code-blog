import { randomBytes } from "crypto";
import { UPLOAD_TYPE } from "@/lib/constants";

// Helper to generate S3 key based on upload type
export function generateS3Key(
  uploadType: keyof typeof UPLOAD_TYPE,
  filename: string,
  userId: string,
) {
  const fileExtension = filename.split(".").pop();
  const timestamp = Date.now();

  switch (uploadType) {
    case "AVATAR":
      return `avatars/${userId}.${fileExtension}`;
    case "POST":
      return `posts/${userId}/${timestamp}-${randomBytes(8).toString("hex")}.${fileExtension}`;
    default:
      return `uploads/${userId}/${timestamp}-${randomBytes(8).toString("hex")}.${fileExtension}`;
  }
}
