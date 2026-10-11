import Link from "next/link";
import Contact from "@/components/features/Contact";

export default function ContactPage() {
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
      <Contact />
    </div>
  );
}
