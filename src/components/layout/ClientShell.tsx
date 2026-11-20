"use client";

import {
  ReactNode,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
} from "react";
import { MotionConfig } from "framer-motion";
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
    const el =
      document.getElementById(`project-${projectId}`) ||
      document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <div className="min-h-screen w-full max-w-[1440px] mx-auto lg:flex lg:items-start">
          <Navbar />

          <div className="flex-1 min-w-0 flex flex-col min-h-screen">
            <main
              id="main-content"
              className="flex-1 w-full px-4 sm:px-7 lg:px-12 xl:px-14 pt-8 sm:pt-10 lg:pt-12 pb-16"
            >
              {isValidElement(children)
                ? cloneElement(
                    children as React.ReactElement<{
                      onOpenCommandMenu?: () => void;
                      selectedProjectId?: string | null;
                      onClearSelectedProject?: () => void;
                    }>,
                    {
                      onOpenCommandMenu: () => setIsCommandOpen(true),
                      selectedProjectId,
                      onClearSelectedProject: () => setSelectedProjectId(null),
                    }
                  )
                : children}
            </main>

            <Footer />
          </div>

          <CommandPalette
            isOpen={isCommandOpen}
            onClose={() => setIsCommandOpen(false)}
            onSelectProject={handleSelectProject}
          />

          <PrintResumeView />
        </div>
      </ToastProvider>
    </MotionConfig>
  );
}
