"use client";

import { ArrowUpRight, Award } from "lucide-react";
import { EXPERIENCES, CERTIFICATES } from "@/core/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-12 sm:py-14 border-b border-border scroll-mt-8"
    >
      <div className="space-y-8">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent font-semibold mb-1.5">
            Education, Hackathons &amp; Simulations
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.45rem] leading-[1.08] font-normal text-foreground">
            Academics &amp; Engineering Milestones
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-5">
          {EXPERIENCES.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-surface border border-border grid grid-cols-1 md:grid-cols-12 gap-5 items-start"
            >
              {/* Left Meta */}
              <div className="md:col-span-4 space-y-2">
                <a
                  href={item.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm sm:text-base text-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  <span>{item.institution}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-subtle" />
                </a>

                <div className="font-mono text-xs text-muted">{item.period}</div>
                <div className="font-mono text-[11px] text-subtle">
                  {item.location}
                </div>

                {item.metrics && (
                  <div className="inline-block mt-1 px-2.5 py-1 rounded-md bg-surface-subtle border border-border font-mono text-[11px] font-medium text-foreground">
                    {item.metrics}
                  </div>
                )}
              </div>

              {/* Right Details */}
              <div className="md:col-span-8 space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground leading-tight">
                  {item.title}
                </h3>

                <ul className="space-y-2 text-sm text-muted leading-relaxed">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span
                        className="text-accent font-mono text-xs mt-1 shrink-0"
                        aria-hidden="true"
                      >
                        —
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-1 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-background text-muted border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Professional Certificate Strip */}
        <div className="p-5 rounded-xl bg-surface border border-border border-l-[3px] border-l-accent flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-surface-subtle border border-border text-accent shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                Verified Certificate
              </div>
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.title}
                  className="text-sm font-semibold text-foreground mt-0.5"
                >
                  {cert.title}{" "}
                  <span className="font-mono text-xs font-normal text-muted">
                    ({cert.issuer} · {cert.year})
                  </span>
                </div>
              ))}
            </div>
          </div>
          <a
            href="#project-smart-document-assistant"
            className="font-mono text-xs human-link text-foreground shrink-0"
          >
            View Capstone Build ↓
          </a>
        </div>
      </div>
    </section>
  );
}
