# Ved Patel — AI Systems & Software Engineering Portfolio

A production-grade, durable personal engineering portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, deployed to [vedmpatel.me](https://vedmpatel.me) via Cloudflare Pages global edge CDN.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Edge-F38020?logo=cloudflare)

---

## ✨ Architectural Features

- **Interactive Systems Architecture Visualizer**: Step-by-step visual pipeline explorer demonstrating dense vector RAG and Multi-Agent Teacher-TA verification loops.
- **Interactive Command Terminal (`Ctrl + K`)**: Fully accessible keyboard-navigable terminal console allowing recruiters and engineers to run shell commands (`help`, `bio`, `gpa`, `skills`, `projects`, `telemetry`).
- **Cloudflare Pages Edge Functions**: Serverless edge backend (`/functions/api/contact` & `/functions/api/telemetry`) providing rate-limited contact intake and real-time edge colocation telemetry without breaking static export (`output: "export"`).
- **High-Contrast & WCAG AAA Accessibility**: Non-destructive, zero-stacking-context contrast and vision accessibility modes ensuring zero subpixel font blur and smooth 60fps scrolling.
- **Strict Content Security Policy (CSP)**: Hardened headers with HSTS, COOP, CORP, Nosniff, and granular script allowances.
- **100% Factual Ground Truth**: Strictly represents verified academic standing (3.97 GPA @ Ontario Tech University, 4-time President's / Dean's List) and verified capstone / hackathon engineering architectures.

---

## 📁 Scoped Architecture

```
vedmpatel-portfolio/
├── functions/                    # Cloudflare Pages Edge Functions (Backend Scope)
│   └── api/
│       ├── contact.ts            # Rate-limited, honeypot-protected contact endpoint
│       └── telemetry.ts          # Edge colocation PoP & protocol reporting
├── public/                       # Static assets, transcripts, and headers
│   ├── _headers                  # Strict CSP & security policies
│   ├── Ved_Patel_Resume.pdf      # Official resume
│   └── Ved_Patel_Transcript.pdf  # Official academic transcript
├── src/
│   ├── app/                      # Next.js 16 App Router pages
│   │   ├── layout.tsx            # Global layout shell, fonts, and metadata
│   │   ├── page.tsx              # Unified single-page engineering portfolio
│   │   ├── not-found.tsx         # Custom 404 terminal page
│   │   ├── about/page.tsx        # Dedicated subroute with back-navigation
│   │   ├── projects/page.tsx     # Dedicated subroute with back-navigation
│   │   ├── experience/page.tsx   # Dedicated subroute with back-navigation
│   │   └── contact/page.tsx      # Dedicated subroute with back-navigation
│   ├── components/
│   │   ├── features/             # Scoped domain feature components
│   │   │   ├── Hero.tsx
│   │   │   ├── ArchitectureExplorer.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── CommandTerminal.tsx
│   │   ├── layout/               # Navbar, Footer, and ClientShell provider
│   │   ├── providers/            # Theme & Accessibility providers
│   │   └── ui/                   # Reusable atomic UI elements
│   └── core/                     # Contract & Type Scope (Single Source of Truth)
│       ├── types.ts              # Strict TypeScript interfaces
│       └── data.ts               # Verified ground-truth portfolio data
└── next.config.ts                # Turbopack static export configuration
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

# Run ESLint validation
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
