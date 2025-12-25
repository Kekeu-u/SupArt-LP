export interface ProjectTag {
    label: { en: string; pt: string };
    variant?: "default" | "highlight";
}

export interface Project {
    slug: string;
    title: string;
    description: { en: string; pt: string };
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
        description: {
            en: "Transforming lives through sports and education.",
            pt: "Transformando vidas através do esporte e educação.",
        },
        url: "https://adesprs.org.br/",
        image: "/adesp-preview.png",
        tags: [
            { label: { en: "Non-Profit", pt: "Non-Profit" } },
            { label: { en: "Institutional", pt: "Institucional" } },
        ],
        gradient: "from-[#0d3320] via-[#1a1a1a] to-[#2d1515]",
        browserUrl: "adesprs.org.br",
    },
    {
        slug: "dunga",
        title: "Dunga",
        description: {
            en: "Premium visual identity for Brazil's world champion captain.",
            pt: "Identidade visual premium para o capitão tetracampeão.",
        },
        image: "/dunga-preview.png",
        tags: [
            { label: { en: "Partnership", pt: "Parceria" } },
            { label: { en: "Strategic", pt: "Estratégica" }, variant: "highlight" },
        ],
        gradient: "from-amber-900 via-[#1a1a1a] to-stone-900",
        browserUrl: "dunga.com.br",
    },
];

export const projectsSection = {
    title: {
        en: "Selected Work",
        pt: "Cases Selecionados",
    },
    subtitle: {
        en: "A curated collection of projects that define our standard of excellence.",
        pt: "Uma curadoria de projetos que definem nosso padrão de excelência.",
    },
    stats: {
        en: { count: "+50", label: "Projects Delivered" },
        pt: { count: "+15", label: "Projetos Entregues" },
    },
    inDevelopment: {
        en: "In Development",
        pt: "Em Desenvolvimento",
    },
};
