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
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      // Slash key when not typing in an input
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
    window.location.hash = "projects";
  };

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenCommandMenu={() => setIsCommandOpen(true)} />

        <main id="main-content" className="flex-grow">
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

        {/* Global Command Palette */}
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onSelectProject={handleSelectProject}
        />

        {/* ATS-Optimized Print Resume view */}
        <PrintResumeView />
      </div>
    </ToastProvider>
  );
}
