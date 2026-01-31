/**
 * @file ProjectCard.tsx
 * @description Card component for displaying project information.
 * Features animated entrance, project details, tags, and action links.
 */

"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/projects";

/**
 * ProjectCard component props
 */
interface ProjectCardProps {
  /** Project data to display */
  project: Project;
  /** Index for staggered animations */
  index: number;
}

/**
 * ProjectCard Component
 *
 * Displays a project with its image, title, description, tags, and links.
 * Features smooth entrance animations powered by Framer Motion.
 *
 * @param project - The project data to display
 * @param index - Used for staggered animation delays
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden hover:border-slate-600 transition-all duration-300"
    >
      {/* Project image placeholder with gradient background */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
        <span className="text-4xl">🚀</span>
      </div>

      {/* Project content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2">
          {project.title}
        </h3>

        {/* Description (truncated to 2 lines) */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technology tags (show up to 3) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-slate-700/50 text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex items-center gap-3">
          {/* GitHub link */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {/* Live demo link */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
