import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * Static Export Configuration for Cloudflare Pages
   */
  output: "export",

  /**
   * Image Optimization
   * Must be disabled for static export unless using a loader
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
