import Link from "next/link";
import Projects from "@/components/features/Projects";

export default function ProjectsPage() {
  return (
    <div className="pt-16 pb-12 min-h-screen flex flex-col justify-between">
      <div>
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-600 dark:text-sky-400 hover:underline"
          >
            <span>← Return to Overview</span>
          </Link>
        </div>
        <Projects />
      </div>
    </div>
  );
}
