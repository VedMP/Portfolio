/**
 * @file Footer.tsx
 * @description Footer component with brand info, quick links, and social media links.
 */

"use client";

import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import Link from "next/link";

/**
 * Social media links configuration
 */
const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/VedMP" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/ved-patel-cs/",
  },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
  { name: "Email", icon: Mail, url: "mailto:vedmpatel2005@gmail.com" },
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
    <footer className="relative border-t border-slate-800 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Three-column grid layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              Ved<span className="text-blue-400">.</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              Building elegant solutions to complex problems.
            </p>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  aria-label={`Follow on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by Ved Patel
          </p>
          <p className="text-xs text-slate-600 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
