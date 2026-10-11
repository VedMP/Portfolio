"use client";

import { ReactNode, useState, useEffect, cloneElement, isValidElement } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommandPalette from "@/components/cmdk/CommandPalette";
import PrintResumeView from "@/components/print/PrintResumeView";
import { ToastProvider } from "@/components/ui/Toast";

export default function ClientShell({ children }: { children: ReactNode }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (
        e.key === "/" &&
        !isCommandOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen]);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    const el = document.getElementById(`project-${projectId}`) || document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar onOpenCommandMenu={() => setIsCommandOpen(true)} />

        <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24">
          {isValidElement(children)
            ? cloneElement(children as React.ReactElement<{
                onOpenCommandMenu?: () => void;
                selectedProjectId?: string | null;
                onClearSelectedProject?: () => void;
              }>, {
                onOpenCommandMenu: () => setIsCommandOpen(true),
                selectedProjectId,
                onClearSelectedProject: () => setSelectedProjectId(null),
              })
            : children}
        </main>

        <Footer />

        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onSelectProject={handleSelectProject}
        />

        <PrintResumeView />
      </div>
    </ToastProvider>
  );
}
