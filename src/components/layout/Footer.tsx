"use client";

import { Printer, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-neutral-900 dark:text-neutral-100 font-medium">
            Ved Patel
          </div>
          <div className="text-[11px] text-neutral-400 dark:text-neutral-500">
            Honours B.Sc. Computer Science • Ontario Tech University (3.97 GPA)
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title="Print ATS-Friendly One-Page Resume"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print ATS Resume</span>
          </button>

          <span className="text-neutral-300 dark:text-neutral-700">•</span>

          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-400 dark:text-neutral-500">
        <div>
          Deployed to Edge via Cloudflare Pages • Static Export Next.js 16
        </div>
        <div>
          © {new Date().getFullYear()} Ved Patel. Built for engineering rigor.
        </div>
      </div>
    </footer>
  );
}
