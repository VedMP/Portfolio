/**
 * @file ProjectCard.tsx
 * @description Card component for displaying project information.
 * Features animated entrance, project details, tags, and action links.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { Project } from "@/lib/projects";
import Image from "next/image";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 shadow-sm dark:shadow-none"
    >
      {/* Project image or fallback placeholder */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20 flex items-center justify-center overflow-hidden">
        {project.image && !imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={225}
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-4xl">🚀</span>
        )}
      </div>

      {/* Project content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {project.title}
        </h3>

        {/* Description (click to expand/collapse) */}
        <p
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-sm text-slate-600 dark:text-slate-400 mb-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300 transition-colors ${isExpanded ? "" : "line-clamp-2"}`}
        >
          {project.description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"
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
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="View on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {/* Live demo link */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
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
