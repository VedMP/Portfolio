"use client";

import { useState } from "react";
import { Mail, Send, Copy, Check, FileText, Download, Phone, MapPin, UserCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { PERSONAL_INFO } from "@/core/data";
import { useToast } from "@/components/ui/Toast";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Failed to copy email", "error");
    }
  };

  const handleDownloadVCard = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${PERSONAL_INFO.name}`,
      `TITLE:${PERSONAL_INFO.headline}`,
      `ORG:${PERSONAL_INFO.institution}`,
      `EMAIL;TYPE=INTERNET,PREF:${PERSONAL_INFO.email}`,
      `TEL;TYPE=CELL:${PERSONAL_INFO.phone}`,
      `URL:https://vedmpatel.me`,
      `NOTE:Honours CS student (3.97 GPA). Specializing in RAG & Multi-Agent systems.`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ved_Patel_Contact.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast("Downloaded contact card (.vcf)");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
        toast("Message dispatched successfully");
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Unable to dispatch message at this time.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Could not reach edge API. Please contact directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-16 border-t border-neutral-200 dark:border-neutral-800">
      {/* Editorial Header */}
      <div className="mb-10">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
          05 / Inquiries
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900 dark:text-neutral-100 tracking-tight">
          Get In Touch
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Open to software engineering internships, co-op opportunities, and AI systems engineering discussions. Reach out directly or dispatch a note below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Coordinates */}
        <div className="md:col-span-5 space-y-5">
          <div className="space-y-3 text-xs font-mono">
            <div>
              <div className="text-neutral-400 uppercase tracking-wider mb-1">Direct Email</div>
              <div className="flex items-center justify-between p-2.5 rounded bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-900 dark:text-neutral-100 truncate mr-2 select-all">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="p-1 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <div className="text-neutral-400 uppercase tracking-wider mb-1">Phone</div>
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            <div>
              <div className="text-neutral-400 uppercase tracking-wider mb-1">Location</div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Downloads & Socials */}
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-xs font-mono">
            <div className="flex flex-col gap-1.5">
              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-neutral-400" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={PERSONAL_INFO.transcriptPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Official Transcript (3.97 GPA)</span>
              </a>

              <button
                onClick={handleDownloadVCard}
                className="inline-flex items-center gap-2 p-2 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 transition-colors text-left"
              >
                <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Download vCard (.vcf)</span>
              </button>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors"
                title="GitHub (Professional)"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.githubAcademic}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors"
                title="GitHub (Academic)"
                aria-label="GitHub Academic"
              >
                <span className="text-[11px] font-mono">Academic</span>
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors"
                title="Direct Email"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div className="md:col-span-7 p-6 rounded bg-neutral-100/40 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800">
          <h3 className="font-serif text-base text-neutral-900 dark:text-neutral-100 font-medium mb-1">
            Send a Message
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-4">
            Routed via serverless edge functions on Cloudflare Pages.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Anti-spam Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company-fax">Fax</label>
              <input
                id="company-fax"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex Chen"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500 font-sans transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500 font-sans transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Hi Ved, let's discuss an AI systems engineering role or project collaboration..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500 font-sans transition-colors resize-none"
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-3 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono text-neutral-900 dark:text-neutral-100">
                Message dispatched. Ved Patel will respond shortly.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 rounded bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-900 text-xs font-mono text-red-700 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium text-xs transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <span>Dispatching...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
