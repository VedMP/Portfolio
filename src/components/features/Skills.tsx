"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { SKILL_GROUPS, PROJECTS } from "@/core/data";

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Find projects using the selected skill
  const relatedProjects = selectedSkill
    ? PROJECTS.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()))
      )
    : [];

  return (
    <section id="skills" className="w-full py-16 sm:py-20 border-b border-border">
      {/* Editorial Header */}
      <div className="mb-10 sm:mb-12">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
          04 / Technical Stack
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900 dark:text-neutral-100 tracking-tight">
          Capabilities &amp; Tooling Matrix
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Languages, machine learning libraries, vector databases, and systems environments applied across production projects and academic labs. Click any skill to trace its application.
        </p>
      </div>

      {/* 2x2 Grid of Capability Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.name}
            className="p-6 sm:p-7 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between space-y-4"
          >
            <div>
              <h3 className="font-serif text-lg text-neutral-900 dark:text-neutral-100 font-medium">
                {group.name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1 leading-relaxed">
                {group.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {group.skills.map((skill) => {
                const isSelected = selectedSkill === skill;
                return (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium shadow-xs ring-1 ring-foreground"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Skill Application Ribbon */}
      {selectedSkill && (
        <div className="mt-8 p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-neutral-900 dark:text-neutral-100 font-medium">
              Application trace: <span className="underline decoration-neutral-400">{selectedSkill}</span>
            </span>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            >
              Clear
            </button>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {relatedProjects.map((p) => (
                <a
                  key={p.id}
                  href={`#project-${p.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-xs"
                >
                  <Check className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{p.title}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Applied in Ontario Tech CS core curriculum (Algorithms, Operating Systems, Systems Programming, Database Systems).
            </p>
          )}
        </div>
      )}
    </section>
  );
}
