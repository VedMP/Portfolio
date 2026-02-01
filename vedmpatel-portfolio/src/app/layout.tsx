/**
 * @file layout.tsx
 * @description Root layout component for the Next.js application.
 * Provides the HTML structure, font configuration, metadata, and
 * global layout components (Navbar, Footer) for all pages.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Configure Geist Sans font with display swap for faster text rendering
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Show fallback font immediately, swap when loaded
});

// Configure Geist Mono font for code blocks
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Metadata configuration for SEO and social sharing
 */
export const metadata: Metadata = {
  title: "Ved Patel | Software Developer",
  description:
    "Honours Computer Science student at Ontario Tech University. Full-stack developer passionate about building elegant solutions.",
};

/**
 * Root Layout Component
 *
 * Wraps all pages with:
 * - HTML document structure
 * - Font CSS variables
 * - Dark theme styling
 * - Navigation (Navbar)
 * - Footer
 *
 * @param children - Page content to render
 */
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import AccessibilityFilters from "@/components/providers/AccessibilityFilters";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[100] -translate-y-[150%] rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <AccessibilityProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AccessibilityFilters />
            <Navbar />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
