/**
 * @file data.ts
 * @description Centralized, factually verified data repository for Ved Patel.
 * Strictly maintains 100% ground truth:
 * - 3.97 GPA, Honours Computer Science @ Ontario Tech University
 * - 4-time President's / Dean's list recipient
 * - Smart Document Assistant (IBM Capstone)
 * - Polyglot Tutor (HackHive 2026 Hackathon)
 * - Systems Portfolio on Cloudflare Pages
 */

import { Project, ExperienceItem, SkillGroup } from "./types";

export const PERSONAL_INFO = {
  name: "Ved Patel",
  headline: "AI Systems & Generative Engineering | Honours CS @ Ontario Tech",
  subheadline:
    "Honours Computer Science student (3.97 GPA) specializing in Generative AI systems, RAG pipeline architecture, multi-agent verification workflows, and resilient edge systems.",
  location: "Oshawa / Greater Toronto Area, ON, Canada",
  institution: "Ontario Tech University",
  degree: "Honours Bachelor of Science in Computer Science",
  gpa: "3.97 / 4.0",
  academicStanding: "President's / Dean's List (4 Consecutive Terms)",
  graduation: "April 2027",
  email: "vedmpatel2005@gmail.com",
  phone: "+1 647-771-7973",
  resumePath: "/Ved_Patel_Resume.pdf",
  transcriptPath: "/Ved_Patel_Transcript.pdf",
  socials: {
    github: "https://github.com/VedMP",
    githubAcademic: "https://github.com/VedPatel169",
    linkedin: "https://www.linkedin.com/in/ved-patel-cs/",
  },
} as const;

export const PROJECTS: Project[] = [
  {
    id: "smart-document-assistant",
    slug: "smart-document-assistant",
    title: "Smart Document Assistant",
    subtitle: "IBM Generative AI Engineering Capstone Project",
    context:
      "Engineered as the capstone implementation for the IBM Generative AI Engineering Specialization.",
    problem:
      "Enterprise documents contain unstructured proprietary knowledge that off-the-shelf LLMs cannot accurately parse without hallucinating or referencing outdated external information.",
    solution:
      "Architected a dense vector Retrieval-Augmented Generation (RAG) assistant using LangChain and ChromaDB. Utilizes IBM watsonx.ai granite-3-2-8b-instruct LLM paired with slate-125m-english embedding model to perform context-grounded Q&A with zero hallucination escape.",
    architecture: {
      pipeline: [
        "Unstructured Document Chunking & Semantic Tokenization",
        "Dense Embedding Generation via IBM Slate-125m",
        "Vector Storage & Cosine Indexing in ChromaDB",
        "Context Injection & Strict Grounding Prompts via LangChain",
        "Granite-3-2-8b-instruct Inference & Source Provenance",
        "Gradio UI Execution Interface",
      ],
      keyDecisions: [
        "ChromaDB local vector persistence for low-latency retrieval without third-party API vector egress",
        "IBM slate-125m embeddings optimized for dense English technical documentation retrieval",
        "LangChain prompt templates with explicit citation provenance constraints",
      ],
      modelsOrEmbeddings: [
        "granite-3-2-8b-instruct (IBM watsonx.ai)",
        "slate-125m-english (IBM watsonx.ai)",
      ],
      vectorStore: "ChromaDB",
      backendFramework: "Python / LangChain / Gradio",
    },
    tags: ["IBM watsonx.ai", "Python", "LangChain", "ChromaDB", "Gradio", "RAG"],
    category: "AI & Systems",
    githubUrl:
      "https://github.com/VedMP/IBM-Generative-AI-Engineering-Capstone-Project-Ved-Patel",
    featured: true,
    image: "/projects/QA_bot.png",
  },
  {
    id: "polyglot-tutor",
    slug: "polyglot-tutor",
    title: "Polyglot Tutor",
    subtitle: "AI-Accelerated Hackathon Platform (HackHive 2026)",
    context:
      "Developed during the HackHive 2026 Hackathon hosted by the Ontario Tech University Computer Science Club.",
    problem:
      "Generative language learning assistants frequently produce unverified translations with grammatical hallucinations, while hardcoded provider integrations create brittle vendor lock-in.",
    solution:
      "Engineered a multilingual education platform powered by a Python Flask REST API and an automated Multi-Agent Verification Pipeline. Implemented a dual-agent Teacher-TA workflow where a primary instructor agent drafts learning modules and a secondary LangChain auditor validates grade-level accuracy before client transmission.",
    architecture: {
      pipeline: [
        "Client Request via Modular React Interface",
        "Flask RESTful Route Dispatch & Parameter Sanitization",
        "Abstract Base Class Provider Routing (OpenAI / Gemini)",
        "Primary Instructor Agent Curriculum Generation",
        "Secondary LangChain 'Teaching Assistant' Verification Loop",
        "Validated Payload Delivery with Confidence Audit",
      ],
      keyDecisions: [
        "Abstract Base Classes to standardize model initialization and decouple prompt context from specific provider SDKs",
        "Two-stage verification loop acting as an autonomous quality barrier for pedagogical correctness",
        "Lightweight Flask microservice architecture ensuring fast request dispatch during peak hackathon concurrency",
      ],
      modelsOrEmbeddings: ["OpenAI API", "Gemini API", "LangChain Orchestrator"],
      backendFramework: "Python / Flask",
    },
    tags: [
      "Python",
      "Flask",
      "LangChain",
      "Multi-Agent Systems",
      "OpenAI API",
      "Gemini API",
      "React",
    ],
    category: "AI & Systems",
    githubUrl: "https://github.com/PolygotTutor/PolyglotTutor/tree/develop",
    featured: true,
    image: "/projects/Polyglot_Tutor.png",
  },
  {
    id: "portfolio-edge-architecture",
    slug: "portfolio-edge-architecture",
    title: "Edge-Delivered Systems Portfolio",
    subtitle: "Cloudflare Pages & Next.js 16 High-Performance Architecture",
    context:
      "Architected as a production-grade, durable personal engineering system deployed to vedmpatel.me.",
    problem:
      "Standard portfolio templates rely on heavy client-side SPAs with high bundle weight, zero security hardening, and no serverless edge API capabilities.",
    solution:
      "Engineered a high-performance, statically exported Next.js 16 and React 19 application coupled with Cloudflare Pages Functions for serverless contact intake, strict Content Security Policies (CSP), and zero-layout-shift design tokens.",
    architecture: {
      pipeline: [
        "Next.js 16 Turbopack Static Export (output: export)",
        "Cloudflare Edge Network Global Caching & Sub-50ms TTFB",
        "Cloudflare Pages Functions (/functions/api/contact)",
        "Hardened HTTP Headers (HSTS, CSP, COOP, CORP, Nosniff)",
        "Semantic Feature Scopes & Strict TypeScript Data Contracts",
      ],
      keyDecisions: [
        "Decoupled static frontend from edge functions to achieve 100/100 performance scores without server hosting overhead",
        "Zero-stacking-context design tokens for GPU-smooth contrast and theme switching",
        "Strict TypeScript schemas enforcing factual data integrity across all UI surfaces",
      ],
      backendFramework: "Cloudflare Pages Functions (V8 Edge Runtime)",
    },
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Cloudflare Pages",
      "Edge Functions",
    ],
    category: "Full Stack",
    githubUrl: "https://github.com/VedMP/Portfolio",
    liveUrl: "https://vedmpatel.me",
    featured: true,
    image: "/projects/Portfolio.png",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "ontario-tech-cs",
    type: "education",
    title: "Honours Bachelor of Science in Computer Science",
    institution: "Ontario Tech University",
    institutionUrl: "https://ontariotechu.ca",
    location: "Oshawa, ON, Canada",
    period: "Sep 2023 – April 2027 (Expected)",
    metrics: "3.97 GPA / 4.0",
    highlights: [
      "4-time President's / Dean's List recipient for continuous academic excellence across all completed semesters.",
      "Rigorous coursework in Data Structures, Design & Analysis of Algorithms, Database Systems, Agile Methodologies, and Software Engineering Principles.",
      "Active participant in departmental engineering initiatives, hackathons, and technical projects.",
    ],
    skills: ["Java", "Python", "C++", "SQL", "PostgreSQL", "Data Structures", "Algorithms", "Git"],
  },
  {
    id: "hackhive-2026",
    type: "hackathon",
    title: "System Architect & Backend Engineer — HackHive 2026",
    institution: "Ontario Tech University CS Club",
    institutionUrl: "https://www.otucsclub.dev/",
    location: "Oshawa, ON, Canada",
    period: "January 23 – 25, 2026",
    metrics: "48-Hour Sprint",
    highlights: [
      "Architected the backend and AI orchestration layer for Polyglot Tutor, a multilingual educational platform built in 48 hours.",
      "Engineered an automated Multi-Agent Verification Pipeline using LangChain to enforce grade-level validation before response delivery.",
      "Utilized Abstract Base Classes in Python to decouple language learning prompts from underlying model APIs (OpenAI and Gemini).",
    ],
    skills: ["Python", "Flask", "LangChain", "OpenAI API", "Gemini API", "RESTful APIs", "Git"],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Languages",
    description: "Core programming languages used across systems, backend, and data pipelines.",
    skills: ["Python", "Java", "C++", "SQL", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    name: "AI & Generative Engineering",
    description: "Orchestration, RAG architectures, model interfaces, and deep learning libraries.",
    skills: [
      "LangChain",
      "ChromaDB (Vector DB)",
      "IBM watsonx.ai",
      "OpenAI API",
      "Gemini API",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "NumPy",
      "Pandas",
    ],
  },
  {
    name: "Systems, Tools & Infrastructure",
    description: "Development environments, containerization, edge deployment, and version control.",
    skills: [
      "Linux",
      "Docker",
      "Git",
      "GitHub",
      "Cloudflare Pages",
      "Cloudflare Functions",
      "PostgreSQL",
    ],
  },
  {
    name: "Web & API Frameworks",
    description: "Modern frameworks for building high-performance services and web interfaces.",
    skills: ["Next.js 16", "React 19", "Flask", "Gradio", "Tailwind CSS v4"],
  },
];
