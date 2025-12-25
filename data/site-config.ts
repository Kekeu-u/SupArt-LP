export const siteConfig = {
    name: "SupArt Agency",
    description: {
        en: "Premium digital experiences that convert. AI-powered design & development.",
        pt: "Experiências digitais premium que convertem. Design & desenvolvimento com IA.",
    },
    location: "São Paulo, Brazil",
    copyright: {
        en: "© 2025 SupArt Agency. All rights reserved.",
        pt: "© 2025 SupArt Agency. Todos os direitos reservados.",
    },
    social: {
        instagram: "https://instagram.com/supartagency",
        linkedin: "https://linkedin.com/company/supart",
        twitter: "https://twitter.com/supartagency",
    },
    availability: {
        en: "Available for projects worldwide • UTC-3 (Brazil)",
        pt: "Disponível para projetos globais • UTC-3 (Brasil)",
    },
} as const;

export type SiteConfig = typeof siteConfig;
