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
  skills: { name: string }[];
}

/**
 * Skills organized by category
 * Each category contains an array of related technical skills
 */
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "CSS3" },
      { name: "C++" },
      { name: "HTML5" },
      { name: "JavaScript" },
      { name: "Java" },
      { name: "Python" },
      { name: "SQL" },
    ],
  },
  {
    category: "AI & Data Engineering",
    skills: [
      { name: "ChromaDB" },
      { name: "Keras" },
      { name: "LangChain" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "PyTorch" },
      { name: "Scikit-learn" },
      { name: "TensorFlow" },
      { name: "OpenAI API" },
      { name: "Watsonx.ai" }
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Docker" },
      { name: "Linux" },
      { name: "Git" },
      { name: "GitHub" },
    ],
  },
  {
    category: "Frameworks & UI",
    skills: [
      { name: "Gradio" },
      { name: "Flask" },
    ],
  }
];
