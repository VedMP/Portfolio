/**
 * @file layout.tsx
 * @description Root layout component for Ved Patel's portfolio.
 * Provides typography, SEO metadata, theme provider, and client shell.
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import ClientShell from "@/components/layout/ClientShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ved Patel | AI Systems & Generative Engineering",
  description:
    "Honours Computer Science student (3.97 GPA) at Ontario Tech University. Specializing in RAG architectures, multi-agent verification pipelines, and edge systems.",
  metadataBase: new URL("https://vedmpatel.me"),
  authors: [{ name: "Ved Patel", url: "https://vedmpatel.me" }],
  keywords: [
    "Ved Patel",
    "Ontario Tech University",
    "Computer Science",
    "Generative AI",
    "RAG",
    "LangChain",
    "ChromaDB",
    "watsonx.ai",
    "Multi-Agent Systems",
    "Software Engineer",
  ],
  openGraph: {
    title: "Ved Patel | AI Systems & Generative Engineering",
    description:
      "Honours Computer Science student (3.97 GPA) at Ontario Tech University. Specializing in RAG architectures, multi-agent verification pipelines, and edge systems.",
    url: "https://vedmpatel.me",
    siteName: "Ved Patel Portfolio",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[100] -translate-y-[200%] rounded-lg bg-sky-600 px-4 py-2 text-xs font-mono font-medium text-white transition-transform focus:translate-y-0 shadow-lg"
        >
          Skip to main content
        </a>
        <AccessibilityProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientShell>{children}</ClientShell>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
