"use client";

import Image from "next/image";
import { Award, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function About() {
  return (
    <section id="about" className="w-full py-16 sm:py-20 border-t border-neutral-200 dark:border-neutral-800">
      {/* Editorial Header */}
      <div className="mb-10 sm:mb-12">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
          04 / Background
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900 dark:text-neutral-100 tracking-tight">
          About Ved Patel
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          Honours Computer Science student at Ontario Tech University, focusing on deterministic retrieval systems, multi-agent validation, and systems engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Color Portrait & Key Details */}
        <div className="md:col-span-5 lg:col-span-4 space-y-4">
          <div className="relative aspect-4/5 w-full max-w-[320px] mx-auto md:mx-0 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900">
            <Image
              src="/ProfilePhoto.JPG"
              alt={PERSONAL_INFO.name}
              fill
              sizes="(max-width: 768px) 320px, 320px"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="w-full max-w-[320px] p-4 rounded-lg bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-xs font-mono space-y-2">
            <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-neutral-100">
              <Award className="w-3.5 h-3.5 text-neutral-500" />
              <span>{PERSONAL_INFO.academicStanding}</span>
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Cumulative GPA: <span className="font-bold text-neutral-900 dark:text-neutral-100">{PERSONAL_INFO.gpa}</span>
            </div>
            <div className="text-neutral-500 text-[11px]">
              {PERSONAL_INFO.institution} • {PERSONAL_INFO.degree}
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative & Specifications */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6 text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            I am currently pursuing an Honours Bachelor of Science in Computer Science at{" "}
            <strong className="font-medium text-neutral-900 dark:text-neutral-100">
              Ontario Tech University
            </strong>
            . Across four consecutive academic semesters, I have sustained a{" "}
            <strong className="font-medium text-neutral-900 dark:text-neutral-100">
              3.97 GPA
            </strong>{" "}
            and Dean&apos;s List standing while dedicating my personal engineering time to building functional, real-world systems.
          </p>

          <p>
            My engineering work concentrates on{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              Deterministic AI Systems and Retrieval-Augmented Generation (RAG)
            </span>
            . Rather than relying on black-box model inferences, I focus on building architectures where every assertion is backed by verifiable document embeddings, cosine similarity checks in vector databases like ChromaDB, and strict citation provenance.
          </p>

          <p>
            During hackathons and capstone projects—such as architecting the{" "}
            <a href="#project-polyglot-tutor" className="underline decoration-neutral-400 hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-0.5">
              Polyglot Tutor platform at HackHive 2026
            </a>
            —I implemented multi-agent feedback loops where specialized auditor agents autonomously evaluate and repair generative outputs before transmission to end users.
          </p>

          {/* Academic & Systems Facts Grid */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              Academic &amp; Engineering Focus
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                <dt className="text-neutral-400 mb-1.5 uppercase tracking-wide text-[10px]">Algorithms &amp; Systems</dt>
                <dd className="text-neutral-800 dark:text-neutral-200 text-xs leading-relaxed">
                  Data Structures, Algorithm Design &amp; Complexity, Operating Systems, Database Internals.
                </dd>
              </div>
              <div className="p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                <dt className="text-neutral-400 mb-1.5 uppercase tracking-wide text-[10px]">Architecture &amp; Edge</dt>
                <dd className="text-neutral-800 dark:text-neutral-200 text-xs leading-relaxed">
                  Python Flask REST APIs, Next.js 16 Static Export, Cloudflare Pages V8 Edge Functions.
                </dd>
              </div>
            </dl>
          </div>

          <div className="pt-2 flex flex-wrap gap-5 text-xs font-mono">
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 underline decoration-neutral-400 hover:decoration-neutral-900 transition-colors"
            >
              <span>View Official Resume</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={PERSONAL_INFO.transcriptPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 underline decoration-neutral-400 hover:decoration-neutral-900 transition-colors"
            >
              <span>View Academic Transcript (3.97 GPA)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
