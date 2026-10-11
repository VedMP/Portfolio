import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 space-y-4">
      <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
        404 / Page Not Found
      </div>
      <h1 className="text-2xl font-serif text-neutral-900 dark:text-neutral-100 font-normal">
        This page could not be located.
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
        The requested path does not exist on this edge-deployed static manifest.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-mono transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Overview</span>
        </Link>
      </div>
    </div>
  );
}
