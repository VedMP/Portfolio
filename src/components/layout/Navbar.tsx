"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, FileText, Command } from "lucide-react";
import { useTheme } from "next-themes";
import AccessibilityDropdown from "@/components/ui/AccessibilityDropdown";
import { PERSONAL_INFO } from "@/core/data";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const NAV_LINKS = [
  { name: "Architecture", href: "#architecture" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenCommandMenu }: { onOpenCommandMenu?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-white/90 dark:bg-[#080c14]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
        >
          <span className="text-sky-500 font-extrabold">~/</span>
          <span>ved.patel</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Icons & Toggles */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          {onOpenCommandMenu && (
            <button
              onClick={onOpenCommandMenu}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-mono"
              title="Open Command Menu (⌘K / Ctrl+K)"
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5 text-slate-400" />
              <span>⌘K</span>
            </button>
          )}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Accessibility Dropdown */}
          <AccessibilityDropdown />

          {/* Resume Link */}
          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 transition-opacity shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Open mobile navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080c14]/95 backdrop-blur-lg px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-mono text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 py-2.5 min-h-[44px] flex items-center border-b border-slate-100 dark:border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {onOpenCommandMenu && (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenCommandMenu();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs font-mono text-slate-700 dark:text-slate-300"
              >
                <Command className="w-4 h-4 text-sky-500" />
                <span>Command Palette (Search &amp; Jump)</span>
              </button>
            )}

            <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pt-2">
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="text-sky-600 dark:text-sky-400 font-medium py-1"
              >
                Get In Touch →
              </a>
              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1"
              >
                Resume PDF →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
