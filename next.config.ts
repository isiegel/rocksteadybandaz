import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — AVIF first (smallest), WebP as fallback — so the
    // optimizer ships far smaller photos than the source JPEGs/PNGs.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gigheaven.com",
        pathname: "/images/v5/GH-White.svg",
      },
    ],
    // Band photos and the logo rarely change, so let the CDN keep optimized
    // variants for ~31 days instead of re-optimizing on short intervals.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
