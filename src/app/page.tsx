"use client";

import Hero from "@/components/features/Hero";
import PipelineVisualizer from "@/components/architecture/PipelineVisualizer";
import Projects from "@/components/features/Projects";
import Experience from "@/components/features/Experience";
import Skills from "@/components/features/Skills";
import About from "@/components/features/About";
import Contact from "@/components/features/Contact";

export default function HomePage({
  onOpenCommandMenu,
  selectedProjectId,
  onClearSelectedProject,
}: {
  onOpenCommandMenu?: () => void;
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}) {
  return (
    <div className="flex flex-col w-full">
      <Hero onOpenCommandMenu={onOpenCommandMenu} />
      <PipelineVisualizer />
      <Projects
        selectedProjectId={selectedProjectId}
        onClearSelectedProject={onClearSelectedProject}
      />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
