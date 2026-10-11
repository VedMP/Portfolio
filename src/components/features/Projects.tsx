"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp, Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/core/data";
import { Project } from "@/core/types";

export default function Projects({
  selectedProjectId,
}: {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}) {
  const [toggledProjectId, setToggledProjectId] = useState<string | null>(null);

  const expandedProjectId =
    toggledProjectId === "" ? null : (toggledProjectId ?? selectedProjectId ?? null);

  const toggleExpand = (id: string) => {
    setToggledProjectId((prev) => {
      const current = prev === "" ? null : (prev ?? selectedProjectId ?? null);
      return current === id ? "" : id;
    });
  };

  return (
    <section id="projects" className="py-14 border-b border-border">
      <div className="space-y-10">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">
            Featured Projects
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Systems, retrieval pipelines, and multi-agent workflows engineered with strict data integrity.
          </p>
        </div>

        <div className="space-y-12">
          {PROJECTS.map((project: Project) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className="space-y-4"
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-lg font-medium text-foreground tracking-tight">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                    {project.subtitle}
                  </span>
                </div>

                {/* Core Narrative Solution */}
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.solution}
                </p>

                {/* Visual Preview */}
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-border bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Tech Stack Metadata */}
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="text-neutral-400 dark:text-neutral-500">Tech: </span>
                  <span>{project.tags.join(" · ")}</span>
                </div>

                {/* Action Links & Expand Architectural Details */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="human-link text-foreground inline-flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="human-link text-foreground inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-foreground transition-colors"
                  >
                    <span>{isExpanded ? "Hide Engineering Notes" : "View Engineering Notes"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Collapsible Deep Engineering Insights */}
                {isExpanded && (
                  <div className="p-5 rounded-lg border border-border bg-surface-subtle space-y-5 animate-in fade-in duration-150">
                    {/* Problem Statement */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                        Problem Statement
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* Architecture Pipeline */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Pipeline Stages
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                        {project.architecture.pipeline.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Key Technical Decisions & Trade-offs */}
                    {project.tradeoffs && project.tradeoffs.length > 0 && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          Key Trade-Offs &amp; Architectural Rationale
                        </h4>
                        <div className="space-y-3">
                          {project.tradeoffs.map((t, idx) => (
                            <div key={idx} className="text-xs space-y-0.5">
                              <div className="font-medium text-foreground">
                                • {t.decision}
                              </div>
                              <div className="text-neutral-600 dark:text-neutral-400 pl-3">
                                {t.rationale}
                              </div>
                              <div className="text-neutral-400 dark:text-neutral-500 text-[11px] font-mono pl-3">
                                Alternative Considered: {t.alternativeConsidered}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code Snippet */}
                    {project.codeSnippet && (
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
                          <span>{project.codeSnippet.title}</span>
                          <span className="uppercase text-[10px]">{project.codeSnippet.language}</span>
                        </div>
                        <div className="p-3.5 rounded bg-code-bg border border-code-border font-mono text-xs text-code-fg overflow-x-auto">
                          <pre className="text-[11px] leading-relaxed">
                            <code>{project.codeSnippet.code}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
