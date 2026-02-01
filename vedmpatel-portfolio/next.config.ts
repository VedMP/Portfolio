import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * Static Export Configuration for Cloudflare Pages
   */
  output: "export",

  /**
   * Trailing Slash - Required for Cloudflare Pages
   * Ensures proper routing for static sites
   */
  trailingSlash: true,

  /**
   * Image Optimization
   * Must be disabled for static export unless using a loader
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
