import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_GROUPS } from "@/core/data";

export default function PrintResumeView() {
  return (
    <div className="print-only p-8 text-black bg-white max-w-4xl mx-auto font-sans leading-normal">
      {/* Resume Header */}
      <div className="text-center pb-4 mb-4 border-b-2 border-black">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">
          {PERSONAL_INFO.name}
        </h1>
        <div className="text-xs space-x-2">
          <span>{PERSONAL_INFO.location}</span>
          <span>•</span>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-black no-underline">
            {PERSONAL_INFO.email}
          </a>
          <span>•</span>
          <span>{PERSONAL_INFO.phone}</span>
        </div>
        <div className="text-xs space-x-2 mt-1">
          <a href="https://vedmpatel.me" className="text-black">vedmpatel.me</a>
          <span>•</span>
          <a href={PERSONAL_INFO.socials.github} className="text-black">github.com/VedMP</a>
          <span>•</span>
          <a href={PERSONAL_INFO.socials.linkedin} className="text-black">linkedin.com/in/ved-patel-cs</a>
        </div>
      </div>

      {/* Education */}
      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
          Education
        </h2>
        {EXPERIENCES.filter((e) => e.type === "education").map((edu) => (
          <div key={edu.id} className="text-xs mb-2">
            <div className="flex justify-between items-baseline font-bold">
              <span>{edu.institution} — Oshawa, ON</span>
              <span>{edu.period}</span>
            </div>
            <div className="flex justify-between items-baseline italic text-slate-800">
              <span>{edu.title}</span>
              <span className="font-bold text-black">{edu.metrics} ({PERSONAL_INFO.academicStanding})</span>
            </div>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-900">
              {edu.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Technical Skills */}
      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
          Technical Skills
        </h2>
        <div className="text-xs space-y-1">
          {SKILL_GROUPS.map((group) => (
            <div key={group.name} className="flex">
              <span className="font-bold w-44 shrink-0">{group.name}:</span>
              <span>{group.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Projects */}
      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
          Technical Projects &amp; Systems Architecture
        </h2>
        <div className="space-y-3 text-xs">
          {PROJECTS.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline font-bold">
                <span>{proj.title} | {proj.subtitle}</span>
                <span className="font-normal font-mono">{proj.tags.slice(0, 4).join(" • ")}</span>
              </div>
              <p className="mt-0.5 text-slate-800">{proj.solution}</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-900">
                {proj.architecture.keyDecisions.map((decision, i) => (
                  <li key={i}>{decision}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Hackathons & Experience */}
      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
          Hackathon &amp; Leadership Experience
        </h2>
        {EXPERIENCES.filter((e) => e.type === "hackathon").map((exp) => (
          <div key={exp.id} className="text-xs mb-2">
            <div className="flex justify-between items-baseline font-bold">
              <span>{exp.title} — {exp.institution}</span>
              <span>{exp.period}</span>
            </div>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-900">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
