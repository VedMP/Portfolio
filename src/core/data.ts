/**
 * @file data.ts
 * @description Centralized, factually verified data repository for Ved Patel.
 * 100% aligned with official Resume & Ontario Tech University Transcript:
 * - Cumulative GPA: 3.97 / 4.3 (75 earned credit hours)
 * - President's List (Fall 2023, Winter 2024, Fall 2024, Winter 2025) & Dean's List (Fall 2025)
 * - Smart Document Assistant (IBM Capstone — 1000-char chunks, 100-char overlap)
 * - Polyglot Tutor (HackHive 2026 — 18 languages, 36-hour sprint)
 * - Electronic Arts Software Engineering Job Simulation (Forage, Oct 2025 — C++, UML, Memory Optimization)
 * - vedmpatel.me Edge Architecture (Next.js 16 Static Export + Cloudflare Pages V8 Functions)
 * - IBM Generative AI Engineering Professional Certificate (Coursera / IBM, 2026)
 */

import {
  Project,
  ExperienceItem,
  SkillGroup,
  CourseItem,
  CertificateItem,
} from "./types";

export const PERSONAL_INFO = {
  name: "Ved Patel",
  fullName: "Ved M. Patel",
  role: "CS & Applied AI Systems",
  headline: "Honours Computer Science @ Ontario Tech · Systems & Applied AI",
  subheadline:
    "Honours Computer Science student at Ontario Tech University (3.97/4.3 GPA) building grounded retrieval systems, multi-agent backends, and memory-conscious C++ and web software.",
  bioDetail:
    "My coursework sits close to the metal—A+ marks in Systems Programming, Computer Architecture, Data Structures, and Software Design—and my builds apply that same discipline to generative AI: semantic PDF retrieval with IBM watsonx.ai & ChromaDB, an 18-language multi-agent tutor built in 36 hours, and C++ memory optimization for an EA Sports simulation.",
  location: "Scarborough / Oshawa, ON, Canada",
  shortLocation: "Scarborough / GTA, ON",
  institution: "Ontario Tech University",
  degree: "Honours Bachelor of Science in Computer Science",
  gpa: "3.97 / 4.3",
  academicStanding: "4× President's List (2023–25) · Dean's List (Fall 2025)",
  availability: "Seeking 2026–27 SWE / AI Co-op",
  graduation: "April 2027",
  email: "vedmpatel2005@gmail.com",
  phone: "+1 (647) 771-7973",
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
    number: "01",
    year: "2026",
    title: "Smart Document Assistant",
    subtitle: "IBM Generative AI Engineering Capstone",
    context:
      "Capstone engineering build for the IBM Generative AI Engineering Professional Certificate.",
    problem:
      "Long technical PDFs contain dense, proprietary definitions that off-the-shelf LLMs routinely fabricate or misquote when queried directly without grounded document retrieval.",
    solution:
      "Engineered a Retrieval-Augmented Generation (RAG) Q&A workbench using LangChain, IBM Slate-125m embeddings, local ChromaDB vector persistence, and watsonx.ai Granite-3.2-8b-instruct behind an interactive Gradio UI.",
    architecture: {
      pipeline: [
        "Real-time PDF upload and text extraction in Gradio",
        "LangChain RecursiveCharacterTextSplitter (1000-character chunks, 100-character overlap)",
        "Dense vector embedding via IBM Slate-125m-English",
        "Local ChromaDB persistent vector indexing & semantic similarity search",
        "Constrained grounding prompt injection with Granite-3.2-8b-instruct",
      ],
      keyDecisions: [
        "1000-character chunking with 100-character overlap preserves cross-sentence definitions without diluting vector similarity",
        "Local ChromaDB persistence keeps proprietary PDFs on-disk and eliminates third-party vector SaaS egress",
        "Explicit grounding prompt templates constrain Granite-3.2-8b-instruct to answer strictly from retrieved passages",
      ],
      modelsOrEmbeddings: [
        "granite-3-2-8b-instruct (IBM watsonx.ai)",
        "slate-125m-english (IBM watsonx.ai)",
      ],
      vectorStore: "ChromaDB",
      backendFramework: "Python / LangChain / Gradio",
    },
    tradeoffs: [
      {
        decision: "Local ChromaDB persistence over managed cloud vector DBs",
        rationale:
          "Removes network egress overhead and API billing while keeping uploaded user documents strictly local during inference.",
        alternativeConsidered:
          "Hosted vector services (Pinecone / Weaviate) introducing external storage latency and vendor setup.",
      },
      {
        decision: "1000-char chunks with 100-char overlap over fixed unpadded splits",
        rationale:
          "Prevents technical concepts and equations from getting severed mid-sentence at chunk boundaries.",
        alternativeConsidered:
          "Small 256-char splits (fragmented context) or whole-page chunks (noisy cosine matches).",
      },
    ],
    metrics: [
      { label: "Chunk Window", value: "1000 / 100", detail: "Chars per chunk / overlap" },
      { label: "LLM + Embedder", value: "Granite + Slate", detail: "IBM watsonx.ai stack" },
      { label: "Vector Index", value: "ChromaDB", detail: "Local persistent store" },
    ],
    codeSnippet: {
      title: "LangChain Chunking, Slate-125m Embeddings & ChromaDB Retrieval",
      language: "python",
      description:
        "Document ingestion and grounded retrieval pipeline pairing IBM watsonx.ai Slate-125m embeddings with persistent ChromaDB storage.",
      code: `from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_ibm import WatsonxEmbeddings, WatsonxLLM

# Split PDF into 1000-char chunks with 100-char overlap for context retention
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=100,
)
chunks = splitter.split_documents(pdf_documents)

# IBM Slate-125m dense embeddings + local ChromaDB vector store
embeddings = WatsonxEmbeddings(
    model_id="ibm/slate-125m-english-rtrvr",
    url="https://us-south.ml.cloud.ibm.com",
    project_id=WATSONX_PROJECT_ID,
)
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
)`,
    },
    tags: ["Python", "LangChain", "IBM watsonx.ai", "ChromaDB", "Gradio", "RAG"],
    category: "AI & Systems",
    githubUrl:
      "https://github.com/VedMP/IBM-Generative-AI-Engineering-Capstone-Project-Ved-Patel",
    featured: true,
    image: "/projects/QA_bot.png",
    visualType: "image",
  },
  {
    id: "polyglot-tutor",
    slug: "polyglot-tutor",
    number: "02",
    year: "Jan 2026",
    title: "Polyglot Tutor",
    subtitle: "HackHive 2026 · 36-Hour Hackathon MVP",
    context:
      "Built during HackHive 2026 hosted by the Ontario Tech University Computer Science Club.",
    problem:
      "Single-pass AI language tutors frequently drift in grammar accuracy or target proficiency level, while hardcoded SDK calls couple application routes tightly to one model vendor.",
    solution:
      "Architected the Python Flask backend and LLM orchestration layer for a language learning platform supporting 18 languages. Paired an Abstract Base Class provider layer with a two-stage Teacher–TA LangChain verification loop to audit lessons before client delivery.",
    architecture: {
      pipeline: [
        "React client submits target language (1 of 18), proficiency level, and topic",
        "Flask REST API validates and sanitizes request parameters",
        "Python ABC provider interface dispatches to OpenAI or Gemini drivers",
        "Primary Teacher agent drafts structured drills and dialogue",
        "Secondary LangChain TA auditor checks grammar and level alignment before emission",
      ],
      keyDecisions: [
        "Python Abstract Base Classes decouple curriculum prompts from vendor-specific OpenAI and Gemini SDKs",
        "Two-agent Teacher–TA verification loop catches grammar slips before responses reach the learner",
        "Lightweight Flask REST routes enabled shipping a complete 18-language MVP inside a 36-hour hackathon sprint",
      ],
      modelsOrEmbeddings: ["OpenAI API", "Gemini API", "LangChain Orchestration"],
      backendFramework: "Python / Flask",
    },
    tradeoffs: [
      {
        decision: "Dual-agent Teacher–TA audit over single-prompt self-check",
        rationale:
          "Separating lesson generation from grammatical verification reduces confirmation bias and level drift.",
        alternativeConsidered:
          "Single-pass prompt generation (faster latency, but noticeably higher grammatical error rate).",
      },
      {
        decision: "Abstract Base Class (abc.ABC) provider layer",
        rationale:
          "Allowed hot-swapping between OpenAI and Gemini mid-hackathon when rate limits spiked without refactoring routes.",
        alternativeConsidered:
          "Direct vendor SDK calls embedded inside Flask endpoints.",
      },
    ],
    metrics: [
      { label: "Languages", value: "18", detail: "LLM-orchestrated lesson tracks" },
      { label: "Build Sprint", value: "36 Hours", detail: "HackHive 2026 MVP" },
      { label: "Verification", value: "2-Agent", detail: "Teacher + TA audit loop" },
    ],
    codeSnippet: {
      title: "Provider ABC & Teacher–TA Verification Loop",
      language: "python",
      description:
        "Decoupled LLM provider contract enabling runtime failover alongside autonomous lesson verification.",
      code: `from abc import ABC, abstractmethod

class BaseLLMProvider(ABC):
    """Unified interface decoupling prompts from vendor SDKs."""
    @abstractmethod
    def generate_lesson(self, lang: str, level: str, topic: str) -> dict:
        pass

class VerificationLoop:
    def __init__(self, teacher: BaseLLMProvider, ta_auditor: BaseLLMProvider):
        self.teacher = teacher
        self.ta_auditor = ta_auditor

    def run(self, lang: str, level: str, topic: str) -> dict:
        draft = self.teacher.generate_lesson(lang, level, topic)
        audit = self.ta_auditor.audit_grammar_and_level(draft, level)
        if not audit.get("passed"):
            return self.teacher.revise(draft, audit.get("feedback", ""))
        return draft`,
    },
    tags: [
      "Python",
      "Flask",
      "LangChain",
      "OpenAI API",
      "Gemini API",
      "REST APIs",
      "React",
    ],
    category: "AI & Systems",
    githubUrl: "https://github.com/PolygotTutor/PolyglotTutor/tree/develop",
    featured: true,
    image: "/projects/Polyglot_Tutor.png",
    visualType: "image",
  },
  {
    id: "ea-sports-simulation",
    slug: "ea-sports-simulation",
    number: "03",
    year: "Oct 2025",
    title: "EA Sports C++ Feature & Memory Optimization",
    subtitle: "Electronic Arts Software Engineering Simulation (Forage)",
    context:
      "Completed the EA Sports College Football engineering job simulation focused on C++ architecture, UML modeling, and codebase memory efficiency.",
    problem:
      "Large game subsystems accumulate redundant heap allocations, fragmented object layouts, and unclear class inheritance boundaries that degrade frame stability and maintainability.",
    solution:
      "Authored a technical feature proposal and UML class diagram modeling entity relationships and inheritance hierarchies, then audited and refactored the C++ codebase to replace inefficient collections with tighter, cache-friendly data structures.",
    architecture: {
      pipeline: [
        "Requirements analysis & technical feature specification for College Football subsystem",
        "UML class diagram modeling inheritance, composition, and ownership boundaries",
        "C++ feature implementation aligned with existing engine interfaces",
        "Memory profiling to pinpoint redundant allocations and layout inefficiencies",
        "Data structure refactoring with contiguous storage and explicit capacity reservation",
      ],
      keyDecisions: [
        "Designed UML ownership contracts before writing C++ headers to avoid tangled inheritance trees",
        "Replaced scattered heap allocations with contiguous structs and pre-reserved vectors to reduce memory churn",
        "Validated changes with disciplined Git branching and incremental diff reviews",
      ],
      backendFramework: "C++ / UML / Git",
    },
    tradeoffs: [
      {
        decision: "Contiguous value-type storage over pointer-heavy linked structures",
        rationale:
          "Eliminates pointer chasing and improves CPU cache locality during per-frame roster and attribute traversals.",
        alternativeConsidered:
          "Dynamic pointer lists allowing O(1) mid-list splice at the expense of severe cache misses.",
      },
      {
        decision: "Explicit composition over deep multi-level inheritance",
        rationale:
          "Keeps player and feature behaviors modular in UML without introducing fragile base-class coupling.",
        alternativeConsidered:
          "Monolithic base entity hierarchy combining unrelated game behaviors.",
      },
    ],
    metrics: [
      { label: "Language", value: "C++", detail: "Systems & OOP feature build" },
      { label: "Design Spec", value: "UML", detail: "Class & inheritance modeling" },
      { label: "Optimization", value: "Memory", detail: "Tighter data structures" },
    ],
    codeSnippet: {
      title: "Contiguous C++ Entity Layout & Capacity Reservation",
      language: "cpp",
      description:
        "Tightly packed struct layout and explicit vector reservation pattern minimizing heap fragmentation and mid-frame reallocations.",
      code: `#include <cstdint>
#include <vector>

struct PlayerAttributeBlock {
    uint32_t player_id;
    float    speed_rating;
    float    stamina_ratio;
    uint16_t position_code;
    uint16_t status_flags;
};

class RosterBuffer {
public:
    explicit RosterBuffer(std::size_t expected_players) {
        entries_.reserve(expected_players); // Prevent repeated reallocations
    }

    void emplace_player(uint32_t id, float speed, float stamina, uint16_t pos) {
        entries_.push_back(PlayerAttributeBlock{id, speed, stamina, pos, 0});
    }

private:
    std::vector<PlayerAttributeBlock> entries_;
};`,
    },
    tags: ["C++", "UML", "Data Structures", "OOP", "Git"],
    category: "Systems & C++",
    githubUrl: "https://github.com/VedMP",
    featured: true,
    visualType: "cpp-memory",
  },
  {
    id: "portfolio-edge-architecture",
    slug: "portfolio-edge-architecture",
    number: "04",
    year: "2026",
    title: "vedmpatel.me Edge Architecture",
    subtitle: "Cloudflare Pages · Next.js 16 Static Export & V8 Functions",
    context:
      "Production personal engineering site engineered for fast global delivery, strict browser security policies, and zero third-party tracking bloat.",
    problem:
      "Typical student portfolios ship bloated client bundles with broken mobile layouts, unhardened headers, and third-party form widgets that leak recruiter data.",
    solution:
      "Built a statically exported Next.js 16 + React 19 application deployed on Cloudflare Pages with a custom V8 Edge Function (/api/contact), hardened CSP/HSTS/COOP/COEP headers, self-hosted typography, and a print-optimized single-page ATS resume stylesheet.",
    architecture: {
      pipeline: [
        "Next.js 16 static export (output: export) with React Compiler optimizations",
        "Self-hosted Google Fonts bundled cleanly under strict font-src 'self' CSP",
        "Cloudflare Pages global CDN with hardened _headers (HSTS, CSP, COOP, COEP)",
        "Serverless Cloudflare Pages Function (/functions/api/contact.ts) on V8 isolates",
        "Origin allowlisting, 10 KB payload cap, control-char stripping, and honeypot filtering",
      ],
      keyDecisions: [
        "Static export + Edge Function achieves near-instant CDN delivery without maintaining an always-on Node server",
        "Zero-dependency honeypot + strict RFC input bounds stop automated spam without invasive CAPTCHA widgets",
        "Dedicated @media print ATS stylesheet generates a clean black-and-white resume straight from the browser",
      ],
      backendFramework: "Cloudflare Pages Functions (V8 Edge Runtime)",
    },
    tradeoffs: [
      {
        decision: "Static export + Cloudflare V8 Edge Function over full SSR",
        rationale:
          "Zero server maintenance, instant global caching, and isolated serverless intake strictly where dynamic POST handling is needed.",
        alternativeConsidered:
          "Always-on SSR server adding cold starts and hosting overhead for mostly static portfolio content.",
      },
      {
        decision: "Honeypot + origin validation over third-party CAPTCHA scripts",
        rationale:
          "Preserves privacy, keeps strict CSP clean, and avoids third-party JS bloat on the contact page.",
        alternativeConsidered:
          "Embedded external CAPTCHA iframes degrading load speed and UX.",
      },
    ],
    metrics: [
      { label: "Delivery", value: "Static + V8", detail: "Cloudflare Pages Edge" },
      { label: "Headers", value: "CSP + HSTS", detail: "COOP / COEP / Nosniff" },
      { label: "Trackers", value: "Zero", detail: "Self-hosted fonts & honeypot" },
    ],
    codeSnippet: {
      title: "Hardened Cloudflare Pages Edge Intake (/api/contact)",
      language: "typescript",
      description:
        "V8 Edge Function enforcing origin allowlists, 10 KB payload bounds, control-character sanitization, and silent honeypot filtering.",
      code: `export async function onRequestPost(context: { request: Request }) {
  const origin = context.request.headers.get("origin");
  if (origin && !isOriginAllowed(origin)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }

  const contentLength = parseInt(context.request.headers.get("content-length") || "0", 10);
  if (contentLength > 10240) {
    return new Response(JSON.stringify({ error: "Payload exceeds 10 KB" }), { status: 413 });
  }

  const body = await context.request.json();
  if (body.honeypot?.trim()) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  return validateAndAcknowledge(body, origin);
}`,
    },
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Cloudflare Pages",
      "Edge Functions",
    ],
    category: "Full Stack & Edge",
    githubUrl: "https://github.com/VedMP/Portfolio",
    liveUrl: "https://vedmpatel.me",
    featured: true,
    image: "/projects/Portfolio.png",
    visualType: "edge-topology",
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
    metrics: "3.97 / 4.3 GPA · 4× President's List · Dean's List",
    highlights: [
      "Earned President's List honours across four consecutive semesters (Fall 2023 – Winter 2025) and Dean's List standing in Fall 2025 across 75 earned credit hours.",
      "Achieved A+ grades in Systems Programming, Data Structures, Computer Architecture I, Software Design & Analysis, Software Systems Dev. & Integration, and Scientific Data Analysis.",
      "Completed upper-year studies in Analysis & Design of Algorithms (A-), Computer Graphics & Visualization (A), Database Systems, Software Quality Assurance, and Web Development.",
    ],
    skills: [
      "Python",
      "C++",
      "Java",
      "SQL",
      "Systems Programming",
      "Data Structures",
      "Algorithms",
      "SQA",
    ],
  },
  {
    id: "hackhive-2026",
    type: "hackathon",
    title: "Backend & AI Orchestration Engineer — HackHive 2026",
    institution: "Ontario Tech University CS Club",
    institutionUrl: "https://www.otucsclub.dev/",
    location: "Oshawa, ON, Canada",
    period: "January 2026 · 36-Hour Sprint",
    metrics: "18 Languages · 36-Hour MVP",
    highlights: [
      "Architected the Python Flask backend for Polyglot Tutor, generating interactive language lessons across 18 languages via structured LLM orchestration.",
      "Implemented an Abstract Base Class provider interface and a two-agent Teacher–TA verification loop to decouple model vendors and catch grammatical drift.",
      "Integrated external REST APIs for real-time learner feedback loops and shipped a working end-to-end MVP within 36 hours.",
    ],
    skills: ["Python", "Flask", "LangChain", "OpenAI API", "Gemini API", "REST APIs", "Git"],
  },
  {
    id: "ea-simulation-2025",
    type: "simulation",
    title: "Software Engineering Job Simulation (EA Sports College Football)",
    institution: "Electronic Arts (via Forage)",
    institutionUrl: "https://www.theforage.com/",
    location: "Remote · Technical Track",
    period: "October 2025",
    metrics: "C++ · UML · Memory Optimization",
    highlights: [
      "Authored a structured feature proposal and technical UML class diagram modeling game entity relationships, composition, and inheritance.",
      "Implemented C++ feature extensions following object-oriented engineering guidelines established by the EA Sports College Football team.",
      "Audited the codebase for memory inefficiencies and refactored underlying data structures to reduce unnecessary allocations.",
    ],
    skills: ["C++", "UML", "OOP", "Data Structures", "Memory Optimization", "Git"],
  },
];

export const VERIFIED_COURSEWORK: CourseItem[] = [
  { code: "CSCI 3310U", name: "Systems Programming", grade: "A+", term: "Fall 2025", highlight: true },
  { code: "CSCI 2010U", name: "Data Structures", grade: "A+", term: "Fall 2024", highlight: true },
  { code: "CSCI 2050U", name: "Computer Architecture I", grade: "A+", term: "Winter 2024", highlight: true },
  { code: "CSCI 2040U", name: "Software Design & Analysis", grade: "A+", term: "Winter 2025", highlight: true },
  { code: "CSCI 2020U", name: "Software Systems Dev. & Integration", grade: "A+", term: "Winter 2025", highlight: true },
  { code: "CSCI 2000U", name: "Scientific Data Analysis", grade: "A+", term: "Fall 2024", highlight: true },
  { code: "CSCI 3090U", name: "Computer Graphics & Visualization", grade: "A", term: "Fall 2025" },
  { code: "CSCI 3070U", name: "Analysis & Design of Algorithms", grade: "A-", term: "Fall 2025" },
  { code: "CSCI 3060U", name: "Software Quality Assurance", grade: "Winter 2026", term: "Winter 2026" },
  { code: "CSCI 3230U", name: "Web Development", grade: "Winter 2026", term: "Winter 2026" },
  { code: "CSCI 3030U", name: "Database Systems & Concepts", grade: "B", term: "Fall 2025" },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    title: "IBM Generative AI Engineering Professional Certificate",
    issuer: "IBM / Coursera",
    year: "2026",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Languages",
    description: "Systems, backend, querying, and strict frontend development.",
    skills: ["Python", "C++", "Java", "TypeScript", "SQL", "JavaScript", "HTML/CSS"],
  },
  {
    name: "AI & Data Engineering",
    description: "RAG architectures, vector indexing, LLM orchestration, and scientific Python.",
    skills: [
      "LangChain",
      "IBM watsonx.ai",
      "ChromaDB",
      "OpenAI API",
      "Gemini API",
      "RAG",
      "NumPy",
      "Pandas",
      "Scikit-learn",
    ],
  },
  {
    name: "Web & API Frameworks",
    description: "Production React/Next.js frontends and lightweight Python REST services.",
    skills: ["Next.js 16", "React 19", "Flask", "Gradio", "Tailwind CSS v4", "REST APIs"],
  },
  {
    name: "Systems & Tooling",
    description: "Version control, Linux workflows, modeling, and edge deployment.",
    skills: [
      "Linux",
      "Git",
      "GitHub",
      "Cloudflare Pages",
      "Edge Functions",
      "UML",
      "Docker",
      "PostgreSQL",
    ],
  },
];
