export interface ServiceSEO {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
    heroTitle: string;
    heroSubtitle: string;
    features: {
        title: string;
        description: string;
    }[];
    faq: {
        question: string;
        answer: string;
    }[];
}

export const servicesSEO: ServiceSEO[] = [
    {
        slug: "acelerador-de-leads",
        title: "Criação de Landing Pages de Alta Conversão | SupArt",
        description: "Aumente suas vendas com Landing Pages otimizadas para conversão. Design hipnótico, copy persuasiva e velocidade máxima. Solicite um orçamento.",
        keywords: ["Landing Page", "Criação de Sites", "Alta Conversão", "Design Web", "Página de Vendas"],
        heroTitle: "O Acelerador de Leads",
        heroSubtitle: "Landing pages que não apenas informam, mas vendem. Transformamos visitantes em clientes com design estratégico e psicologia de vendas.",
        features: [
            { title: "Velocidade Extrema", description: "Páginas que carregam em milissegundos, garantindo que você não perca nenhum clique." },
            { title: "Copywriting Persuasivo", description: "Textos desenhados para quebrar objeções e guiar o usuário até a compra." },
            { title: "Design Premium", description: "Estética que transmite autoridade e confiança instantânea para sua marca." }
        ],
        faq: [
            { question: "Quanto tempo demora para criar uma Landing Page?", answer: "Nossos projetos expressos são entregues em até 7 dias úteis após o briefing." },
            { question: "Vocês fazem a integração com meu CRM?", answer: "Sim, integramos com RD Station, ActiveCampaign, HubSpot e outros via n8n ou API direta." }
        ]
    },
    {
        slug: "identidade-visual-360",
        title: "Identidade Visual e Branding Premium | SupArt",
        description: "Rebranding completo para empresas que buscam posicionamento de liderança. Logo, manual da marca e aplicações visuais.",
        keywords: ["Identidade Visual", "Branding", "Logotipo", "Design Gráfico", "Rebranding"],
        heroTitle: "Identidade Visual 360",
        heroSubtitle: "Sua marca é o ativo mais valioso do seu negócio. Construímos identidades visuais que exalam profissionalismo e ficam na memória.",
        features: [
            { title: "Manual de Marca Completo", description: "Diretrizes claras de uso, tipografia e paleta de cores para manter a consistência." },
            { title: "Aplicações Reais", description: "Mockups de como sua marca ficará em cartões, redes sociais e brindes." },
            { title: "Estratégia de Posicionamento", description: "Design alinhado com o público-alvo que você deseja atrair." }
        ],
        faq: [
            { question: "O que está incluso no pacote de Identidade Visual?", answer: "Logo principal, variações, paleta de cores, tipografia, elementos gráficos de apoio e manual da marca." },
            { question: "Quantas opções de logo vocês apresentam?", answer: "Apresentamos 3 caminhos criativos distintos baseados na estratégia definida." }
        ]
    },
    {
        slug: "ecosistema-digital",
        title: "Desenvolvimento de Ecosistemas Digitais e Apps | SupArt",
        description: "Soluções completas de desenvolvimento web, aplicativos e automações. O parceiro tecnológico ideal para sua empresa.",
        keywords: ["Desenvolvimento Web", "Aplicativos", "Sistemas Web", "Automação", "Transformação Digital"],
        heroTitle: "Ecosistema Digital",
        heroSubtitle: "Mais que um site, uma plataforma de negócios. Integramos web, mobile e automações para escalar sua operação.",
        features: [
            { title: "Tecnologia de Ponta", description: "Usamos Next.js, React e Supabase para criar aplicações robustas e escaláveis." },
            { title: "Automações Inteligentes", description: "Conectamos seus processos com IA para reduzir trabalho manual." },
            { title: "Suporte Contínuo", description: "Acompanhamos o crescimento do seu produto com melhorias constantes." }
        ],
        faq: [
            { question: "Vocês desenvolvem aplicativos móveis?", answer: "Sim, desenvolvemos PWAs (Progressive Web Apps) e aplicativos nativos." },
            { question: "Como funciona a manutenção?", answer: "Oferecemos planos de manutenção mensal para garantir segurança e atualizações." }
        ]
    }
];
