import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-lg p-6 rounded-2xl bg-[#090d16] border border-slate-800 text-slate-200 font-mono shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 border-b border-slate-800 pb-2">
          <Terminal className="w-4 h-4 text-rose-400" />
          <span>error 404: route_not_found</span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm mb-6">
          <p className="text-rose-400 font-semibold">
            Status: 404 Not Found
          </p>
          <p className="text-slate-400">
            The requested path does not match any route on the Cloudflare edge static manifest.
          </p>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <code>ved@edge:~$ navigate --target /</code>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-semibold text-xs hover:bg-sky-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Overview</span>
        </Link>
      </div>
    </div>
  );
}
