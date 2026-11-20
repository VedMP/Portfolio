"use client";

import { Printer, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border px-4 sm:px-7 lg:px-12 xl:px-14 py-10 text-xs font-mono text-muted no-print">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-serif text-lg text-foreground leading-none">
            {PERSONAL_INFO.name}
          </div>
          <div className="text-[11px] text-subtle mt-1.5">
            {PERSONAL_INFO.degree} · {PERSONAL_INFO.institution} ({PERSONAL_INFO.gpa} GPA)
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors cursor-pointer"
            title="Print ATS-Friendly One-Page Resume"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print ATS Resume</span>
          </button>

          <span className="text-border-strong" aria-hidden="true">·</span>

          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors"
          >
            <span>Resume PDF</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <span className="text-border-strong" aria-hidden="true">·</span>

          <a
            href={PERSONAL_INFO.transcriptPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors"
          >
            <span>Transcript</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-subtle">
        <div>
          Cloudflare Pages Edge · Next.js 16 Static Export · Press <kbd className="px-1.5 py-0.5 rounded bg-surface-subtle border border-border text-[10px] text-muted">⌘K</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-surface-subtle border border-border text-[10px] text-muted">/</kbd> to jump anywhere
        </div>
        <div>© {new Date().getFullYear()} {PERSONAL_INFO.name}</div>
      </div>
    </footer>
  );
}
