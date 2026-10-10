"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Layers, ArrowUpRight, Cpu, Share2, Code2, CheckCircle2, Scale, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { PROJECTS } from "@/core/data";
import { Project } from "@/core/types";
import { useToast } from "@/components/ui/Toast";

export default function Projects({
  selectedProjectId,
  onClearSelectedProject,
}: {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}) {
  const [internalProjectId, setInternalProjectId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<"architecture" | "tradeoffs" | "code">("architecture");
  const { toast } = useToast();

  const activeId = internalProjectId ?? selectedProjectId ?? null;
  const activeProject = activeId ? PROJECTS.find((p) => p.id === activeId) || null : null;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#project-")) {
        const id = hash.replace("#project-", "");
        setInternalProjectId(id);
      }
    };

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleShareProject = async (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://vedmpatel.me/#project-${project.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${project.title} — Ved Patel Case Study`,
          text: project.solution,
          url,
        });
        toast("Case study link shared!");
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast(`Direct link to ${project.title} copied!`);
    } catch {
      toast("Could not copy link", "error");
    }
  };

  const closeModal = () => {
    setInternalProjectId(null);
    setModalTab("architecture");
    if (onClearSelectedProject) onClearSelectedProject();
  };

  return (
    <section id="projects" className="relative w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Systems Engineering &amp; AI Implementations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            Featured Technical Case Studies
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            End-to-end systems engineered with strict attention to vector search precision, decoupled abstractions, and multi-agent verification.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="hairline-card flex flex-col rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:border-sky-500/50 dark:hover:border-sky-400/50"
            >
              {/* Project Image Header */}
              <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-black/30 overflow-hidden border-b border-slate-200 dark:border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={(e) => handleShareProject(project, e)}
                    className="p-1.5 rounded-md bg-slate-900/80 backdrop-blur text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Share case study link"
                    aria-label={`Share ${project.title}`}
                  >
                    <Share2 className="w-3 h-3" />
                  </button>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-900/80 backdrop-blur text-white border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-sky-600 dark:text-sky-400 mb-1">
                    {project.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 line-clamp-3 leading-relaxed">
                    {project.solution}
                  </p>

                  {/* Architecture Highlights Pill */}
                  <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-sky-500" />
                      <span>Architecture Highlights</span>
                    </div>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      {project.architecture.pipeline.slice(0, 2).map((pipe, i) => (
                        <li key={i} className="flex items-start gap-1.5 font-mono text-[11px]">
                          <span className="text-sky-500">•</span>
                          <span>{pipe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Metrics Badges */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center"
                        >
                          <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                          <div className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                        aria-label={`Visit live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Edge</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setInternalProjectId(project.id);
                      setModalTab("architecture");
                    }}
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>Inspect Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Comprehensive Architectural Deep-Dive */}
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400">
                    {activeProject.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 mb-6 overflow-x-auto">
                <button
                  onClick={() => setModalTab("architecture")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    modalTab === "architecture"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture &amp; Pipeline</span>
                </button>

                <button
                  onClick={() => setModalTab("tradeoffs")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    modalTab === "tradeoffs"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Engineering Trade-Offs</span>
                </button>

                {activeProject.codeSnippet && (
                  <button
                    onClick={() => setModalTab("code")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      modalTab === "code"
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Implementation Code</span>
                  </button>
                )}
              </div>

              {/* Tab 1: Architecture View */}
              {modalTab === "architecture" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-1">
                      Problem Context
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-1">
                      Engineered Solution
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>

                  {/* Architecture Pipeline */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-3 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-sky-500" />
                      <span>Execution Pipeline Stages</span>
                    </h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs font-mono text-slate-800 dark:text-slate-200">
                      {activeProject.architecture.pipeline.map((step, idx) => (
                        <li key={idx} className="leading-normal">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Metrics */}
                  {activeProject.metrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeProject.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left"
                        >
                          <div className="text-[10px] font-mono uppercase text-slate-400">{metric.label}</div>
                          <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                            {metric.value}
                          </div>
                          {metric.detail && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                              {metric.detail}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Trade-offs View */}
              {modalTab === "tradeoffs" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Key engineering decisions and rationale documented during architecture design:
                  </p>
                  {(activeProject.tradeoffs || []).map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                          Decision: {t.decision}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                        <span className="font-semibold text-slate-900 dark:text-white">Rationale: </span>
                        {t.rationale}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono pl-6">
                        <span className="font-semibold">Alternative Rejected: </span>
                        {t.alternativeConsidered}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Code View */}
              {modalTab === "code" && activeProject.codeSnippet && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeProject.codeSnippet.description}
                  </p>
                  <div className="rounded-xl bg-[#090d16] border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                      <span>{activeProject.codeSnippet.title}</span>
                      <span className="text-sky-400 uppercase text-[10px]">{activeProject.codeSnippet.language}</span>
                    </div>
                    <pre className="text-[11px] leading-relaxed">
                      <code>{activeProject.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-medium hover:opacity-90 transition-opacity"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Deployment</span>
                    </a>
                  )}
                </div>

                <a
                  href="#architecture"
                  onClick={closeModal}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <span>Open in Pipeline Simulator</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
