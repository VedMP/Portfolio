/**
 * @file ExperienceSection.tsx
 * @description Experience and education timeline section.
 * Displays work experience and education in separate timeline views.
 */

"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { experiences, Experience } from "@/data/experience";

/**
 * ExperienceSection Component
 *
 * Displays professional experience and education history.
 * Each category has its own timeline with animated cards.
 */
export default function ExperienceSection() {
  // Separate work and education entries
  const workExperience = experiences.filter((e) => e.type === "work");
  const education = experiences.filter((e) => e.type === "education");

  return (
    <section id="experience" className="relative w-full py-24 md:py-32">
      {/* Container with 20px padding from edges */}
      <div
        className="w-full flex justify-center"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <div className="w-full max-w-4xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Experience & <span className="gradient-text">Education</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              My professional journey and academic background
            </p>
          </motion.div>

          {/* Work Experience section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Work Experience
              </h3>
            </div>
            <div className="space-y-6">
              {workExperience.map((exp, index) => (
                <TimelineCard
                  key={exp.id}
                  experience={exp}
                  index={index}
                  color="blue"
                />
              ))}
            </div>
          </div>

          {/* Education section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-violet-500/20">
                <GraduationCap className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((exp, index) => (
                <TimelineCard
                  key={exp.id}
                  experience={exp}
                  index={index}
                  color="violet"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * TimelineCard Component
 *
 * Displays a single experience/education entry as a card.
 *
 * @param experience - The experience data to display
 * @param index - Index for staggered animation delay
 * @param color - Color theme (blue for work, violet for education)
 */
function TimelineCard({
  experience,
  index,
  color,
}: {
  experience: Experience;
  index: number;
  color: "blue" | "violet";
}) {
  const textColor = color === "blue" ? "text-blue-400" : "text-violet-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
    >
      {/* Header with role and status badge */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="text-lg font-semibold text-white">
            {experience.role}
          </h4>
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium hover:underline ${textColor}`}
          >
            {experience.company}
          </a>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            experience.endDate === "Present"
              ? "bg-green-500/20 text-green-400"
              : "bg-slate-700 text-slate-400"
          }`}
        >
          {experience.endDate === "Present" ? "Current" : experience.endDate}
        </span>
      </div>

      {/* Date and location metadata */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {experience.startDate} - {experience.endDate}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {experience.location}
        </span>
      </div>

      {/* Description bullet points */}
      <ul className="space-y-2 mb-4">
        {experience.description.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-blue-400 mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>

      {/* Technology tags */}
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs rounded-md bg-slate-700/50 text-slate-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
