/**
 * @file layout.tsx
 * @description Root layout component for Ved Patel's personal portfolio.
 * Engineered with high typographic craft, Schema.org JSON-LD microdata, and Core Web Vitals.
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/icon.svg"],
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var mql = window.matchMedia('(prefers-color-scheme: dark)');
                  var useDark = stored === 'dark' || ((!stored || stored === 'system') && mql.matches);
                  if (useDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientShell>{children}</ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
