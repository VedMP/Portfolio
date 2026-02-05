/**
 * @file experience.ts
 * @description Experience and education data for the portfolio.
 * Contains work experience and educational background information.
 */

/**
 * Experience entry interface
 * Represents a work experience or education item
 */
export interface Experience {
  /** Unique identifier */
  id: string;
  /** Type of experience: work, education, or hackathon */
  type: "work" | "education" | "hackathon";
  /** Job title or degree name */
  role: string;
  /** Company or institution name */
  company: string;
  /** URL to company/institution website */
  companyUrl: string;
  /** Physical location */
  location: string;
  /** Start date (e.g., "May 2024") */
  startDate: string;
  /** End date or "Present" for current positions */
  endDate: string;
  /** Array of bullet points describing responsibilities/achievements */
  description: string[];
  /** Technologies or skills used */
  technologies: string[];
}

/**
 * Experience entries array
 * Contains all work and education experiences
 */
export const experiences: Experience[] = [
  {
    id: "1",
    type: "education",
    role: "Honours Computer Science",
    company: "Ontario Tech University",
    companyUrl: "https://ontariotechu.ca",
    location: "Oshawa, ON",
    startDate: "Sep 2023",
    endDate: "April 2027",
    description: [
      "Pursuing Honours Bachelor of Science in Computer Science",
      "Dean's List recipient 4 times for academic excellence",
      "Relevant coursework: Data Structures, Agile Methodologies, Database Systems, Design and Analysis of Algorithms,",
    ],
    technologies: ["Java", "Python", "C++", "SQL", "Git", "GitHub", "PostgreSQL", "HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: "2",
    type: "hackathon",
    role: "HackHive 2026 Participant",
    company: "Ontario Tech University CS Club",
    companyUrl: "https://www.otucsclub.dev/",
    location: "Oshawa, ON",
    startDate: "Jan 23, 2026",
    endDate: "Jan 25, 2026",
    description: [
      "Orchestrated the backend architecture for a multilingual learning platform, utilizing Flask to rapidly deploy a RESTful API and acting as the System Architect to direct AI-assisted code generation.",
      "Engineered a Multi-Agent Verification Pipeline, instructing Claude AI to implement a \"Teacher-TA\" workflow where a secondary LangChain agent strictly validates grade-level accuracy before response delivery.",
      "Streamlined model integration by utilizing an Abstract Base Class to centralize the initialization of educational parameters, reducing boilerplate code and ensuring consistent context injection across disparate AI providers.",
    ],
    technologies: ["Python", "GitHub", "HTML", "CSS", "JavaScript", "React", "OpenAI API", "LangChain", "Gemini API"]
  },
];
