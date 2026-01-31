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
  category: "frontend" | "fullstack" | "mobile" | "ai";
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
    title: "AI Chat Application",
    description:
      "A real-time chat application powered by OpenAI GPT-4 with conversation memory and multi-language support.",
    image: "/projects/chat-app.png",
    tags: ["Next.js", "OpenAI", "TypeScript", "Tailwind"],
    category: "ai",
    github: "https://github.com/VedMP",
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
    category: "fullstack",
    github: "https://github.com/VedMP",
    featured: true,
  },
  {
    id: "3",
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio website built with Next.js and Framer Motion animations.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "Framer Motion", "TailwindCSS"],
    category: "frontend",
    github: "https://github.com/VedMP",
    live: "https://vedpatel.dev",
    featured: true,
  },
];
