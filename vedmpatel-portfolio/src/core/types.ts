/**
 * @file types.ts
 * @description Core TypeScript contracts and schemas for Ved Patel's portfolio.
 * Strictly adheres to verified ground-truth data structures.
 */

export type ProjectCategory = "AI & Systems" | "Full Stack" | "Systems & Infrastructure";

export interface ProjectArchitectureSpec {
  pipeline: string[];
  keyDecisions: string[];
  modelsOrEmbeddings?: string[];
  vectorStore?: string;
  backendFramework?: string;
}

export interface Project {
  id: string;
  slug: string;
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
  image: string;
}

export type ExperienceType = "education" | "hackathon" | "work";

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

export interface EdgeTelemetry {
  colo: string;
  country: string;
  city?: string;
  asn?: number;
  httpProtocol?: string;
  tlsVersion?: string;
  timestamp: string;
}
