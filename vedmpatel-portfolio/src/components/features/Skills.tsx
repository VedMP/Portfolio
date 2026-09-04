"use client";

import { Code2, Terminal, Cpu, Globe } from "lucide-react";
import { SKILL_GROUPS } from "@/core/data";

const CATEGORY_ICONS = {
  Languages: Code2,
  "AI & Generative Engineering": Cpu,
  "Systems, Tools & Infrastructure": Terminal,
  "Web & API Frameworks": Globe,
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            Skills &amp; Technology Stack
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Languages, vector tools, model orchestration frameworks, and system environments used across production projects.
          </p>
        </div>

        {/* 2x2 Grid of Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => {
            const Icon = CATEGORY_ICONS[group.name as keyof typeof CATEGORY_ICONS] || Code2;
            return (
              <div
                key={group.name}
                className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {group.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
