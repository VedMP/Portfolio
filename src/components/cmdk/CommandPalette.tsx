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
  User,
  Share2,
  Cpu,
} from "lucide-react";
import { useTheme } from "next-themes";
import { PERSONAL_INFO } from "@/core/data";
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
  const listRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-projects",
      category: "Navigation",
      label: "Jump to Technical Projects",
      detail: "#projects",
      icon: Code2,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-arch",
      category: "Navigation",
      label: "Jump to Architecture Visualizer",
      detail: "#architecture",
      icon: Layers,
      action: () => scrollToSection("architecture"),
    },
    {
      id: "nav-exp",
      category: "Navigation",
      label: "Jump to Education & Milestones",
      detail: "#experience",
      icon: GraduationCap,
      action: () => scrollToSection("experience"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      label: "Jump to Skills & Technology Stack",
      detail: "#skills",
      icon: Cpu,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-about",
      category: "Navigation",
      label: "Jump to About Ved Patel",
      detail: "#about",
      icon: User,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      label: "Jump to Contact Coordinates",
      detail: "#contact",
      icon: Send,
      action: () => scrollToSection("contact"),
    },

    // Case Studies
    {
      id: "proj-smart-doc",
      category: "Projects",
      label: "Smart Document Assistant",
      detail: "IBM Capstone • watsonx.ai RAG & ChromaDB",
      icon: Code2,
      action: () => {
        onClose();
        if (onSelectProject) onSelectProject("smart-document-assistant");
        else scrollToSection("projects");
      },
    },
    {
      id: "proj-polyglot",
      category: "Projects",
      label: "Polyglot Tutor",
      detail: "HackHive 2026 • Multi-Agent Verification Loop",
      icon: Code2,
      action: () => {
        onClose();
        if (onSelectProject) onSelectProject("polyglot-tutor");
        else scrollToSection("projects");
      },
    },
    {
      id: "proj-portfolio",
      category: "Projects",
      label: "Edge Systems Portfolio",
      detail: "Next.js 16 • Cloudflare Pages & V8 Functions",
      icon: Code2,
      action: () => {
        onClose();
        if (onSelectProject) onSelectProject("portfolio-edge-architecture");
        else scrollToSection("projects");
      },
    },

    // Actions
    {
      id: "action-copy-email",
      category: "Actions",
      label: "Copy Email Address",
      detail: PERSONAL_INFO.email,
      icon: Copy,
      action: async () => {
        try {
          await navigator.clipboard.writeText(PERSONAL_INFO.email);
          toast("Email copied to clipboard!");
        } catch {
          toast("Failed to copy email", "error");
        }
        onClose();
      },
    },
    {
      id: "action-share",
      category: "Actions",
      label: "Share Portfolio Profile",
      detail: "https://vedmpatel.me",
      icon: Share2,
      action: async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Ved Patel — AI Systems & Generative Engineering",
              text: "Check out Ved Patel's systems engineering portfolio (3.97 GPA Honours CS @ Ontario Tech).",
              url: "https://vedmpatel.me",
            });
            toast("Profile shared!");
          } catch {
            // Dismissed
          }
        } else {
          try {
            await navigator.clipboard.writeText("https://vedmpatel.me");
            toast("Portfolio link copied to clipboard!");
          } catch {
            toast("Could not copy link", "error");
          }
        }
        onClose();
      },
    },
    {
      id: "action-resume",
      category: "Actions",
      label: "Download Official Resume (PDF)",
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
      label: "Download Academic Transcript (PDF)",
      detail: "3.97 GPA / 4.0 • Ontario Tech",
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
      detail: "Renders clean one-page ATS view",
      icon: Printer,
      action: () => {
        onClose();
        setTimeout(() => window.print(), 150);
      },
    },
    {
      id: "action-theme",
      category: "Actions",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Theme`,
      detail: `Current: ${theme || "system"}`,
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        toast(`Switched to ${theme === "dark" ? "light" : "dark"} mode`);
        onClose();
      },
    },

    // External Links
    {
      id: "link-gh",
      category: "Links",
      label: "GitHub (Professional Profile)",
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
      label: "GitHub (Academic Profile)",
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

  const filteredCommands = query.trim() === ""
    ? commands
    : commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.category.toLowerCase().includes(query.toLowerCase()) ||
          (cmd.detail && cmd.detail.toLowerCase().includes(query.toLowerCase()))
      );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
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
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
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
      className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/10 gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search (e.g. Projects, Resume, Email, RAG)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-white/5">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-400">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                    isSelected
                      ? "bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg border ${
                        isSelected
                          ? "bg-sky-500 text-white border-sky-400"
                          : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium font-sans truncate">{cmd.label}</div>
                      {cmd.detail && (
                        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate">
                          {cmd.detail}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0 uppercase ml-2">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-black/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>vedmpatel.me</span>
        </div>
      </div>
    </div>
  );
}
