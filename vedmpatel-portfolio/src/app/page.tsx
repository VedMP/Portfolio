"use client";

import Hero from "@/components/features/Hero";
import ArchitectureExplorer from "@/components/features/ArchitectureExplorer";
import Projects from "@/components/features/Projects";
import Experience from "@/components/features/Experience";
import Skills from "@/components/features/Skills";
import About from "@/components/features/About";
import Contact from "@/components/features/Contact";
export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ArchitectureExplorer />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
