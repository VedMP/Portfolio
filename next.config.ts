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
   * Compress responses with gzip/brotli
   */
  compress: true,

  /**
   * Remove X-Powered-By header for security + minor response size reduction
   */
  poweredByHeader: false,

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
};

export default nextConfig;
