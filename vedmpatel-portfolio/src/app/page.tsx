/**
 * @file page.tsx
 * @description Home page component - the main landing page of the portfolio.
 * Renders all portfolio sections in order: Hero, About, Projects, Experience, Contact.
 *
 * Performance Optimization:
 * - HeroSection loads synchronously (above the fold)
 * - All other sections use dynamic imports with lazy loading
 *
 * Note on dynamic() options:
 * With `output: "export"`, Next.js always pre-renders full HTML at build time.
 * Omitting the options object (rather than passing `{ ssr: true }` explicitly)
 * allows the JS chunks to be code-split and loaded lazily in the browser while
 * still including the pre-rendered HTML in the static output.
 */

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

// Dynamic imports for below-the-fold sections
// Code-split into separate JS chunks; loaded on demand in the browser
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection")
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection")
);

const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection")
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection")
);

/**
 * Home Page Component
 *
 * The main landing page that displays all portfolio sections.
 * HeroSection loads immediately, other sections are code-split
 * and loaded as the user scrolls.
 *
 * @returns The complete portfolio landing page
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
