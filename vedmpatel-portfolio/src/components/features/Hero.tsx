"use client";

import { motion } from "framer-motion";
import { Mail, Terminal, ArrowDown, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { PERSONAL_INFO } from "@/core/data";

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-16 px-6 overflow-hidden bg-grid-pattern">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 dark:bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Academic & Availability Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Co-op & Internships
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
            <span>Ontario Tech University</span>
            <span className="opacity-40">•</span>
            <span className="font-semibold">3.97 GPA (Dean&apos;s List)</span>
          </span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
        >
          Engineering Reliable{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
            AI Systems
          </span>{" "}
          &amp; Resilient Architecture
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Hi, I&apos;m <span className="font-semibold text-slate-900 dark:text-white">Ved Patel</span>.
          An Honours Computer Science student focusing on{" "}
          <span className="text-sky-600 dark:text-sky-400 font-medium">RAG pipeline engineering</span>,{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">multi-agent validation</span>, and
          distributed edge systems.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium text-sm hover:opacity-95 transition-all shadow-sm"
          >
            Explore Technical Case Studies
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs hover:border-slate-400 dark:hover:border-slate-500 transition-all"
            title="Launch Interactive Terminal (Ctrl + K)"
          >
            <Terminal className="w-4 h-4 text-sky-500" />
            <span>Terminal console</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] text-slate-500 dark:text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Verified Social Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4 text-slate-500 dark:text-slate-400"
        >
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            aria-label="GitHub Professional Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.socials.githubAcademic}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors text-xs font-mono flex items-center gap-1.5"
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
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            aria-label="Email Ved Patel"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
