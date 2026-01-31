import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * Security Headers
   * Implements strict security policies to protect visitors and the application.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN' // Prevent clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff' // Prevent MIME type sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            // Default to self for all resources
            // Allow scripts/styles from self and unsafe-inline (needed for Next.js/Tailwind)
            // Allow images from self, blob, and data URIs
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; connect-src 'self';"
          }
        ],
      },
    ];
  },
};

export default nextConfig;
