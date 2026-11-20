"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import {
  SKILL_GROUPS,
  PROJECTS,
  VERIFIED_COURSEWORK,
  PERSONAL_INFO,
} from "@/core/data";

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const relatedProjects = selectedSkill
    ? PROJECTS.filter((p) =>
        p.tags.some((t) =>
          t.toLowerCase().includes(selectedSkill.toLowerCase()) ||
          selectedSkill.toLowerCase().includes(t.toLowerCase())
        )
      )
    : [];

  return (
    <section
      id="skills"
      className="py-12 sm:py-14 border-b border-border scroll-mt-8"
    >
      <div className="space-y-8">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent font-semibold mb-1.5">
            Transcript &amp; Capability Trace
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.45rem] leading-[1.08] font-normal text-foreground">
            Coursework &amp; Technical Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left: Verified Ontario Tech Transcript Table */}
          <div className="xl:col-span-5 p-5 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
            <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-border">
              <div>
                <h3 className="font-serif text-xl text-foreground font-normal">
                  Ontario Tech Transcript
                </h3>
                <p className="font-mono text-[11px] text-subtle mt-0.5">
                  Cumulative {PERSONAL_INFO.gpa} · 75 Credits Earned
                </p>
              </div>
              <a
                href={PERSONAL_INFO.transcriptPath}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] human-link text-foreground inline-flex items-center gap-0.5 shrink-0"
              >
                <span>PDF</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <ul className="divide-y divide-border text-xs">
              {VERIFIED_COURSEWORK.map((course) => (
                <li
                  key={course.code}
                  className="py-2.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-baseline gap-2.5 min-w-0">
                    <span className="font-mono text-[11px] text-subtle shrink-0">
                      {course.code}
                    </span>
                    <span className="text-foreground truncate">
                      {course.name}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[11px] font-semibold shrink-0 px-2 py-0.5 rounded ${
                      course.highlight
                        ? "text-accent bg-surface-subtle border border-border"
                        : "text-muted"
                    }`}
                  >
                    {course.grade}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Interactive Skill Trace Matrix */}
          <div className="xl:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.name}
                  className="p-5 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4"
                >
                  <div>
                    <h3 className="font-serif text-xl text-foreground font-normal">
                      {group.name}
                    </h3>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => {
                      const isSelected = selectedSkill === skill;
                      return (
                        <button
                          key={skill}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() =>
                            setSelectedSkill(isSelected ? null : skill)
                          }
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-accent text-accent-foreground border-accent font-semibold"
                              : "bg-background text-foreground border-border hover:border-border-strong"
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

            {/* Interactive Trace Output */}
            <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border">
              {selectedSkill ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-foreground font-semibold">
                      Where <span className="text-accent">{selectedSkill}</span> is applied:
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedSkill(null)}
                      className="text-subtle hover:text-foreground cursor-pointer"
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
                          className="btn-tactile px-3 py-1.5 text-xs font-mono"
                        >
                          <Check className="w-3.5 h-3.5 text-accent" />
                          <span>{p.title}</span>
                          <ArrowUpRight className="w-3 h-3 text-subtle" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-muted">
                      Applied across Ontario Tech CS core coursework (Systems Programming, Data Structures, Algorithms, Database Systems, and SQA labs).
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs font-mono text-subtle">
                  Select any language or tool above to trace which projects or Ontario Tech courses use it.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
