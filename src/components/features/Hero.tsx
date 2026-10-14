"use client";

import { ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function Hero() {
  return (
    <section className="pt-6 sm:pt-10 pb-16 border-b border-border">
      <div className="space-y-8">
        {/* Name and Academic Header */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              {PERSONAL_INFO.name}
            </h1>
            <span className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400">
              Oshawa / Toronto, ON
            </span>
          </div>
          <div className="text-sm sm:text-base font-mono text-neutral-500 dark:text-neutral-400">
            {PERSONAL_INFO.headline}
          </div>
        </div>

        {/* Narrative Bio */}
        <div className="max-w-5xl space-y-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Honours Computer Science student at{" "}
            <a
              href="https://ontariotechu.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="human-link text-foreground font-medium"
            >
              Ontario Tech University
            </a>{" "}
            with a <span className="font-semibold text-foreground">3.97 / 4.0 GPA</span> across 4 consecutive President&apos;s / Dean&apos;s List semesters.
          </p>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            I build machine intelligence systems with a focus on{" "}
            <span className="text-foreground font-medium">dense vector retrieval (RAG)</span>,{" "}
            <span className="text-foreground font-medium">autonomous multi-agent validation loops</span>, and
            resilient backend infrastructure. My work emphasizes grounding language models in verifiable evidence rather than letting them hallucinate.
          </p>
        </div>

        {/* Factual Highlight Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-lg bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Cumulative GPA</div>
            <div className="text-sm font-mono font-semibold text-foreground mt-0.5">{PERSONAL_INFO.gpa}</div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">4x Dean&apos;s List</div>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Engineering Focus</div>
            <div className="text-sm font-mono font-semibold text-foreground mt-0.5">RAG &amp; Agents</div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">ChromaDB · LangChain</div>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Institution</div>
            <div className="text-sm font-mono font-semibold text-foreground mt-0.5">Ontario Tech</div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">Honours B.Sc. CS</div>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Availability</div>
            <div className="text-sm font-mono font-semibold text-foreground mt-0.5">Summer 2026/27</div>
            <div className="text-[11px] text-neutral-500 mt-0.5 truncate">Internship / Co-op</div>
          </div>
        </div>

        {/* Human Links Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="human-link text-foreground inline-flex items-center gap-0.5 font-medium"
          >
            <span>Resume (PDF)</span>
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
        </div>
      </div>
    </section>
  );
}
