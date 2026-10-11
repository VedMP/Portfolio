"use client";

import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES, PERSONAL_INFO } from "@/core/data";

export default function Experience() {
  return (
    <section id="experience" className="py-14 border-b border-border">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">
            Education &amp; Experience
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Academic standing and competitive hackathon architecture sprints.
          </p>
        </div>

        <div className="space-y-10">
          {EXPERIENCES.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base font-medium text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <a
                    href={item.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="human-link text-xs font-mono text-neutral-500 dark:text-neutral-400 inline-flex items-center gap-0.5 mt-0.5"
                  >
                    <span>{item.institution}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  {item.period}
                </div>
              </div>

              {item.metrics && (
                <div className="text-xs font-mono text-neutral-700 dark:text-neutral-300 font-medium">
                  {item.metrics} • {PERSONAL_INFO.academicStanding}
                </div>
              )}

              <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {item.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 select-none">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-1">
                {item.skills.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
