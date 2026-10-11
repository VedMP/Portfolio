/**
 * @file layout.tsx
 * @description Root layout component for Ved Patel's personal portfolio.
 * Engineered with high typographic craft, Schema.org JSON-LD microdata, and Core Web Vitals.
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
  title: "Ved Patel — Computer Science & Systems",
  description:
    "Honours Computer Science student (3.97 GPA) at Ontario Tech University. Specializing in RAG pipeline engineering, multi-agent validation loops, and systems architecture.",
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
    "Systems Engineer",
    "Generative AI",
    "RAG",
    "LangChain",
    "ChromaDB",
    "watsonx.ai",
    "Multi-Agent Systems",
    "Software Engineer",
  ],
  openGraph: {
    title: "Ved Patel — Computer Science & Systems",
    description:
      "Honours Computer Science student (3.97 GPA) at Ontario Tech University. Specializing in RAG pipeline engineering, multi-agent validation loops, and systems architecture.",
    url: "https://vedmpatel.me",
    siteName: "Ved Patel",
    locale: "en_US",
    type: "profile",
    firstName: "Ved",
    lastName: "Patel",
    images: [
      {
        url: "/ProfilePhoto.JPG",
        width: 800,
        height: 800,
        alt: "Ved Patel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ved Patel — Computer Science & Systems",
    description:
      "Honours Computer Science student (3.97 GPA) at Ontario Tech University. Specializing in RAG pipeline engineering, multi-agent validation loops, and systems architecture.",
    images: ["/ProfilePhoto.JPG"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground selection:bg-neutral-200 dark:selection:bg-neutral-800`}
      >
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[100] -translate-y-[200%] rounded bg-black dark:bg-white px-3 py-1.5 text-xs font-mono font-medium text-white dark:text-black transition-transform focus:translate-y-0"
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
            <ClientShell>{children}</ClientShell>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
