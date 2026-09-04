"use client";

import { GraduationCap, Trophy, Calendar, MapPin, ExternalLink, Award } from "lucide-react";
import { EXPERIENCES } from "@/core/data";

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-20 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Milestones &amp; Engineering Sprints</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            Education &amp; Experience
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            A rigorous academic foundation paired with competitive hackathon architecture sprints.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 md:before:left-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 before:z-0">
          {EXPERIENCES.map((item) => {
            const isEducation = item.type === "education";
            return (
              <div key={item.id} className="relative z-10 flex items-start gap-4 md:gap-6">
                {/* Timeline Icon Badge */}
                <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border shadow-sm ${
                  isEducation
                    ? "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400"
                    : "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
                }`}>
                  {isEducation ? (
                    <GraduationCap className="w-6 h-6" />
                  ) : (
                    <Trophy className="w-6 h-6" />
                  )}
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {isEducation ? "Academic Program" : "Hackathon Sprint"}
                        </span>
                        {item.metrics && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <Award className="w-3 h-3" />
                            {item.metrics}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>

                      <a
                        href={item.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline mt-0.5"
                      >
                        <span>{item.institution}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400 gap-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet Points */}
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-6">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-sky-500 dark:text-sky-400 font-bold mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Tagged */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
