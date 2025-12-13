export const siteConfig = {
    name: "SupArt Agency",
    description: "Criando o futuro das interfaces digitais com precisão e arte.",
    location: "São Paulo, Brasil",
    copyright: "© 2025 SupArt Agency. Todos os direitos reservados.",
    social: {
        instagram: "https://instagram.com/supartagency",
        linkedin: "https://linkedin.com/company/supart",
        twitter: "https://twitter.com/supartagency",
    }
} as const;

export type SiteConfig = typeof siteConfig;
