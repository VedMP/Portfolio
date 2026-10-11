import Link from "next/link";
import Experience from "@/components/features/Experience";

export default function ExperiencePage() {
  return (
    <div className="pt-8 pb-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-foreground transition-colors"
        >
          <span>← Return to Overview</span>
        </Link>
      </div>
      <Experience />
    </div>
  );
}
