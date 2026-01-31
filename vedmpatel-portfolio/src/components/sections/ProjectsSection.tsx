/**
 * @file ProjectsSection.tsx
 * @description Projects section with filterable project grid.
 * Features category filtering and animated project cards.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";

/**
 * Available filter categories
 */
const categories = ["all", "frontend", "fullstack", "mobile", "ai"] as const;

/**
 * ProjectsSection Component
 *
 * Displays a filterable grid of project cards.
 * Users can filter by category (all, frontend, fullstack, mobile, ai).
 * Projects animate in/out when filtering.
 */
export default function ProjectsSection() {
  // Currently selected filter category
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50"
    >
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Technical case studies showcasing my skills and passion for
              development
            </p>
          </motion.div>

          {/* Category filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                    ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none"
                  }`}
                aria-pressed={activeCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Animated project grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
