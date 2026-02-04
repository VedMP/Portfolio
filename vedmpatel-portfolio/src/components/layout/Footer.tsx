/**
 * @file Footer.tsx
 * @description Footer component with brand info, quick links, and social media links.
 */

"use client";

import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/SocialIcons";
import Link from "next/link";
import { EMAIL, SOCIAL_LINKS } from "@/data/contact";

/**
 * Social media links configuration
 */
const socialLinks = [
  { name: "GitHub", icon: GithubIcon, url: SOCIAL_LINKS.github },
  { name: "LinkedIn", icon: LinkedinIcon, url: SOCIAL_LINKS.linkedin },
  { name: "X", icon: XIcon, url: SOCIAL_LINKS.twitter },
  { name: "Email", icon: Mail, url: `mailto:${EMAIL}` },
];

/**
 * Footer navigation links
 */
const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

/**
 * Footer Component
 *
 * Displays site footer with three columns:
 * - Brand/Logo with tagline
 * - Quick navigation links
 * - Social media icons
 *
 * Also includes copyright notice at the bottom.
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Three-column grid layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              Ved<span className="text-blue-500 dark:text-blue-400">.</span>
            </Link>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Building elegant solutions to complex problems.
            </p>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const isExternal = social.url.startsWith("http");
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-700 dark:hover:bg-slate-700 transition-colors"
                    aria-label={`Follow on ${social.name}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by Ved Patel
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-600 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
