"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp, Github, ExternalLink, Copy, Check } from "lucide-react";
import { PROJECTS } from "@/core/data";
import { Project } from "@/core/types";

export default function Projects({
  selectedProjectId,
}: {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}) {
  const [toggledProjectId, setToggledProjectId] = useState<string | null>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const expandedProjectId =
    toggledProjectId === "" ? null : (toggledProjectId ?? selectedProjectId ?? null);

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
      setTimeout(() => setCopiedSnippetId(null), 2000);
    } catch {
      // Ignored
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-border">
      <div className="space-y-12">
        {/* Section Header */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
            02 / Systems &amp; Case Studies
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-foreground">
            Featured Engineering Projects
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Retrieval-augmented generation pipelines, multi-agent validation loops, and resilient edge systems engineered with strict data integrity.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {PROJECTS.map((project: Project) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className="space-y-6 pb-12 border-b border-neutral-200/80 dark:border-neutral-800/80 last:border-b-0 last:pb-0"
              >
                {/* 2-Column Responsive Card: Left Details, Right Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Narrative Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-medium text-foreground tracking-tight">
                        {project.title}
                      </h3>
                      <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                        {project.subtitle}
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {project.solution}
                    </p>

                    {/* Tech Stack Metadata */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links & Engineering Notes Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                      <div className="flex items-center gap-4 text-xs font-mono">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="human-link text-foreground inline-flex items-center gap-1 font-medium"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                            <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="human-link text-foreground inline-flex items-center gap-1 font-medium"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Deployment</span>
                            <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <span>{isExpanded ? "Collapse Specs" : "Engineering Specs & Code"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden border border-border shadow-xs bg-neutral-100 dark:bg-neutral-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                {/* Collapsible Deep Engineering Insights */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/40 space-y-6 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Problem Statement */}
                      <div className="md:col-span-6 space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                          Problem Statement
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Pipeline Stages */}
                      <div className="md:col-span-6 space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                          Pipeline Architecture
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-xs font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {project.architecture.pipeline.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Key Technical Decisions & Trade-offs */}
                    {project.tradeoffs && project.tradeoffs.length > 0 && (
                      <div className="pt-4 border-t border-border space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                          Key Architectural Trade-Offs &amp; Rationale
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.tradeoffs.map((t, idx) => (
                            <div key={idx} className="p-4 rounded-lg bg-background border border-border space-y-1">
                              <div className="font-medium text-xs text-foreground">
                                {t.decision}
                              </div>
                              <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {t.rationale}
                              </div>
                              <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 pt-1">
                                Alternative: {t.alternativeConsidered}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code Snippet Contract */}
                    {project.codeSnippet && (
                      <div className="pt-4 border-t border-border space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                          <span>{project.codeSnippet.title}</span>
                          <div className="flex items-center gap-3">
                            <span className="uppercase text-[10px]">{project.codeSnippet.language}</span>
                            <button
                              onClick={() => copySnippet(project.id, project.codeSnippet?.code || "")}
                              className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                              title="Copy code"
                            >
                              {copiedSnippetId === project.id ? (
                                <Check className="w-3.5 h-3.5 text-foreground" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              <span className="text-[11px]">
                                {copiedSnippetId === project.id ? "Copied" : "Copy"}
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-neutral-900 text-neutral-100 dark:bg-black dark:text-neutral-200 border border-neutral-800 font-mono text-xs overflow-x-auto">
                          <pre className="text-[11px] sm:text-xs leading-relaxed">
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
