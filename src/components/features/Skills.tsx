"use client";

import { useState } from "react";
import { Code2, Terminal, Cpu, Globe, Check } from "lucide-react";
import { SKILL_GROUPS, PROJECTS } from "@/core/data";

const CATEGORY_ICONS = {
  Languages: Code2,
  "AI & Generative Engineering": Cpu,
  "Systems, Tools & Infrastructure": Terminal,
  "Web & API Frameworks": Globe,
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Find projects using the selected skill
  const relatedProjects = selectedSkill
    ? PROJECTS.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()))
      )
    : [];

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
            Languages, vector tools, model orchestration frameworks, and system environments used across production projects. Click any skill to inspect project application.
          </p>
        </div>

        {/* 2x2 Grid of Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {SKILL_GROUPS.map((group) => {
            const Icon = CATEGORY_ICONS[group.name as keyof typeof CATEGORY_ICONS] || Code2;
            return (
              <div
                key={group.name}
                className="hairline-card p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between"
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
                  {group.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(isSelected ? null : skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? "bg-sky-600 text-white shadow-sm ring-1 ring-sky-400"
                            : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-sky-400"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Skill-to-Project Association Ribbon */}
        {selectedSkill && (
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-sky-800 dark:text-sky-300">
                Application Context for: <span className="underline">{selectedSkill}</span>
              </span>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Clear
              </button>
            </div>

            {relatedProjects.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {relatedProjects.map((p) => (
                  <a
                    key={p.id}
                    href={`#project-${p.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0f1422] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-sky-400 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{p.title}</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Applied across core university coursework, systems programming laboratories, and backend infrastructure.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
