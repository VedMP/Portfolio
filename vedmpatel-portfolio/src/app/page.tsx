/**
 * @file page.tsx
 * @description Home page component - the main landing page of the portfolio.
 * Renders all portfolio sections in order: Hero, About, Projects, Experience, Contact.
 * 
 * Performance Optimization:
 * - HeroSection loads synchronously (above the fold)
 * - All other sections use dynamic imports with lazy loading
 */

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

// Dynamic imports for below-the-fold sections
// This reduces initial bundle size and improves First Contentful Paint (FCP)
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
  { ssr: true }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection"),
  { ssr: true }
);

const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection"),
  { ssr: true }
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: true }
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
