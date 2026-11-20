"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function Hero() {
  const [briefOpen, setBriefOpen] = useState(false);

  return (
    <section
      id="overview"
      className="pb-12 sm:pb-14 border-b border-border scroll-mt-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        {/* Eyebrow */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.11em] text-accent font-semibold">
          <span>{PERSONAL_INFO.institution} · Honours CS</span>
          <span className="text-border-strong" aria-hidden="true">/</span>
          <span className="text-muted font-medium">Class of {PERSONAL_INFO.graduation}</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif text-[2.45rem] sm:text-[3.25rem] xl:text-[3.75rem] leading-[1.03] tracking-[-0.015em] text-foreground max-w-[21ch] font-normal">
          Grounded AI pipelines, multi-agent verification, and{" "}
          <em className="italic text-muted">systems rigor.</em>
        </h1>

        {/* Concise Human Engineering Bio */}
        <p className="text-[15px] sm:text-base text-muted leading-relaxed max-w-[64ch]">
          {PERSONAL_INFO.bioDetail}
        </p>

        {/* Action Strip (30-Second Recruiter Brief + Quick Mobile Links) */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setBriefOpen((prev) => !prev)}
            aria-expanded={briefOpen}
            aria-controls="recruiter-brief-drawer"
            className="btn-tactile px-3.5 py-2 text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>
              {briefOpen ? "Hide 30-Second Recruiter Brief" : "30-Second Recruiter Brief"}
            </span>
            {briefOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-subtle" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-subtle" />
            )}
          </button>

          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden btn-tactile-accent px-3.5 py-2 text-xs font-mono"
          >
            <span>Resume PDF</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={PERSONAL_INFO.transcriptPath}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden btn-tactile px-3.5 py-2 text-xs font-mono"
          >
            <FileText className="w-3.5 h-3.5 text-subtle" />
            <span>Transcript</span>
          </a>

          <a
            href="#projects"
            className="px-3 py-2 text-xs font-mono text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <span>Explore 4 builds ↓</span>
          </a>
        </div>

        {/* Collapsible 30-Second Recruiter Brief (from Tournament D4) */}
        <AnimatePresence initial={false}>
          {briefOpen && (
            <motion.div
              id="recruiter-brief-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="p-5 rounded-xl bg-surface border border-border-strong border-l-[3px] border-l-accent grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                    Target Roles &amp; Timing
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    2026–2027 Software Engineering, Backend, Systems, or Applied AI Internships / Co-op.
                  </p>
                  <p className="font-mono text-[11px] text-subtle">
                    {PERSONAL_INFO.shortLocation} · Hybrid / Remote
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                    Verified Academic Signal
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    {PERSONAL_INFO.gpa} GPA across 75 credits. A+ in Systems Programming, Data Structures, Computer Architecture &amp; Software Design.
                  </p>
                  <p className="font-mono text-[11px] text-subtle">
                    IBM Generative AI Engineering Cert. (2026)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                    Fastest Verification Links
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                    <a
                      href={PERSONAL_INFO.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="human-link text-foreground inline-flex items-center gap-1 w-fit"
                    >
                      <span>Official Resume (PDF)</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href={PERSONAL_INFO.transcriptPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="human-link text-foreground inline-flex items-center gap-1 w-fit"
                    >
                      <span>Unofficial Transcript ({PERSONAL_INFO.gpa})</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href={PERSONAL_INFO.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="human-link text-foreground inline-flex items-center gap-1 w-fit"
                    >
                      <span>github.com/VedMP</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grounded 3-Column Proof Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-surface border border-border flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-accent font-semibold">
              Academic Standing
            </span>
            <span className="font-serif text-[1.6rem] leading-tight text-foreground">
              {PERSONAL_INFO.gpa} GPA
            </span>
            <span className="text-xs text-muted">
              4× President&apos;s List · A+ Systems Prog. &amp; Arch.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-accent font-semibold">
              Applied AI Builds
            </span>
            <span className="font-serif text-[1.6rem] leading-tight text-foreground">
              IBM RAG · 18-Lang
            </span>
            <span className="text-xs text-muted">
              watsonx Granite + HackHive 36h Multi-Agent
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-accent font-semibold">
              Low-Level &amp; Edge
            </span>
            <span className="font-serif text-[1.6rem] leading-tight text-foreground">
              C++ &amp; Cloudflare
            </span>
            <span className="text-xs text-muted">
              EA Sports Memory Opt. · V8 Edge Functions
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
