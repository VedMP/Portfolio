"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Code2,
  FileText,
  Copy,
  Printer,
  Moon,
  Sun,
  Layers,
  GraduationCap,
  Send,
  Share2,
  Cpu,
  Home,
} from "lucide-react";
import { useTheme } from "next-themes";
import { PERSONAL_INFO, PROJECTS } from "@/core/data";
import { useToast } from "@/components/ui/Toast";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Links";
  label: string;
  detail?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const commands: CommandItem[] = [
    {
      id: "nav-overview",
      category: "Navigation",
      label: "Jump to Overview",
      detail: "#overview",
      icon: Home,
      action: () => scrollToSection("overview"),
    },
    {
      id: "nav-arch",
      category: "Navigation",
      label: "Jump to Systems Architecture",
      detail: "#architecture",
      icon: Layers,
      action: () => scrollToSection("architecture"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      label: "Jump to Selected Projects",
      detail: "#projects",
      icon: Code2,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-exp",
      category: "Navigation",
      label: "Jump to Academics & Milestones",
      detail: "#experience",
      icon: GraduationCap,
      action: () => scrollToSection("experience"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      label: "Jump to Stack & Coursework",
      detail: "#skills",
      icon: Cpu,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      label: "Jump to Contact",
      detail: "#contact",
      icon: Send,
      action: () => scrollToSection("contact"),
    },

    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      category: "Projects" as const,
      label: proj.title,
      detail: `${proj.subtitle} · ${proj.year}`,
      icon: Code2,
      action: () => {
        onClose();
        if (onSelectProject) onSelectProject(proj.id);
        else scrollToSection("projects");
      },
    })),

    {
      id: "action-copy-email",
      category: "Actions",
      label: "Copy Email Address",
      detail: PERSONAL_INFO.email,
      icon: Copy,
      action: async () => {
        try {
          await navigator.clipboard.writeText(PERSONAL_INFO.email);
          toast("Email copied to clipboard");
        } catch {
          toast("Failed to copy email", "error");
        }
        onClose();
      },
    },
    {
      id: "action-resume",
      category: "Actions",
      label: "Open Official Resume (PDF)",
      detail: "Ved_Patel_Resume.pdf",
      icon: FileText,
      action: () => {
        window.open(PERSONAL_INFO.resumePath, "_blank");
        onClose();
      },
    },
    {
      id: "action-transcript",
      category: "Actions",
      label: "Open Academic Transcript (PDF)",
      detail: `${PERSONAL_INFO.gpa} GPA · Ontario Tech`,
      icon: FileText,
      action: () => {
        window.open(PERSONAL_INFO.transcriptPath, "_blank");
        onClose();
      },
    },
    {
      id: "action-print",
      category: "Actions",
      label: "Print ATS-Optimized Resume",
      detail: "Single-page print stylesheet",
      icon: Printer,
      action: () => {
        onClose();
        setTimeout(() => window.print(), 150);
      },
    },
    {
      id: "action-share",
      category: "Actions",
      label: "Copy Portfolio URL",
      detail: "https://vedmpatel.me",
      icon: Share2,
      action: async () => {
        try {
          await navigator.clipboard.writeText("https://vedmpatel.me");
          toast("Portfolio link copied");
        } catch {
          toast("Could not copy link", "error");
        }
        onClose();
      },
    },
    {
      id: "action-theme",
      category: "Actions",
      label: `Switch to ${resolvedTheme === "dark" ? "Warm Paper (Light)" : "Warm Obsidian (Dark)"}`,
      detail: `Current: ${resolvedTheme || "system"}`,
      icon: resolvedTheme === "dark" ? Sun : Moon,
      action: () => {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(next);
        toast(`Switched to ${next === "dark" ? "Warm Obsidian" : "Warm Paper"} theme`);
        onClose();
      },
    },

    {
      id: "link-gh",
      category: "Links",
      label: "GitHub (Main)",
      detail: "github.com/VedMP",
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.socials.github, "_blank");
        onClose();
      },
    },
    {
      id: "link-gh-acad",
      category: "Links",
      label: "GitHub (Academic)",
      detail: "github.com/VedPatel169",
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.socials.githubAcademic, "_blank");
        onClose();
      },
    },
    {
      id: "link-li",
      category: "Links",
      label: "LinkedIn Profile",
      detail: "linkedin.com/in/ved-patel-cs",
      icon: LinkedinIcon,
      action: () => {
        window.open(PERSONAL_INFO.socials.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const filteredCommands =
    query.trim() === ""
      ? commands
      : commands.filter(
          (cmd) =>
            cmd.label.toLowerCase().includes(query.toLowerCase()) ||
            cmd.category.toLowerCase().includes(query.toLowerCase()) ||
            (cmd.detail && cmd.detail.toLowerCase().includes(query.toLowerCase()))
        );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="command-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl bg-surface border border-border-strong shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-border gap-3">
          <Search className="w-4 h-4 text-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Jump to a project, section, resume, or action..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-subtle outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-surface-subtle border border-border text-muted">
            ESC
          </kbd>
        </div>

        <div className="overflow-y-auto p-1.5 space-y-0.5">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-subtle">
              No matching commands.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-surface-subtle text-foreground"
                      : "text-muted hover:bg-surface-subtle/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface-subtle text-subtle"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold font-sans truncate text-foreground">
                        {cmd.label}
                      </div>
                      {cmd.detail && (
                        <div className="text-[11px] font-mono text-subtle truncate">
                          {cmd.detail}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-subtle shrink-0 uppercase ml-2">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 border-t border-border bg-background flex items-center justify-between text-[11px] font-mono text-subtle">
          <div className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>↵ execute</span>
          </div>
          <span>vedmpatel.me</span>
        </div>
      </div>
    </div>
  );
}
