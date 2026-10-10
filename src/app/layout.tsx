/**
 * @file layout.tsx
 * @description Root layout component for Ved Patel's portfolio.
 * Engineered for SEO, Schema.org JSON-LD microdata, OpenGraph cards, and Core Web Vitals.
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import ClientShell from "@/components/layout/ClientShell";
import { generatePersonSchema, generateWebSiteSchema, generateProjectsSchema } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ved Patel | AI Systems & Generative Engineering",
  description:
    "Honours Computer Science student (3.97 GPA, 4x Dean's List) at Ontario Tech University. Specializing in RAG architectures, multi-agent validation loops, and resilient edge systems.",
  metadataBase: new URL("https://vedmpatel.me"),
  authors: [{ name: "Ved Patel", url: "https://vedmpatel.me" }],
  creator: "Ved Patel",
  publisher: "Ved Patel",
  alternates: {
    canonical: "https://vedmpatel.me",
  },
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
    "AI Systems Engineer",
    "Edge Architecture",
    "Cloudflare Pages",
  ],
  openGraph: {
    title: "Ved Patel | AI Systems & Generative Engineering",
    description:
      "Honours Computer Science student (3.97 GPA, 4x Dean's List) at Ontario Tech University. Specializing in RAG architectures, multi-agent validation loops, and resilient edge systems.",
    url: "https://vedmpatel.me",
    siteName: "Ved Patel Engineering Portfolio",
    locale: "en_US",
    type: "profile",
    firstName: "Ved",
    lastName: "Patel",
    gender: "male",
    username: "VedMP",
    images: [
      {
        url: "/ProfilePhoto.JPG",
        width: 800,
        height: 800,
        alt: "Ved Patel — AI Systems & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ved Patel | AI Systems & Generative Engineering",
    description:
      "Honours Computer Science student (3.97 GPA, 4x Dean's List) at Ontario Tech University. Specializing in RAG architectures, multi-agent validation loops, and edge systems.",
    images: ["/ProfilePhoto.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();
  const webSiteSchema = generateWebSiteSchema();
  const projectsSchema = generateProjectsSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground engineering-grid`}
      >
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
