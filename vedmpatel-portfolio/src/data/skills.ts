/**
 * @file skills.ts
 * @description Skills data configuration for the About section.
 * Defines skill categories and individual skills displayed in the portfolio.
 */

/**
 * Skill category interface
 */
export interface SkillCategory {
  category: string;
  /** Flat string array — each entry is just the skill name */
  skills: string[];
}

/**
 * Skills organized by category
 * Each category contains an array of related technical skills
 */
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["CSS3", "C++", "HTML5", "JavaScript", "Java", "Python", "SQL"],
  },
  {
    category: "AI & Data Engineering",
    skills: [
      "ChromaDB",
      "Keras",
      "LangChain",
      "NumPy",
      "Pandas",
      "PyTorch",
      "Scikit-learn",
      "TensorFlow",
      "OpenAI API",
      "Watsonx.ai",
    ],
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "Linux", "Git", "GitHub", "Claude AI"],
  },
  {
    category: "Frameworks & UI",
    skills: ["Gradio", "Flask"],
  },
];
