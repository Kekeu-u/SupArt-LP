export interface Company {
    name: string;
    logo: string;
    url: string;
}

export interface Technology {
    name: string;
    letter: string;
    gradient: string;
    description: { en: string; pt: string };
    detail: { en: string; pt: string };
    stats: {
        performance: number;
        adoption: number;
        dx: number;
    };
    features: string[];
}

export const companies: Company[] = [
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", url: "https://netflix.com" },
    { name: "TikTok", logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg", url: "https://tiktok.com" },
    { name: "Twitch", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg", url: "https://twitch.tv" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", url: "https://notion.so" },
    { name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", url: "https://vercel.com" },
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", url: "https://nike.com" },
    { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", url: "https://uber.com" },
];

export const technologies: Technology[] = [
    {
        name: "Next.js",
        letter: "N",
        gradient: "from-black via-gray-800 to-black",
        description: { en: "React Framework", pt: "Framework React" },
        detail: {
            en: "Server-side rendering, automatic routes, image optimization.",
            pt: "Server-side rendering, rotas automáticas, otimização de imagens.",
        },
        stats: { performance: 98, adoption: 95, dx: 92 },
        features: ["SSR/SSG", "App Router", "Edge"],
    },
    {
        name: "React",
        letter: "R",
        gradient: "from-cyan-500 via-blue-500 to-cyan-400",
        description: { en: "UI Library", pt: "Biblioteca UI" },
        detail: {
            en: "Declarative library for interactive and reactive interfaces.",
            pt: "Biblioteca declarativa para interfaces interativas e reativas.",
        },
        stats: { performance: 94, adoption: 99, dx: 90 },
        features: ["Hooks", "Virtual DOM", "Ecosystem"],
    },
    {
        name: "TypeScript",
        letter: "T",
        gradient: "from-blue-600 via-blue-500 to-blue-400",
        description: { en: "Type Safety", pt: "Type Safety" },
        detail: {
            en: "Typed superset that prevents bugs and improves productivity.",
            pt: "Superset tipado que previne bugs e melhora produtividade.",
        },
        stats: { performance: 100, adoption: 92, dx: 88 },
        features: ["Types", "IntelliSense", "Refactor"],
    },
    {
        name: "Tailwind",
        letter: "T",
        gradient: "from-teal-500 via-cyan-500 to-teal-400",
        description: { en: "Styling", pt: "Estilização" },
        detail: {
            en: "Utility-first CSS framework for rapid development.",
            pt: "Framework CSS utility-first para desenvolvimento rápido.",
        },
        stats: { performance: 96, adoption: 88, dx: 95 },
        features: ["Utility-First", "JIT", "Dark Mode"],
    },
    {
        name: "Framer",
        letter: "F",
        gradient: "from-purple-600 via-pink-500 to-purple-400",
        description: { en: "Animations", pt: "Animações" },
        detail: {
            en: "Fluid animations and gestures for React with declarative API.",
            pt: "Animações fluidas e gestos para React com API declarativa.",
        },
        stats: { performance: 90, adoption: 78, dx: 94 },
        features: ["Gestures", "Layout", "Variants"],
    },
    {
        name: "Vercel",
        letter: "V",
        gradient: "from-gray-900 via-gray-700 to-gray-800",
        description: { en: "Deploy", pt: "Deploy" },
        detail: {
            en: "Deployment platform with global edge network.",
            pt: "Plataforma de deploy com edge network global.",
        },
        stats: { performance: 99, adoption: 85, dx: 97 },
        features: ["Edge", "Analytics", "Previews"],
    },
];

export const techStats = {
    en: [
        { value: "99.9%", label: "Uptime" },
        { value: "<50ms", label: "Response" },
        { value: "100%", label: "SEO Score" },
    ],
    pt: [
        { value: "99.9%", label: "Uptime" },
        { value: "<50ms", label: "Resposta" },
        { value: "100%", label: "SEO" },
    ],
};
