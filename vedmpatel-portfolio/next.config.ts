import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * React Compiler for automatic optimizations
   */
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

  /**
   * Allowed Dev Origins - Required for future Next.js versions
   * Allows cross-origin requests from local network during development
   */
  allowedDevOrigins: ["192.168.118.1"],

  /**
   * Performance Optimizations for faster compilation
   */
  experimental: {
    // Enable parallel compilation for faster builds
    webpackBuildWorker: true,
  },
};

export default nextConfig;
