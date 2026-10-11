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
    <section id="skills" className="w-full py-16 border-t border-neutral-200 dark:border-neutral-800">
      {/* Editorial Header */}
      <div className="mb-10">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
          03 / Capabilities
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900 dark:text-neutral-100 tracking-tight">
          Technical Stack &amp; Tooling
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Languages, machine learning libraries, vector databases, and systems environments applied across production projects and academic labs. Click any skill to trace its application.
        </p>
      </div>

      {/* Structured Technical Capability Matrix */}
      <div className="space-y-8">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.name}
            className="pb-8 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
              <h3 className="font-serif text-base text-neutral-900 dark:text-neutral-100 font-medium">
                {group.name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {group.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {group.skills.map((skill) => {
                const isSelected = selectedSkill === skill;
                return (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors text-left ${
                      isSelected
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-800"
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
        <div className="mt-6 p-4 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-neutral-900 dark:text-neutral-100 font-medium">
              Application trace: <span className="underline decoration-neutral-400">{selectedSkill}</span>
            </span>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Clear
            </button>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {relatedProjects.map((p) => (
                <a
                  key={p.id}
                  href={`#project-${p.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                >
                  <Check className="w-3 h-3 text-neutral-400" />
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
