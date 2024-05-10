import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "code-blog.storage.iran.liara.space",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

export default nextConfig;
