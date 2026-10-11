"use client";

import { ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function Hero({ onOpenCommandMenu }: { onOpenCommandMenu?: () => void }) {
  return (
    <section className="pt-8 pb-14 border-b border-border">
      <div className="space-y-5">
        {/* Name and Academic Callout */}
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            {PERSONAL_INFO.name}
          </h1>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Oshawa / Toronto, ON
          </span>
        </div>

        {/* Narrative Human Bio */}
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Honours Computer Science student at{" "}
          <a
            href="https://ontariotechu.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="human-link text-foreground font-medium"
          >
            Ontario Tech University
          </a>{" "}
          with a <span className="font-semibold text-foreground">3.97 / 4.0 GPA</span> (4-time President&apos;s / Dean&apos;s List recipient).
        </p>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I build machine intelligence systems with a focus on{" "}
          <span className="text-foreground font-medium">dense vector retrieval (RAG)</span>,{" "}
          <span className="text-foreground font-medium">autonomous multi-agent validation loops</span>, and
          resilient backend infrastructure. My work emphasizes grounding language models in verifiable evidence rather than letting them hallucinate.
        </p>

        {/* Human Links Row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="human-link text-foreground inline-flex items-center gap-0.5"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <a
            href={PERSONAL_INFO.transcriptPath}
            target="_blank"
            rel="noopener noreferrer"
            className="human-link inline-flex items-center gap-0.5"
          >
            <span>Transcript (3.97 GPA)</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="human-link inline-flex items-center gap-0.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <a
            href={PERSONAL_INFO.socials.githubAcademic}
            target="_blank"
            rel="noopener noreferrer"
            className="human-link inline-flex items-center gap-0.5"
          >
            <span>GitHub (Academic)</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="human-link inline-flex items-center gap-0.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="human-link inline-flex items-center gap-0.5"
          >
            <span>{PERSONAL_INFO.email}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {onOpenCommandMenu && (
            <button
              onClick={onOpenCommandMenu}
              className="human-link text-neutral-400 hover:text-foreground inline-flex items-center gap-1 cursor-pointer"
              title="Open command palette (⌘K)"
            >
              <span>⌘K Actions</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
