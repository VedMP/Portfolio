"use client";

import Hero from "@/components/features/Hero";
import ArchitectureExplorer from "@/components/features/ArchitectureExplorer";
import Projects from "@/components/features/Projects";
import Experience from "@/components/features/Experience";
import Skills from "@/components/features/Skills";
import About from "@/components/features/About";
import Contact from "@/components/features/Contact";
import { useTerminal } from "@/components/layout/ClientShell";

export default function HomePage() {
  const { openTerminal } = useTerminal();

  return (
    <div className="flex flex-col w-full">
      <Hero onOpenTerminal={openTerminal} />
      <ArchitectureExplorer />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
