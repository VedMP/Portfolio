import { Heart, Shield } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { PERSONAL_INFO } from "@/core/data";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="text-sky-500">~/</span>
              <span>ved.patel</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Honours Computer Science student (3.97 GPA) at Ontario Tech University.
              Architecting RAG pipelines, multi-agent validation loops, and resilient edge systems.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Edge Deployment: Cloudflare Pages (vedmpatel.me)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300">
              <li><a href="#projects" className="hover:text-sky-500 transition-colors">Projects</a></li>
              <li><a href="#architecture" className="hover:text-sky-500 transition-colors">Architecture Visualizer</a></li>
              <li><a href="#experience" className="hover:text-sky-500 transition-colors">Education &amp; Sprints</a></li>
              <li><a href="#skills" className="hover:text-sky-500 transition-colors">Technology Stack</a></li>
              <li><a href="#about" className="hover:text-sky-500 transition-colors">About Ved</a></li>
              <li><a href="#contact" className="hover:text-sky-500 transition-colors">Direct Contact</a></li>
            </ul>
          </div>

          {/* Verified Social Channels */}
          <div>
            <div className="text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
              Coordinates
            </div>
            <ul className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300">
              <li>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-sky-500 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub (Professional)</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.githubAcademic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-sky-500 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub (Academic)</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-sky-500 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-500 transition-colors"
                >
                  Official Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" aria-label="dedication" />
            <span>by Ved Patel • Ontario Tech University</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-sky-500" />
              <span>Strict CSP Hardened</span>
            </span>
            <span>© {new Date().getFullYear()} Ved Patel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
