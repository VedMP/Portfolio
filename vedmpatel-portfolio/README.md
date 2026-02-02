# Ved Patel - Portfolio

A modern, responsive portfolio website built with Next.js 16, showcasing my projects, experience, and skills as a Software Developer and Computer Science student.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## ✨ Features

- **Modern Design** - Clean, professional UI with glassmorphism effects and smooth animations
- **Dark/Light Mode** - Full theme support with system preference detection
- **Fully Responsive** - Optimized for all devices from mobile to desktop
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **SEO Optimized** - Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Theming** | next-themes |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── experience/        # Experience page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Page sections (Hero, About, Projects, etc.)
│   ├── ui/                # Reusable UI components
│   └── providers/         # Context providers (Theme, Accessibility)
├── data/                  # Static data (experience, skills)
└── lib/                   # Utilities and project data
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VedMP/portfolio.git
   cd vedmpatel-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 Customization

### Personal Information
- Update `src/components/sections/HeroSection.tsx` for intro content
- Modify `src/data/experience.ts` for work/education history
- Edit `src/data/skills.ts` for technical skills
- Update `src/lib/projects.ts` for project showcases

### Theming
- Colors and design tokens are defined in `src/app/globals.css`
- Light/dark mode variables are configured in the `:root` and `.dark` selectors

##  Contact

- **Email**: vedmpatel2005@gmail.com
- **LinkedIn**: [ved-patel-cs](https://www.linkedin.com/in/ved-patel-cs/)
- **GitHub**: [VedMP](https://github.com/VedMP)
