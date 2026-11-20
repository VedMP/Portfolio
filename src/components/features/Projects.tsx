"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { PROJECTS } from "@/core/data";
import { Project, ProjectCategory } from "@/core/types";
import { useToast } from "@/components/ui/Toast";

type FilterOption = "All" | ProjectCategory;

const FILTERS: FilterOption[] = [
  "All",
  "AI & Systems",
  "Systems & C++",
  "Full Stack & Edge",
];

function ProjectVisual({ project }: { project: Project }) {
  if (project.visualType === "cpp-memory") {
    return (
      <div
        className="w-full aspect-16/10 rounded-xl border border-border bg-surface-subtle p-5 flex flex-col justify-between"
        aria-label="C++ contiguous memory layout diagram"
      >
        <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider">
          <span className="text-accent font-semibold">C++ Memory Layout</span>
          <span className="text-subtle">16B Aligned · Contiguous</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-3">
          {["Player[0]", "Player[1]", "Player[2]"].map((slot, idx) => (
            <div
              key={slot}
              className="p-2.5 rounded-lg bg-surface border border-border text-center space-y-1"
            >
              <div className="font-mono text-[11px] font-semibold text-foreground">
                {slot}
              </div>
              <div className="font-mono text-[10px] text-subtle">
                0x{((idx + 1) * 16).toString(16).toUpperCase().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        <div className="font-mono text-[11px] text-muted border-t border-border pt-2.5 flex items-center justify-between gap-2">
          <span className="truncate">UML Hierarchy → std::vector::reserve()</span>
          <span className="text-accent shrink-0">Cache-Local</span>
        </div>
      </div>
    );
  }

  if (project.visualType === "edge-topology") {
    return (
      <div
        className="w-full aspect-16/10 rounded-xl border border-border bg-surface-subtle p-5 flex flex-col justify-between"
        aria-label="Cloudflare Pages edge delivery topology"
      >
        <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider">
          <span className="text-accent font-semibold">Edge Topology · vedmpatel.me</span>
          <span className="text-subtle">Static + V8 Isolate</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="p-2.5 rounded-lg bg-surface border border-border text-center space-y-1">
            <div className="font-mono text-[11px] font-semibold text-foreground">
              Next.js 16
            </div>
            <div className="font-mono text-[10px] text-subtle">output: export</div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface border border-accent/60 text-center space-y-1">
            <div className="font-mono text-[11px] font-semibold text-accent">
              Cloudflare
            </div>
            <div className="font-mono text-[10px] text-subtle">Anycast CDN</div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface border border-border text-center space-y-1">
            <div className="font-mono text-[11px] font-semibold text-foreground">
              /api/contact
            </div>
            <div className="font-mono text-[10px] text-subtle">V8 Edge Fn</div>
          </div>
        </div>

        <div className="font-mono text-[11px] text-muted border-t border-border pt-2.5 flex items-center justify-between gap-2">
          <span className="truncate">HSTS · Strict CSP · COOP/COEP</span>
          <span className="text-accent shrink-0">0 Trackers</span>
        </div>
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden border border-border bg-surface-subtle">
        <Image
          src={project.image}
          alt={`${project.title} interface screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return null;
}

export default function Projects({
  selectedProjectId,
}: {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}) {
  const [filter, setFilter] = useState<FilterOption>("All");
  const [toggledProjectId, setToggledProjectId] = useState<string | null>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const { toast } = useToast();

  const expandedProjectId =
    toggledProjectId === ""
      ? null
      : (toggledProjectId ?? selectedProjectId ?? null);

  const visibleProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const toggleExpand = (id: string) => {
    setToggledProjectId((prev) => {
      const current = prev === "" ? null : (prev ?? selectedProjectId ?? null);
      return current === id ? "" : id;
    });
  };

  const copySnippet = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippetId(id);
      toast("Code snippet copied");
      setTimeout(() => setCopiedSnippetId(null), 1800);
    } catch {
      toast("Could not copy snippet", "error");
    }
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-14 border-b border-border scroll-mt-8"
    >
      <div className="space-y-8">
        {/* Section Header & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent font-semibold mb-1.5">
              Selected Engineering Work
            </div>
            <h2 className="font-serif text-3xl sm:text-[2.45rem] leading-[1.08] font-normal text-foreground">
              Projects &amp; Simulations
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter projects by domain"
            className="flex flex-wrap gap-1.5"
          >
            {FILTERS.map((opt) => {
              const active = filter === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFilter(opt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                    active
                      ? "bg-accent text-accent-foreground border-accent font-semibold"
                      : "bg-surface text-muted border-border hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {visibleProjects.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className="p-5 sm:p-7 rounded-2xl bg-surface border border-border transition-colors hover:border-border-strong space-y-5 scroll-mt-8"
              >
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start">
                  {/* Left: Story, Metrics & Controls */}
                  <div className="xl:col-span-7 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-subtle mb-1">
                        <span className="text-accent font-semibold">
                          {project.number}
                        </span>
                        <span>·</span>
                        <span>{project.subtitle}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-[1.9rem] leading-[1.12] font-normal text-foreground">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-[15px] text-muted leading-relaxed">
                      {project.solution}
                    </p>

                    {/* Key Metrics Row */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="px-3 py-2 rounded-lg bg-background border border-border"
                          >
                            <div className="font-mono text-[10px] uppercase tracking-wider text-subtle truncate">
                              {m.label}
                            </div>
                            <div className="font-mono text-xs sm:text-[13px] font-semibold text-foreground mt-0.5 truncate">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-subtle text-foreground border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links & Deep-Dive Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="human-link text-foreground inline-flex items-center gap-1.5 font-medium"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                            <ArrowUpRight className="w-3 h-3 text-subtle" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="human-link text-foreground inline-flex items-center gap-1.5 font-medium"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Site</span>
                            <ArrowUpRight className="w-3 h-3 text-subtle" />
                          </a>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleExpand(project.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`spec-${project.id}`}
                        className="btn-tactile px-3 py-1.5 text-xs font-mono"
                      >
                        <Terminal className="w-3.5 h-3.5 text-accent" />
                        <span>
                          {isExpanded ? "Hide Specs & Code" : "Specs & Code"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-subtle" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-subtle" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right: Visual Screenshot or Architectural Diagram */}
                  <div className="xl:col-span-5">
                    <ProjectVisual project={project} />
                  </div>
                </div>

                {/* Expandable Deep Engineering Spec Drawer */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`spec-${project.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 border-t border-border space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                              Problem Context
                            </h4>
                            <p className="text-xs sm:text-sm text-muted leading-relaxed">
                              {project.problem}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                              Execution Flow
                            </h4>
                            <ol className="list-decimal list-inside space-y-1 text-xs font-mono text-muted leading-relaxed">
                              {project.architecture.pipeline.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>

                        {project.tradeoffs && project.tradeoffs.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {project.tradeoffs.map((t, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl bg-background border border-border space-y-1.5"
                              >
                                <div className="text-xs font-semibold text-foreground">
                                  {t.decision}
                                </div>
                                <div className="text-xs text-muted leading-relaxed">
                                  {t.rationale}
                                </div>
                                <div className="font-mono text-[11px] text-subtle pt-1">
                                  Alternative: {t.alternativeConsidered}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {project.codeSnippet && (
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted">
                              <span>{project.codeSnippet.title}</span>
                              <div className="flex items-center gap-3">
                                <span className="uppercase text-[10px] text-subtle">
                                  {project.codeSnippet.language}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    copySnippet(
                                      project.id,
                                      project.codeSnippet?.code || ""
                                    )
                                  }
                                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                                >
                                  {copiedSnippetId === project.id ? (
                                    <Check className="w-3.5 h-3.5 text-accent" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                  <span>
                                    {copiedSnippetId === project.id
                                      ? "Copied"
                                      : "Copy"}
                                  </span>
                                </button>
                              </div>
                            </div>
                            <div
                              className="p-4 rounded-xl border font-mono text-xs overflow-x-auto"
                              style={{
                                backgroundColor: "var(--code-bg)",
                                color: "var(--code-fg)",
                                borderColor: "var(--code-border)",
                              }}
                            >
                              <pre className="text-[11px] sm:text-xs leading-relaxed">
                                <code>{project.codeSnippet.code}</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
