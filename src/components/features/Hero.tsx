"use client";

import { ArrowDown, FileText, Send, Terminal, Command } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { PERSONAL_INFO } from "@/core/data";

export default function Hero({ onOpenCommandMenu }: { onOpenCommandMenu?: () => void }) {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center pt-28 pb-16 px-6 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Availability & Academic Standing Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Co-op &amp; Internships
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-sky-500/10 border border-sky-500/20 text-sky-700 dark:text-sky-400">
            <span>Ontario Tech University</span>
            <span className="opacity-40">•</span>
            <span className="font-semibold">3.97 GPA (Dean&apos;s List 4x)</span>
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
          Engineering Grounded{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
            AI Systems
          </span>{" "}
          &amp; Resilient Software
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Hi, I&apos;m <span className="font-semibold text-slate-900 dark:text-white">Ved Patel</span>.
          An Honours Computer Science student focusing on{" "}
          <span className="text-sky-600 dark:text-sky-400 font-medium">dense vector RAG pipelines</span>,{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">multi-agent verification workflows</span>,
          and hardened edge architectures.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href="#architecture"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium text-xs sm:text-sm hover:opacity-90 transition-all shadow-sm"
          >
            <Terminal className="w-4 h-4 text-sky-400 dark:text-sky-600" />
            <span>Interactive Architecture Simulator</span>
          </a>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm hover:border-slate-400 dark:hover:border-white/30 transition-all"
          >
            <span>Case Studies</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Resume (PDF)</span>
          </a>

          {onOpenCommandMenu && (
            <button
              onClick={onOpenCommandMenu}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-mono hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Open Command Menu"
            >
              <Command className="w-3.5 h-3.5" />
              <span>⌘K</span>
            </button>
          )}
        </div>

        {/* Real System Telemetry Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8 p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left backdrop-blur-sm">
          <div className="p-2.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Academic Standing</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">3.97 / 4.0 GPA</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">President&apos;s List (4x)</div>
          </div>

          <div className="p-2.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Vector Retrieval</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">watsonx.ai RAG</div>
            <div className="text-[11px] text-sky-600 dark:text-sky-400 font-mono">ChromaDB + Slate-125m</div>
          </div>

          <div className="p-2.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Agentic Architecture</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">HackHive 2026</div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono">Teacher-TA Loop</div>
          </div>

          <div className="p-2.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Edge Deployment</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">Cloudflare Pages</div>
            <div className="text-[11px] text-slate-500 font-mono">Sub-50ms Global TTFB</div>
          </div>
        </div>

        {/* Social Coordinates */}
        <div className="flex items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-colors"
            aria-label="GitHub Professional Profile"
            title="GitHub (Professional)"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.githubAcademic}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-colors text-xs font-mono flex items-center gap-1.5"
            aria-label="GitHub Academic Profile"
            title="GitHub Academic Account"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Academic</span>
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-colors"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-colors"
            aria-label="Email Ved Patel"
            title="Email"
          >
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
