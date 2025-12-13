export interface ProjectTag {
    label: string;
    variant?: "default" | "highlight";
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    url?: string;
    image: string;
    tags: ProjectTag[];
    gradient: string;
    browserUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "adesp",
        title: "ADESP/RS",
        description: "Transformando vidas através do esporte e educação.",
        url: "https://adesprs.org.br/",
        image: "/adesp-preview.png",
        tags: [
            { label: "Non-Profit" },
            { label: "Institucional" }
        ],
        gradient: "from-[#0d3320] via-[#1a1a1a] to-[#2d1515]",
        browserUrl: "adesprs.org.br"
    },
    {
        slug: "dunga",
        title: "Dunga",
        description: "Identidade visual premium e narrativa esportiva.",
        image: "/dunga-preview.png",
        tags: [
            { label: "Parceria" },
            { label: "Estratégica", variant: "highlight" }
        ],
        gradient: "from-amber-900 via-[#1a1a1a] to-stone-900",
        browserUrl: "dunga.com.br"
    }
];
