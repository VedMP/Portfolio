"use client";

import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES, PERSONAL_INFO } from "@/core/data";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 border-b border-border">
      <div className="space-y-12">
        {/* Section Header */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
            03 / Education &amp; Milestones
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-foreground">
            Academic Foundation &amp; Experience
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Continuous academic excellence at Ontario Tech University and rapid multi-agent system architecture sprints.
          </p>
        </div>

        {/* 2-Column Editorial Timeline */}
        <div className="space-y-12">
          {EXPERIENCES.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 pb-10 border-b border-neutral-200/80 dark:border-neutral-800/80 last:border-b-0 last:pb-0 items-start"
            >
              {/* Left Column: Metadata & Metrics */}
              <div className="md:col-span-4 space-y-2">
                <a
                  href={item.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-base text-foreground hover:underline inline-flex items-center gap-1"
                >
                  <span>{item.institution}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {item.period}
                </div>

                <div className="text-xs font-mono text-neutral-400">
                  {item.location}
                </div>

                {item.metrics && (
                  <div className="inline-block mt-1 px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium text-foreground">
                    {item.metrics} {item.type === "education" ? `• ${PERSONAL_INFO.academicStanding}` : ""}
                  </div>
                )}
              </div>

              {/* Right Column: Title & Highlights */}
              <div className="md:col-span-8 space-y-3">
                <h3 className="text-lg font-medium text-foreground tracking-tight">
                  {item.title}
                </h3>

                <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-neutral-400 select-none mt-1 text-xs">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100/80 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
