/**
 * @file Navbar.tsx
 * @description Navigation bar component with responsive mobile menu.
 * Features scroll-based styling changes and smooth transitions.
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import AccessibilityDropdown from "@/components/ui/AccessibilityDropdown";

/**
 * Navigation links configuration
 */
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

/**
 * Navbar Component
 *
 * A responsive navigation bar that:
 * - Changes appearance when scrolled (adds background blur)
 * - Includes a mobile hamburger menu
 * - Features smooth animations using Framer Motion
 *
 * Performance note: the scroll handler is wrapped in requestAnimationFrame
 * to throttle updates and the listener uses { passive: true } so the browser
 * can optimise scrolling without waiting to see if preventDefault() is called.
 */
export default function Navbar() {
  // Track scroll position for styling changes
  const [isScrolled, setIsScrolled] = useState(false);
  // Track mobile menu open/close state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add scroll listener on mount
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      // Cancel any pending frame before scheduling a new one (throttle)
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };

    // passive: true lets the browser scroll-optimise without waiting for
    // preventDefault() — eliminates the "non-passive event listener" warning
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-slate-800 dark:text-white">
            Ved<span className="text-blue-500 dark:text-blue-400">.</span>
          </Link>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA button */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors mr-4"
          >
            Let&apos;s Talk
          </Link>

          {/* Accessibility Dropdown */}
          <div className="mr-2">
            <AccessibilityDropdown />
          </div>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
