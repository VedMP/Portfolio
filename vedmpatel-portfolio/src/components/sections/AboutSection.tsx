/**
 * @file AboutSection.tsx
 * @description About section component displaying bio, stats, and skills.
 * Features a two-column layout with animated content.
 */

"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

/**
 * Statistics configuration for the stats grid
 */
const stats = [
  { value: "15+", label: "Projects" },
  { value: "3+", label: "Years Coding" },
  { value: "5+", label: "Technologies" },
];

/**
 * AboutSection Component
 *
 * Displays personal information in a two-column layout:
 * - Left: Bio paragraph and stats grid
 * - Right: Skills organized by category
 *
 * All content animates into view using Framer Motion.
 */
export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32">
      {/* Container with 20px padding from edges */}
      <div
        className="w-full flex justify-center"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <div className="w-full max-w-6xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A passionate developer with a drive for creating impactful
              solutions
            </p>
          </motion.div>

          {/* Two-column content grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left column: Bio and stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Bio paragraphs */}
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  I&apos;m{" "}
                  <span className="text-white font-semibold">Ved Patel</span>,
                  an Honours Computer Science student at{" "}
                  <span className="text-blue-400 font-medium">
                    Ontario Tech University
                  </span>
                  . My journey in tech started with a curiosity about how
                  software shapes our daily lives.
                </p>
                <p>
                  I specialize in full-stack development, working with modern
                  frameworks like React, Next.js, and Node.js. I&apos;m particularly
                  interested in creating user-centric experiences.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="text-2xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column: Skills by category */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 text-sm rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600/50"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
