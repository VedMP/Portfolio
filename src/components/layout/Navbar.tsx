"use client";

import {
  useState,
  useEffect,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { useTheme } from "next-themes";
import { PERSONAL_INFO } from "@/core/data";
import { useToast } from "@/components/ui/Toast";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const RAIL_LINKS = [
  { id: "overview", num: "01", name: "Overview", href: "/#overview" },
  { id: "architecture", num: "02", name: "Systems Architecture", href: "/#architecture" },
  { id: "projects", num: "03", name: "Selected Projects", href: "/#projects" },
  { id: "experience", num: "04", name: "Academics & Milestones", href: "/#experience" },
  { id: "skills", num: "05", name: "Stack & Coursework", href: "/#skills" },
  { id: "contact", num: "06", name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();
  const { toast } = useToast();
  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Could not copy email", "error");
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = RAIL_LINKS.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Mobile & Tablet Top Bar (< lg) */}
      <header className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md no-print">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border-strong shrink-0 bg-surface-subtle">
              <Image
                src="/ProfilePhoto.JPG"
                alt={PERSONAL_INFO.name}
                fill
                sizes="36px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="truncate">
              <div className="font-serif text-xl leading-none text-foreground">
                {PERSONAL_INFO.name}
              </div>
              <div className="font-mono text-[10px] text-accent mt-0.5 truncate">
                {PERSONAL_INFO.gpa} GPA · Honours CS
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-accent px-2.5 py-1.5 text-[11px] font-mono"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {mounted ? (
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border bg-surface text-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-9 h-9" aria-hidden="true" />
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg border border-border bg-surface text-muted hover:text-foreground cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-border bg-surface px-4 sm:px-6 py-4 space-y-1.5"
          >
            {RAIL_LINKS.map((link) => (
              <a
                key={link.id}
                href={pathname === "/" ? `#${link.id}` : link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-mono text-muted hover:text-foreground hover:bg-surface-subtle transition-colors"
              >
                <span>{link.name}</span>
                <span className="text-[11px] text-accent">{link.num}</span>
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-border flex flex-wrap gap-2">
              <a
                href={PERSONAL_INFO.transcriptPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile px-3 py-1.5 text-xs font-mono"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Transcript ({PERSONAL_INFO.gpa})</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-tactile px-3 py-1.5 text-xs font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Email" : "Copy Email"}</span>
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Desktop Sticky Left Identity Rail (>= lg) */}
      <aside
        aria-label="Identity and section navigation"
        className="hidden lg:flex lg:flex-col lg:justify-between lg:sticky lg:top-0 lg:h-screen lg:w-[348px] xl:w-[372px] shrink-0 border-r border-border bg-background px-7 xl:px-8 py-8 overflow-y-auto no-print"
      >
        <div className="space-y-6">
          {/* Identity Lockup + Theme Toggle */}
          <div className="flex items-start justify-between gap-3">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border-strong shrink-0 bg-surface-subtle transition-transform duration-200 group-hover:scale-[1.03]">
                <Image
                  src="/ProfilePhoto.JPG"
                  alt={PERSONAL_INFO.name}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div>
                <div className="font-serif text-[2.1rem] leading-[0.95] text-foreground tracking-[-0.015em]">
                  {PERSONAL_INFO.name}
                </div>
                <div className="font-mono text-[11px] font-medium text-accent mt-1.5">
                  {PERSONAL_INFO.role}
                </div>
              </div>
            </Link>

            {mounted ? (
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-border-strong transition-colors cursor-pointer shrink-0"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to warm paper light mode" : "Switch to warm obsidian dark mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-8 h-8 shrink-0" aria-hidden="true" />
            )}
          </div>

          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border text-[11px] font-mono text-foreground">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: "var(--status-green)" }}
              aria-hidden="true"
            />
            <span>{PERSONAL_INFO.availability}</span>
          </div>

          {/* Concise Bio */}
          <p className="text-[13.5px] leading-relaxed text-muted">
            {PERSONAL_INFO.subheadline}
          </p>

          {/* Active Scroll-Spy Navigation */}
          <nav aria-label="Primary sections" className="space-y-1">
            {RAIL_LINKS.map((link) => {
              const isCurrent = pathname === "/" && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={pathname === "/" ? `#${link.id}` : link.href}
                  aria-current={isCurrent ? "location" : undefined}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    isCurrent
                      ? "bg-surface text-foreground border border-border font-medium"
                      : "text-muted hover:text-foreground hover:bg-surface/70 border border-transparent"
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`text-[11px] ${
                      isCurrent ? "text-accent font-semibold" : "text-subtle"
                    }`}
                  >
                    {link.num}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Primary Recruiter Conversion Actions */}
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-accent px-3.5 py-2 text-xs font-mono"
            >
              <span>Resume PDF</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.transcriptPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile px-3 py-2 text-xs font-mono"
            >
              <span>Transcript</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-tactile px-3 py-2 text-xs font-mono"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-accent" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-subtle" />
              )}
              <span>{copied ? "Copied" : "Copy Email"}</span>
            </button>
          </div>
        </div>

        {/* Persistent Academic & Social Footer */}
        <div className="pt-5 mt-6 border-t border-border font-mono text-[11px] text-muted space-y-1.5">
          <div className="text-foreground font-semibold">
            {PERSONAL_INFO.gpa} GPA · {PERSONAL_INFO.institution}
          </div>
          <div>{PERSONAL_INFO.academicStanding}</div>
          <div className="text-subtle">{PERSONAL_INFO.shortLocation} · Grad {PERSONAL_INFO.graduation}</div>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 pt-2 text-[11px]">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="human-link text-foreground"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.socials.githubAcademic}
              target="_blank"
              rel="noopener noreferrer"
              className="human-link"
            >
              Academic GH
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="human-link text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="human-link"
            >
              Email
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
