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
        category: 'Frontend',
        skills: [
            { name: 'React' },
            { name: 'Next.js' },
            { name: 'TypeScript' },
            { name: 'TailwindCSS' },
            { name: 'Framer Motion' },
        ],
    },
    {
        category: 'Backend',
        skills: [
            { name: 'Node.js' },
            { name: 'Python' },
            { name: 'PostgreSQL' },
            { name: 'MongoDB' },
            { name: 'GraphQL' },
        ],
    },
    {
        category: 'DevOps & Tools',
        skills: [
            { name: 'Docker' },
            { name: 'AWS' },
            { name: 'Git' },
            { name: 'CI/CD' },
            { name: 'Vercel' },
        ],
    },
    {
        category: 'AI & Data',
        skills: [
            { name: 'PyTorch' },
            { name: 'TensorFlow' },
            { name: 'Pandas' },
            { name: 'OpenAI API' },
            { name: 'LangChain' },
        ],
    },
];
