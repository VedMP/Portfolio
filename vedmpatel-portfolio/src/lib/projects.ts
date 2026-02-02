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
  category: "Frontend" | "Fullstack" | "Mobile" | "AI";
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
    image: "/projects/chat-app.png",
    tags: ["IBM watsonx.ai", "Python", "Gradio", "LangChain"],
    category: "AI",
    github: "https://github.com/VedMP/Smart-Document-Assistant",
    live: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payment processing, inventory management, and analytics dashboard.",
    image: "/projects/ecommerce.png",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "Fullstack",
    github: "https://github.com/VedMP",
    featured: true,
  },
  {
    id: "3",
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio website built with Next.js and Framer Motion animations. Utilzing Claude AI for code generation and design ideas.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "Claude AI"],
    category: "Frontend",
    github: "https://github.com/VedMP/Portfolio",
    live: "https://vedpatel.dev",
    featured: true,
  },
];
