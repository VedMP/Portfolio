/**
 * @file page.tsx
 * @description Home page component - the main landing page of the portfolio.
 * Renders all portfolio sections in order: Hero, About, Projects, Experience, Contact.
 */

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

/**
 * Home Page Component
 *
 * The main landing page that displays all portfolio sections.
 * Each section is a self-contained component that handles its own
 * layout, animations, and data fetching.
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
