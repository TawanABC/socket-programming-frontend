import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SERVER_ADDRESS: process.env.SERVER_ADDRESS,
  },
};

export default nextConfig;
