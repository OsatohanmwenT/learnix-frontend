import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow any domain (you can restrict this)
      },
    ],
  }
};

export default nextConfig;
