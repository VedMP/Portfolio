/**
 * @file HeroSection.tsx
 * @description Hero section component - the main landing area of the portfolio.
 * Features animated content, social links, and call-to-action buttons.
 */

"use client";

import { motion, Variants } from "framer-motion";
import { Mail, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import Button from "@/components/ui/Button";
import { EMAIL, SOCIAL_LINKS } from "@/data/contact";

/**
 * Social media links configuration
 */
const socialLinks = [
  { name: "GitHub (Professional)", icon: GithubIcon, url: SOCIAL_LINKS.github },
  { name: "GitHub (Academic)", icon: GithubIcon, url: SOCIAL_LINKS.githubAcademic },
  { name: "LinkedIn", icon: LinkedinIcon, url: SOCIAL_LINKS.linkedin },
  { name: "Email", icon: Mail, url: `mailto:${EMAIL}` },
];

/**
 * Shared stagger variants for hero content items.
 * Each item passes its stagger position via the `custom` prop.
 * Using shared variants instead of repeating identical initial/animate/transition
 * props on every element reduces JSX verbosity and keeps timings in one place.
 */
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

/**
 * HeroSection Component
 *
 * The main landing section featuring:
 * - Animated background effects
 * - Status badge (available for opportunities)
 * - Name and role introduction
 * - Brief description
 * - Call-to-action buttons
 * - Social media links
 * - Animated scroll indicator
 */
export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full flex justify-center px-5">
        <div className="w-full max-w-4xl text-center">
          {/* Availability status badge */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-6 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name heading */}
          <motion.h1
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white"
          >
            Hi, I&apos;m <span className="gradient-text">Ved Patel</span>
          </motion.h1>

          {/* Role subtitle */}
          <motion.h2
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-6"
          >
            AI and ML Developer &amp; CS Student
          </motion.h2>

          {/* Description paragraph */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10"
          >
            Passionate about engineering reliable AI systems and scalable infrastructure.
            I specialize in <span className="text-slate-900 dark:text-white font-medium">Generative AI</span> and
            <span className="text-slate-900 dark:text-white font-medium"> Systems Engineering</span>,
            focusing on architecting RAG pipelines, reducing model hallucinations, and
            building AI powered solutions.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button href="/projects" size="lg">
              View My Work
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              <Mail className="w-5 h-5" />
              Get in Touch
            </Button>
          </motion.div>

          {/* Social media icons */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => {
              const isExternal = social.url.startsWith("http");
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                  aria-label={`Visit ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator - hidden on mobile to prevent overlap */}
      <motion.a
        href="/about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        aria-label="Scroll to About section"
      >
        <span className="text-sm">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
