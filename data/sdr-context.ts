/**
 * SDR MAYA - Contexto Completo
 * Este arquivo contém todas as informações que a MAYA precisa para responder
 * perguntas sobre a agência, precificação e projetos.
 */

// ═══════════════════════════════════════════════════════════════════════════
// INFORMAÇÕES DA AGÊNCIA
// ═══════════════════════════════════════════════════════════════════════════

export const agencyInfo = {
    name: "SupArt Agency",
    tagline: "Criando o futuro das interfaces digitais com precisão e arte.",
    location: "São Paulo, Brasil",
    founded: 2024,
    focus: "Estúdio boutique de design digital para empresas que valorizam qualidade",

    differentials: [
        "Stack moderna (Next.js, React, TypeScript, Tailwind, Framer Motion)",
        "Entrega rápida sem sacrificar qualidade",
        "Foco obsessivo em conversão e performance",
        "Atendimento direto com quem executa (sem intermediários)",
        "Design cinematográfico de alta fidelidade",
    ],

    social: {
        instagram: "https://instagram.com/supartagency",
        linkedin: "https://linkedin.com/company/supart",
        twitter: "https://twitter.com/supartagency",
    }
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// LINKS OFICIAIS (para a MAYA compartilhar)
// ═══════════════════════════════════════════════════════════════════════════

export const officialLinks = {
    landing: {
        url: "https://supart.com.br",
        label: "Nossa Landing Page",
        description: "Veja nosso trabalho ao vivo"
    },
    studio: {
        url: "https://studio.supart.com.br",
        label: "SupArt Studio",
        description: "Nosso SaaS de geração de conteúdo com IA"
    },
    portfolio: {
        adesp: {
            url: "https://adesprs.org.br",
            label: "ADESP/RS",
            description: "ONG esportiva - case institucional"
        },
        dunga: {
            url: "https://dunga.com.br",
            label: "Dunga",
            description: "Identidade visual premium"
        }
    },
    whatsapp: {
        url: "https://wa.me/5511999999999",
        label: "WhatsApp Direto"
    }
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// PRODUTOS E SERVIÇOS
// ═══════════════════════════════════════════════════════════════════════════

export const products = {
    aceleradorDeLeads: {
        name: "O Acelerador de Leads",
        description: "Landing pages de alta conversão com copy persuasiva e design hipnótico.",
        idealFor: ["Lançamentos", "Campanhas de captação", "Webinars", "Produtos digitais"],
        startingPrice: 5000,
        priceRange: { min: 5000, max: 12000 },
        deliveryTime: "2-3 semanas",
        includes: [
            "Design responsivo mobile-first",
            "Copy persuasiva",
            "Animações premium (Framer Motion)",
            "Otimização de performance (Lighthouse 90+)",
            "Deploy em Vercel",
            "1 rodada de revisão"
        ]
    },

    identidadeVisual: {
        name: "Identidade Visual 360",
        description: "Rebranding completo: logo, tipografia, cores, manual de marca.",
        idealFor: ["Empresas em reposicionamento", "Startups", "Personal brands"],
        startingPrice: 8000,
        priceRange: { min: 8000, max: 20000 },
        deliveryTime: "3-4 semanas",
        includes: [
            "Pesquisa e diagnóstico de marca",
            "3 conceitos iniciais",
            "Logo em todas as variações",
            "Paleta de cores + tipografia",
            "Manual de identidade (PDF)",
            "Arquivos fonte editáveis"
        ]
    },

    ecossistemaDigital: {
        name: "Ecossistema Digital",
        description: "Site institucional, blog e integrações. A presença digital completa.",
        idealFor: ["Empresas estabelecidas", "Consultorias", "Escritórios"],
        startingPrice: 15000,
        priceRange: { min: 15000, max: 50000 },
        deliveryTime: "4-8 semanas",
        includes: [
            "Site institucional completo (5-10 páginas)",
            "Blog integrado com CMS",
            "Integrações (CRM, Analytics, Email)",
            "Painel administrativo",
            "SEO on-page",
            "3 meses de suporte"
        ]
    },

    chatSdrIA: {
        name: "Chat SDR com IA",
        description: "Assistente de vendas 24/7 com inteligência artificial integrada ao site.",
        idealFor: ["Alta demanda de leads", "Atendimento fora do horário", "Qualificação automática"],
        startingPrice: 3500,
        priceRange: { min: 3500, max: 8000 },
        deliveryTime: "1-2 semanas",
        includes: [
            "Chat widget no site",
            "Integração com IA (Gemini/GPT)",
            "Prompt personalizado para seu negócio",
            "Coleta de dados de lead",
            "Notificações por email/WhatsApp"
        ]
    }
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// BREAKDOWN: QUANTO CUSTARIA UMA LP IGUAL A NOSSA
// ═══════════════════════════════════════════════════════════════════════════

export const ourLpBreakdown = {
    projectName: "Landing Page SupArt Agency",
    totalEstimate: { min: 15000, max: 18000 },
    recommendedPrice: 16000,

    breakdown: [
        {
            item: "Design/UX Conceitual",
            description: "Conceito visual, wireframes, design system",
            price: 3000
        },
        {
            item: "Desenvolvimento Front-end",
            description: "Next.js + TypeScript + Tailwind + componentes",
            price: 8000
        },
        {
            item: "Background 3D (Spline)",
            description: "Integração e otimização do 3D interativo",
            price: 1500
        },
        {
            item: "Chat SDR com IA",
            description: "Chat conversacional com Gemini integrado",
            price: 3500
        },
        {
            item: "Responsividade Premium",
            description: "Mobile-first com fluid typography",
            price: 1500
        },
        {
            item: "Deploy e Infra",
            description: "Configuração Vercel + domínio + SSL",
            price: 500
        }
    ],

    techStack: [
        "Next.js 14 (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vercel AI SDK",
        "Google Gemini",
        "Spline 3D"
    ],

    componentCount: 21,
    linesOfCode: "~3500",

    complexity: "Alta",
    uniqueFeatures: [
        "Hero com background 3D interativo (Spline)",
        "Chat SDR com IA conversacional",
        "Animações cinematográficas (Framer Motion)",
        "Headline rotativo com efeito typewriter",
        "Tech stack marquee interativo",
        "Project showcase com browser mockups"
    ]
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// FAIXAS DE PREÇO POR COMPLEXIDADE
// ═══════════════════════════════════════════════════════════════════════════

export const pricingTiers = {
    simples: {
        label: "LP Simples",
        description: "1-3 seções, sem integrações complexas",
        priceRange: { min: 3000, max: 5000 },
        deliveryTime: "1-2 semanas"
    },
    intermediaria: {
        label: "LP Intermediária",
        description: "4-6 seções, animações, formulários",
        priceRange: { min: 5000, max: 10000 },
        deliveryTime: "2-3 semanas"
    },
    premium: {
        label: "LP Premium",
        description: "Design cinematográfico, integrações, 3D, IA",
        priceRange: { min: 12000, max: 25000 },
        deliveryTime: "3-5 semanas"
    },
    enterprise: {
        label: "Ecossistema Completo",
        description: "Múltiplas páginas, CMS, integrações enterprise",
        priceRange: { min: 25000, max: 80000 },
        deliveryTime: "6-12 semanas"
    }
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// PORTFÓLIO DETALHADO
// ═══════════════════════════════════════════════════════════════════════════

export const portfolio = [
    {
        name: "ADESP/RS",
        url: "https://adesprs.org.br",
        type: "Institucional",
        client: "ONG Esportiva",
        description: "Site institucional para ONG que transforma vidas através do esporte e educação. Design emocional com foco em captação de doadores.",
        highlights: [
            "Design emocional e impactante",
            "Integração com sistema de doações",
            "Performance otimizada",
            "Acessibilidade WCAG"
        ]
    },
    {
        name: "Dunga",
        url: "https://dunga.com.br",
        type: "Identidade Visual",
        client: "Ícone do Futebol",
        description: "Identidade visual premium para figura histórica do futebol brasileiro. Elegância e tradição em cada detalhe.",
        highlights: [
            "Logo com peso histórico",
            "Paleta sofisticada",
            "Manual de marca completo",
            "Aplicações em mídia"
        ]
    },
    {
        name: "SupArt Studio",
        url: "https://studio.supart.com.br",
        type: "SaaS",
        client: "Produto Próprio",
        description: "Plataforma de geração de conteúdo com IA. Cria carrosséis, stories e posts otimizados automaticamente.",
        highlights: [
            "Geração com IA",
            "Templates personalizáveis",
            "Exportação em múltiplos formatos",
            "Dashboard intuitivo"
        ]
    }
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// OBJEÇÕES E RESPOSTAS PRONTAS
// ═══════════════════════════════════════════════════════════════════════════

export const objectionHandling = {
    price: {
        objection: "Tá caro / Achei caro",
        response: "Nosso foco é ROI, não custo. Uma landing que converte paga o investimento no primeiro mês. Qual resultado você espera?"
    },
    think: {
        objection: "Preciso pensar",
        response: "Tranquilo! Me passa seu WhatsApp que mando um resumo pra você revisar com calma."
    },
    competition: {
        objection: "Tenho outras propostas",
        response: "Normal! O que você mais valoriza numa parceria assim? Prazo, qualidade, suporte?"
    },
    need: {
        objection: "Não sei se preciso",
        response: "Me conta qual seu objetivo principal hoje. Aí vejo se faz sentido mesmo pra você."
    },
    time: {
        objection: "Não tenho tempo agora",
        response: "Entendo! Quando seria um bom momento pra gente conversar? Posso te mandar um lembrete."
    }
} as const;

// Export tudo junto para facilitar importação
export const sdrContext = {
    agency: agencyInfo,
    links: officialLinks,
    products,
    ourLpBreakdown,
    pricingTiers,
    portfolio,
    objectionHandling
} as const;

export type SDRContext = typeof sdrContext;
