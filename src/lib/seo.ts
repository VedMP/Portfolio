/**
 * @file seo.ts
 * @description Generates structured JSON-LD Schema.org data for high search engine discoverability.
 * Complies strictly with Google Search Central guidelines for Person, WebSite, and SoftwareSourceCode schemas.
 */

import { PERSONAL_INFO, PROJECTS } from "@/core/data";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://vedmpatel.me/#person",
    name: PERSONAL_INFO.name,
    url: "https://vedmpatel.me",
    jobTitle: "AI Systems & Software Engineer",
    description: PERSONAL_INFO.subheadline,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: PERSONAL_INFO.institution,
      url: "https://ontariotechu.ca",
    },
    knowsAbout: [
      "Retrieval-Augmented Generation (RAG)",
      "Multi-Agent Systems",
      "Vector Databases",
      "LangChain",
      "ChromaDB",
      "IBM watsonx.ai",
      "Next.js",
      "TypeScript",
      "Python",
    ],
    sameAs: [
      PERSONAL_INFO.socials.github,
      PERSONAL_INFO.socials.githubAcademic,
      PERSONAL_INFO.socials.linkedin,
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://vedmpatel.me/#website",
    url: "https://vedmpatel.me",
    name: "Ved Patel | AI Systems & Generative Engineering",
    description: PERSONAL_INFO.subheadline,
    author: {
      "@id": "https://vedmpatel.me/#person",
    },
    inLanguage: "en-US",
  };
}

export function generateProjectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PROJECTS.map((proj, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: proj.title,
        description: proj.solution,
        codeRepository: proj.githubUrl,
        programmingLanguage: proj.tags.join(", "),
        author: {
          "@id": "https://vedmpatel.me/#person",
        },
      },
    })),
  };
}
