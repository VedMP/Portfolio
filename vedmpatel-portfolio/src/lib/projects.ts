/**
 * @file projects.ts
 * @description Projects data for the portfolio.
 * Contains featured projects with their details, tags, and links.
 */

/**
 * Project interface
 * Represents a portfolio project item
 */
export interface Project {
  /** Unique identifier */
  id: string;
  /** Project title */
  title: string;
  /** Brief description of the project */
  description: string;
  /** Path to project thumbnail image */
  image: string;
  /** Technologies used in the project */
  tags: string[];
  /** Project category for filtering */
  category: "Frontend" | "Full Stack" | "AI";
  /** GitHub repository URL (optional) */
  github?: string;
  /** Live demo URL (optional) */
  live?: string;
  /** Whether to feature this project prominently */
  featured: boolean;
}

/**
 * Portfolio projects array
 * Contains all projects to display in the portfolio
 */
export const projects: Project[] = [
  {
    id: "1",
    title: "Smart Document Assistant",
    description:
      "A smart document assistant that can answer questions about documents. Using LangChain and ChromaDB to store and retrieve document information. Using IBM watsonx.ai granite-3-2-8b-instruct LLM and slate-125m-english embedding model.",
    image: "/projects/QA_bot.png",
    tags: ["IBM watsonx.ai", "Python", "Gradio", "LangChain"],
    category: "AI",
    github: "https://github.com/VedMP/Smart-Document-Assistant",
    live: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    title: "Polyglot Tutor | AI-Accelerated Hackathon Project",
    description:
      "An AI-powered language platform engineered with a Flask backend and a Multi-Agent Verification Pipeline. To ensure educational accuracy, a secondary LangChain agent acts as a 'Teaching Assistant' to strictly audit generated content before delivery. The system features a modular architecture using Abstract Base Classes to centralize context initialization, enabling seamless hot-swapping between OpenAI and Gemini models.",
    image: "",
    tags: ["Python", "Flask", "GitHub", "HTML", "CSS", "JavaScript", "React", "OpenAI API", "LangChain", "Gemini API"],
    category: "Full Stack",
    github: "https://github.com/PolygotTutor/PolyglotTutor/tree/develop",
    featured: true,
  },
  {
    id: "3",
    title: "Portfolio Website",
    description:
      "A high-performance personal portfolio engineered with Next.js and Framer Motion for fluid, responsive UX. Leveraged an AI-Native development workflow (Claude 3.5 Sonnet) to accelerate component prototyping and optimize Tailwind CSS implementation, demonstrating a modern approach to rapid frontend engineering.",
    image: "",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "Claude AI"],
    category: "Frontend",
    github: "https://github.com/VedMP/Portfolio",
    live: "https://vedmpatel.me",
    featured: true,
  },
];
