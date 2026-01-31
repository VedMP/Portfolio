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

// Configure Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure Geist Mono font for code blocks
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata configuration for SEO and social sharing
 */
export const metadata: Metadata = {
  title: "Ved Patel | Software Developer",
  description: "Honours Computer Science student at Ontario Tech University. Full-stack developer passionate about building elegant solutions.",
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-slate-100`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
