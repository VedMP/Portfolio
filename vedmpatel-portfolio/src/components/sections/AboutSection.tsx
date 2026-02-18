/**
 * @file AboutSection.tsx
 * @description About section component displaying bio, stats, and skills.
 * Features a two-column layout with animated content.
 */

"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import Image from "next/image";

/**
 * Statistics configuration for the stats grid
 */
const stats = [
  { value: "3+", label: "Projects" },
  { value: "3+", label: "Years Coding" },
  { value: "23+", label: "Technologies" },
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
    <section id="about" className="relative w-full py-12 md:py-16">
      {/* Container with 20px horizontal padding */}
      <div className="w-full flex justify-center px-5">
        <div className="w-full max-w-6xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              A passionate developer with a drive for creating impactful
              solutions
            </p>

            {/* Profile Photo */}
            <div className="relative w-60 h-60 mx-auto">
              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/ProfilePhoto.JPG"
                    alt="Ved Patel"
                    width={240}
                    height={240}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>
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
              <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  I&apos;m <span className="text-slate-900 dark:text-white font-semibold">Ved Patel</span>,
                  an Honours Computer Science student at
                  <span className="text-blue-500 dark:text-blue-400 font-medium"> Ontario Tech University</span>.
                  I have consistently achieved <span className="text-slate-900 dark:text-white">President&apos;s List</span> status,
                  maintaining a <span className="text-slate-900 dark:text-white">3.97 GPA</span> while focusing on
                  the engineering challenges of modern AI.
                </p>

                <p>
                  My technical focus is on <span className="text-slate-900 dark:text-white font-medium">Generative AI Engineering</span>.
                  I have architected <span className="text-slate-900 dark:text-white">Retrieval-Augmented Generation (RAG)</span> pipelines
                  using <span className="text-blue-500 dark:text-blue-300">Python</span>,
                  <span className="text-blue-500 dark:text-blue-300"> Watsonx.ai</span>, and
                  <span className="text-blue-500 dark:text-blue-300"> ChromaDB</span> to solve reliability issues like LLM hallucinations.
                  I am also actively exploring agentic workflows to bridge natural language and structured data.
                </p>

                <p>
                  Beyond AI, I have a strong foundation in systems and data.
                  I have experience optimizing legacy <span className="text-blue-500 dark:text-blue-300">C++</span> code for performance
                  and utilizing <span className="text-blue-500 dark:text-blue-300">SQL</span> and <span className="text-blue-500 dark:text-blue-300">Pandas </span>
                  to derive insights from datasets.
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
                    className="text-center p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none"
                  >
                    <div className="text-2xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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
                  className="p-6 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {/* skills is now string[] — no .name lookup needed */}
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600/50"
                      >
                        {skill}
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
