/**
 * @file layout.tsx
 * @description Root layout for Ved Patel's portfolio — Atelier Split-Rail Workbench.
 * Self-hosts Instrument Serif, Plus Jakarta Sans, and JetBrains Mono via next/font/google
 * for strict CSP compatibility (font-src 'self') and crisp editorial typography.
 */

import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ClientShell from "@/components/layout/ClientShell";
import {
  generatePersonSchema,
  generateWebSiteSchema,
  generateProjectsSchema,
} from "@/lib/seo";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ved Patel — Computer Science & Applied AI Systems",
  description:
    "Honours Computer Science student at Ontario Tech University (3.97/4.3 GPA, 4× President's List). Building grounded RAG pipelines, multi-agent backends, and memory-conscious C++ and edge software.",
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
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.svg"],
  },
  keywords: [
    "Ved Patel",
    "Ontario Tech University",
    "Computer Science",
    "Software Engineer Intern",
    "Systems Programming",
    "Generative AI",
    "RAG",
    "LangChain",
    "ChromaDB",
    "IBM watsonx.ai",
    "C++",
    "Multi-Agent Systems",
  ],
  openGraph: {
    title: "Ved Patel — Computer Science & Applied AI Systems",
    description:
      "Honours Computer Science student at Ontario Tech University (3.97/4.3 GPA). Grounded RAG pipelines, 18-language multi-agent systems, C++ optimization, and Cloudflare Edge architecture.",
    url: "https://vedmpatel.me",
    siteName: "Ved Patel",
    locale: "en_CA",
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
    title: "Ved Patel — Computer Science & Applied AI Systems",
    description:
      "Honours Computer Science student at Ontario Tech University (3.97/4.3 GPA). Grounded RAG pipelines, multi-agent verification, and C++ systems.",
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
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
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
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
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
        className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-background text-foreground selection:bg-accent/20 selection:text-foreground`}
      >
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[100] -translate-y-[200%] rounded-md bg-accent px-3 py-1.5 text-xs font-mono font-medium text-accent-foreground transition-transform focus:translate-y-0"
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
