import {
  PERSONAL_INFO,
  PROJECTS,
  EXPERIENCES,
  SKILL_GROUPS,
  CERTIFICATES,
} from "@/core/data";

export default function PrintResumeView() {
  return (
    <div className="print-only p-8 text-black bg-white max-w-4xl mx-auto font-sans leading-normal">
      {/* Resume Header */}
      <div className="text-center pb-3 mb-4 border-b-2 border-black">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">
          {PERSONAL_INFO.name}
        </h1>
        <div className="text-xs space-x-2">
          <span>{PERSONAL_INFO.shortLocation}</span>
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
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
          Education
        </h2>
        {EXPERIENCES.filter((e) => e.type === "education").map((edu) => (
          <div key={edu.id} className="text-xs mb-2">
            <div className="flex justify-between items-baseline font-bold">
              <span>{edu.institution} — {edu.location}</span>
              <span>{edu.period}</span>
            </div>
            <div className="flex justify-between items-baseline italic">
              <span>{edu.title}</span>
              <span className="font-bold not-italic">
                {PERSONAL_INFO.gpa} GPA ({PERSONAL_INFO.academicStanding})
              </span>
            </div>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              {edu.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Technical Skills */}
      <section className="mb-4">
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
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
          Technical Projects &amp; Systems Architecture
        </h2>
        <div className="space-y-2.5 text-xs">
          {PROJECTS.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline font-bold">
                <span>
                  {proj.title} | {proj.subtitle}
                </span>
                <span className="font-normal font-mono">
                  {proj.tags.slice(0, 4).join(" • ")} ({proj.year})
                </span>
              </div>
              <p className="mt-0.5">{proj.solution}</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {proj.architecture.keyDecisions.slice(0, 2).map((decision, i) => (
                  <li key={i}>{decision}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
          Certificates
        </h2>
        <ul className="list-disc list-inside text-xs space-y-0.5">
          {CERTIFICATES.map((cert) => (
            <li key={cert.title}>
              <strong>{cert.title}</strong> ({cert.issuer}) — {cert.year}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
