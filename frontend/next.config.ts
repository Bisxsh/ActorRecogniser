import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    LOTTIE_SCROLL_URL: process.env.LOTTIE_SCROLL_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
