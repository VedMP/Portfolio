"use client";

import Image from "next/image";
import { Award, BookOpen, Terminal, CheckCircle2 } from "lucide-react";
import { PERSONAL_INFO } from "@/core/data";

export default function About() {
  return (
    <section id="about" className="relative w-full py-20 px-6 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Background &amp; Focus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            About Ved Patel
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Dedicated to engineering robust machine intelligence systems with rigorous academic foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left Column: Photo & Academic Pill */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-md">
              <Image
                src="/ProfilePhoto.JPG"
                alt={PERSONAL_INFO.name}
                fill
                sizes="(max-width: 768px) 192px, 224px"
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="w-full max-w-[224px] p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-center md:text-left space-y-1">
              <div className="text-[11px] font-mono text-sky-700 dark:text-sky-300 font-semibold flex items-center justify-center md:justify-start gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>President&apos;s / Dean&apos;s List</span>
              </div>
              <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
                Cumulative GPA: <span className="font-bold text-sky-600 dark:text-sky-400">{PERSONAL_INFO.gpa}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="md:col-span-2 space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am an Honours Computer Science student at{" "}
              <span className="font-semibold text-slate-900 dark:text-white">Ontario Tech University</span>.
              Across four consecutive academic semesters, I have maintained a{" "}
              <span className="font-semibold text-slate-900 dark:text-white">3.97 GPA</span> and Dean&apos;s List
              standing while prioritizing practical, hands-on systems and AI engineering.
            </p>

            <p>
              My engineering focus centers on{" "}
              <span className="font-medium text-sky-600 dark:text-sky-400">Generative AI Systems</span>.
              I design and implement <span className="text-slate-900 dark:text-white font-medium">Retrieval-Augmented Generation (RAG)</span> architectures,
              working with dense vector indexing in ChromaDB, semantic embeddings, and LLM orchestration with LangChain to build context-grounded tools with strict provenance.
            </p>

            <p>
              Beyond retrieval architectures, I explore{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Multi-Agent Verification Pipelines</span>—such as
              the automated Teacher-TA validation loop built during HackHive 2026—to autonomously audit language models for factual and grammatical integrity before client delivery.
            </p>

            {/* Factual Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Algorithms &amp; Data Structures</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">Rigorous coursework in computational complexity and optimization.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                <Terminal className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Systems &amp; Architecture</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">Experience building with Python, Flask, Docker, Linux, and Cloudflare Pages.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
