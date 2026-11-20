import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 space-y-5">
      <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
        404 · Route Not Found
      </div>
      <h1 className="font-serif text-4xl font-normal text-foreground">
        This page isn&apos;t in the manifest.
      </h1>
      <p className="text-sm text-muted max-w-md leading-relaxed">
        The requested path doesn&apos;t exist on this Cloudflare Pages static build.
      </p>
      <div className="pt-2">
        <Link href="/" className="btn-tactile-accent px-4 py-2 text-xs font-mono">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Overview</span>
        </Link>
      </div>
    </div>
  );
}
