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
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
};

export default nextConfig;
