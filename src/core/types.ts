/**
 * @file types.ts
 * @description Core TypeScript contracts and schemas for Ved Patel's portfolio.
 * Strictly adheres to verified ground-truth academic and project records.
 */

export type ProjectCategory = "AI & Systems" | "Systems & C++" | "Full Stack & Edge";

export interface ProjectArchitectureSpec {
  pipeline: string[];
  keyDecisions: string[];
  modelsOrEmbeddings?: string[];
  vectorStore?: string;
  backendFramework?: string;
}

export interface ProjectTradeoff {
  decision: string;
  rationale: string;
  alternativeConsidered: string;
}

export interface ProjectCodeSnippet {
  title: string;
  language: string;
  code: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  year: string;
  title: string;
  subtitle: string;
  context: string;
  problem: string;
  solution: string;
  architecture: ProjectArchitectureSpec;
  tags: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
  visualType?: "image" | "cpp-memory" | "edge-topology";
  codeSnippet?: ProjectCodeSnippet;
  tradeoffs?: ProjectTradeoff[];
  metrics?: ProjectMetric[];
}

export type ExperienceType = "education" | "hackathon" | "simulation" | "work";

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  title: string;
  institution: string;
  institutionUrl: string;
  location: string;
  period: string;
  highlights: string[];
  skills: string[];
  metrics?: string;
}

export interface CourseItem {
  code: string;
  name: string;
  grade: string;
  term: string;
  highlight?: boolean;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
}

export interface SkillGroup {
  name: string;
  description: string;
  skills: string[];
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}
