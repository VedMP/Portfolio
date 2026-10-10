import Link from "next/link";
import Experience from "@/components/features/Experience";

export default function ExperiencePage() {
  return (
    <div className="pt-16 pb-12 min-h-screen flex flex-col justify-between">
      <div>
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-600 dark:text-sky-400 hover:underline"
          >
            <span>← Return to Overview</span>
          </Link>
        </div>
        <Experience />
      </div>
    </div>
  );
}
