"use client";

import Image from "next/image";
import { Award, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function About() {
  return (
    <section id="about" className="py-10 space-y-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent font-semibold mb-1.5">
          Background
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
          About {PERSONAL_INFO.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4 space-y-4">
          <div className="relative aspect-4/5 w-full max-w-[300px] rounded-xl overflow-hidden border border-border bg-surface-subtle">
            <Image
              src="/ProfilePhoto.JPG"
              alt={PERSONAL_INFO.name}
              fill
              sizes="300px"
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border font-mono text-xs space-y-1.5 max-w-[300px]">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <Award className="w-3.5 h-3.5 text-accent" />
              <span>{PERSONAL_INFO.gpa} GPA</span>
            </div>
            <div className="text-muted">{PERSONAL_INFO.academicStanding}</div>
            <div className="text-subtle text-[11px]">
              {PERSONAL_INFO.institution} · {PERSONAL_INFO.graduation}
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-5 text-sm sm:text-base text-muted leading-relaxed">
          <p>{PERSONAL_INFO.subheadline}</p>
          <p>{PERSONAL_INFO.bioDetail}</p>
          <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-accent px-4 py-2"
            >
              <span>Resume PDF</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={PERSONAL_INFO.transcriptPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile px-4 py-2"
            >
              <span>Transcript ({PERSONAL_INFO.gpa})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
