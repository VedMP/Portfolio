"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Copy,
  Check,
  FileText,
  Download,
  Phone,
  MapPin,
  UserCheck,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { PERSONAL_INFO } from "@/core/data";
import { useToast } from "@/components/ui/Toast";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
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
      `NOTE:Honours CS student (${PERSONAL_INFO.gpa} GPA). RAG, Multi-Agent Systems & C++.`,
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
        toast("Message sent successfully");
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          data.error || "Unable to send message right now. Please email directly."
        );
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Edge API unreachable in local preview — please email vedmpatel2005@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-14 scroll-mt-8">
      <div className="space-y-8">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent font-semibold mb-1.5">
            Direct Contact
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.45rem] leading-[1.08] font-normal text-foreground">
            Let&apos;s talk about 2026–2027 roles.
          </h2>
          <p className="mt-2 text-sm text-muted max-w-2xl leading-relaxed">
            Actively seeking Software Engineering, Backend, Systems, and Applied AI internships or co-op terms. Fast responses by email or LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left: Coordinates & Quick Downloads */}
          <div className="xl:col-span-5 space-y-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-3.5">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">
                  Email
                </div>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-background border border-border">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-foreground hover:text-accent transition-colors truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-1 rounded text-muted hover:text-foreground cursor-pointer shrink-0"
                    aria-label="Copy email address"
                    title="Copy email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">
                  Phone
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-background border border-border text-foreground hover:border-border-strong transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">
                  Location
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-background border border-border text-muted">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <a
                  href={PERSONAL_INFO.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile px-3 py-2 justify-start"
                >
                  <Download className="w-3.5 h-3.5 text-accent" />
                  <span>Download Resume (PDF)</span>
                </a>
                <a
                  href={PERSONAL_INFO.transcriptPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile px-3 py-2 justify-start"
                >
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Transcript ({PERSONAL_INFO.gpa} GPA)</span>
                </a>
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="btn-tactile px-3 py-2 justify-start"
                >
                  <UserCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Save Contact Card (.vcf)</span>
                </button>
              </div>

              <div className="pt-2 border-t border-border flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-background text-muted hover:text-foreground hover:border-border-strong transition-colors"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.githubAcademic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-border bg-background text-muted hover:text-foreground hover:border-border-strong transition-colors text-[11px]"
                >
                  Academic GH
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-background text-muted hover:text-foreground hover:border-border-strong transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-lg border border-border bg-background text-muted hover:text-foreground hover:border-border-strong transition-colors"
                  aria-label="Direct email"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Serverless Edge Contact Form */}
          <div className="xl:col-span-7 p-6 sm:p-7 rounded-2xl bg-surface border border-border">
            <h3 className="font-serif text-2xl font-normal text-foreground">
              Send a Direct Note
            </h3>
            <p className="font-mono text-[11px] text-subtle mt-1 mb-5">
              Handled via Cloudflare Pages Function (/api/contact) with origin &amp; honeypot validation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company-fax">Fax</label>
                <input
                  id="company-fax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) =>
                    setFormData({ ...formData, honeypot: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[11px] text-muted mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    minLength={2}
                    placeholder="Alex Chen"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[11px] text-muted mb-1.5"
                  >
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-[11px] text-muted mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Hi Ved, reaching out regarding a 2026/2027 SWE or Applied AI internship..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <div
                  role="status"
                  className="p-3.5 rounded-lg bg-surface-subtle border border-accent font-mono text-xs text-foreground"
                >
                  Message received securely. Thank you — Ved will respond shortly.
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  role="alert"
                  className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/40 font-mono text-xs text-foreground"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-tactile-accent w-full py-3 px-4 text-xs font-mono disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
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
      </div>
    </section>
  );
}
