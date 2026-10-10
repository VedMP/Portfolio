# Ved Patel — AI Systems & Software Engineering Portfolio

A production-grade, durable personal engineering portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, deployed to [vedmpatel.me](https://vedmpatel.me) via Cloudflare Pages global edge CDN.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Edge-F38020?logo=cloudflare)

---

## ✨ Architectural Features

- **Interactive Systems Architecture Visualizer**: Step-by-step visual pipeline explorer demonstrating dense vector RAG (IBM watsonx.ai + ChromaDB) and Multi-Agent Teacher-TA verification loops (HackHive 2026) with live query simulation.
- **Raycast / Linear-style Command Palette (`⌘K` / `Ctrl+K`)**: Instant keyboard power-navigation across sections, case studies, theme toggling, and quick actions.
- **ATS-Optimized Printable Resume View (`@media print`)**: Zero-clutter, black-and-white, single-page ATS-formatted resume generated directly on print.
- **Organic Traffic & Search Engine Discovery**: Full Schema.org JSON-LD microdata (`Person`, `WebSite`, `SoftwareSourceCode`), OpenGraph, Twitter Cards, dynamic sitemap.xml, and robots.txt.
- **Cloudflare Pages Edge Functions**: Serverless edge backend (`/functions/api/contact`) providing rate-limited, honeypot-protected contact intake without breaking static export (`output: "export"`).
- **High-Contrast & WCAG AAA Accessibility**: Non-destructive, zero-stacking-context contrast and vision accessibility modes ensuring zero subpixel font blur and smooth 60fps scrolling.
- **Strict Content Security Policy (CSP)**: Hardened headers with HSTS, COOP, CORP, Nosniff, and granular script allowances.
- **100% Factual Ground Truth**: Strictly represents verified academic standing (3.97 GPA @ Ontario Tech University, 4-time President's / Dean's List) and verified capstone / hackathon engineering architectures.

---

## 📁 Clean Repository Architecture

```
Portfolio/
├── functions/                    # Cloudflare Pages Edge Functions (Backend Scope)
│   └── api/
│       └── contact.ts            # Rate-limited, honeypot-protected contact endpoint
├── public/                       # Static assets, transcripts, and headers
│   ├── projects/                 # Case study graphics
│   ├── ProfilePhoto.JPG          # Professional profile photo
│   ├── Ved_Patel_Resume.pdf      # Official resume
│   ├── Ved_Patel_Transcript.pdf  # Official academic transcript (3.97 GPA)
│   ├── _headers                  # Strict CSP & security policies
│   └── humans.txt                # Engineering standards & credits
├── src/
│   ├── app/                      # Next.js 16 App Router
│   │   ├── globals.css           # Linear/Vercel design tokens & print engine
│   │   ├── layout.tsx            # Global layout shell, fonts, and Schema.org metadata
│   │   ├── page.tsx              # Unified single-page engineering portfolio
│   │   ├── not-found.tsx         # Custom 404 terminal page
│   │   ├── sitemap.ts            # Dynamic sitemap generator
│   │   └── robots.ts             # Dynamic robots.txt
│   ├── components/
│   │   ├── architecture/         # Interactive pipeline graph & live simulator
│   │   ├── cmdk/                 # Raycast/Linear-style Cmd+K command palette
│   │   ├── features/             # Hero, Projects, Experience, Skills, About, Contact
│   │   ├── layout/               # Navbar, Footer, and ClientShell
│   │   ├── print/                # ATS-compliant print view for recruiters
│   │   ├── providers/            # Theme & Accessibility providers
│   │   └── ui/                   # Badges, SocialIcons, Toast notifications
│   ├── core/                     # Contract & Type Scope (Single Source of Truth)
│   │   ├── types.ts              # Strict TypeScript interfaces
│   │   └── data.ts               # Verified ground-truth portfolio data
│   └── lib/                      # Schema.org JSON-LD generators
├── next.config.ts                # Turbopack static export configuration
├── package.json                  # Root dependencies & scripts
├── tsconfig.json                 # TypeScript path aliases
└── README.md                     # Modernized repository documentation
```

---

## 🚀 Development & Build

### Prerequisites
- Node.js 20+ (tested on Node v24)
- npm, pnpm, or bun

### Commands
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run ESLint validation (zero warnings/errors)
npm run lint

# Build static production export for Cloudflare Pages
npm run build
```

---

## 📬 Contact & Coordinates

- **Domain**: [vedmpatel.me](https://vedmpatel.me)
- **Email**: [vedmpatel2005@gmail.com](mailto:vedmpatel2005@gmail.com)
- **LinkedIn**: [ved-patel-cs](https://www.linkedin.com/in/ved-patel-cs/)
- **GitHub**: [VedMP](https://github.com/VedMP)
- **Academic GitHub**: [VedPatel169](https://github.com/VedPatel169)
