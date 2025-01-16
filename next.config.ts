import type { NextConfig } from "next";

import "./src/env";

const nextConfig: NextConfig = {
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
