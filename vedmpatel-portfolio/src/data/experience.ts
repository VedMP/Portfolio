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
    /** Type of experience: work or education */
    type: 'work' | 'education';
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
        id: '1',
        type: 'work',
        role: 'Software Developer Intern',
        company: 'Tech Company',
        companyUrl: 'https://example.com',
        location: 'Toronto, ON',
        startDate: 'May 2024',
        endDate: 'Present',
        description: [
            'Developed and maintained full-stack web applications using React and Node.js',
            'Collaborated with cross-functional teams to deliver new features',
            'Improved application performance by 40% through code optimization',
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    },
    {
        id: '2',
        type: 'education',
        role: 'Honours Computer Science',
        company: 'Ontario Tech University',
        companyUrl: 'https://ontariotechu.ca',
        location: 'Oshawa, ON',
        startDate: 'Sep 2022',
        endDate: 'Present',
        description: [
            'Pursuing Honours Bachelor of Science in Computer Science',
            "Dean's List recipient for academic excellence",
            'Relevant coursework: Data Structures, Algorithms, Software Engineering',
        ],
        technologies: ['Java', 'Python', 'C++', 'SQL'],
    },
];
