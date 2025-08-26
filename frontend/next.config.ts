import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    LOTTIE_SCROLL_URL: process.env.LOTTIE_SCROLL_URL,
  },
  /* config options here */
};

export default nextConfig;
