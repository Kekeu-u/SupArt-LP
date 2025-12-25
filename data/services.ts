export interface Service {
    title: { en: string; pt: string };
    desc: { en: string; pt: string };
    price: { en: string; pt: string };
    gradient: string;
    features: { en: string[]; pt: string[] };
}

export const services: Service[] = [
    {
        title: {
            en: "Performance Media",
            pt: "Mídia de Performance",
        },
        desc: {
            en: "Conversion-focused campaigns and ads for traffic, sales, and lead generation.",
            pt: "Criação de campanhas e anúncios focados em tráfego, vendas, geração e nutrição de leads.",
        },
        price: {
            en: "Custom Quote",
            pt: "Sob Consulta",
        },
        gradient: "from-blue-500/10 to-cyan-500/10",
        features: {
            en: ["Inbound Marketing", "Media Strategy", "Ecommerce Sales", "Google/Meta/LinkedIn Ads"],
            pt: ["Inbound Marketing", "Estratégia de Mídia", "Vendas em Ecommerce", "Google/Meta/LinkedIn Ads"],
        },
    },
    {
        title: {
            en: "Project Management",
            pt: "Gestão de Projetos",
        },
        desc: {
            en: "Custom communication projects. Strong brands with solid positioning.",
            pt: "Projetos de comunicação customizados. Marcas fortes em posicionamento.",
        },
        price: {
            en: "Custom Quote",
            pt: "Sob Consulta",
        },
        gradient: "from-purple-500/10 to-pink-500/10",
        features: {
            en: ["Websites & Landing Pages", "Brand Creation", "Visual Identity", "SEO Strategies"],
            pt: ["Criação de Sites e LPs", "Criação de Marcas", "Identidades Visuais", "Estratégias de SEO"],
        },
    },
    {
        title: {
            en: "Social Media",
            pt: "Redes Sociais",
        },
        desc: {
            en: "Social media management focused on branding. Make your brand known and admired.",
            pt: "Gestão de redes sociais com foco em branding. Sua marca mais conhecida e admirada.",
        },
        price: {
            en: "Custom Quote",
            pt: "Sob Consulta",
        },
        gradient: "from-orange-500/10 to-red-500/10",
        features: {
            en: ["Content Marketing", "Influencers", "Funnel Strategy", "Multi-platform Management"],
            pt: ["Marketing de Conteúdo", "Influenciadores", "Topo de Funil", "Gestão Multiplataforma"],
        },
    },
    {
        title: {
            en: "360º Marketing",
            pt: "MKT 360º",
        },
        desc: {
            en: "Development of Strategy and Execution of Omnichannel campaigns.",
            pt: "Desenvolvimento de Estratégia e Execução de campanhas Omnichannel.",
        },
        price: {
            en: "Custom Quote",
            pt: "Sob Consulta",
        },
        gradient: "from-green-500/10 to-emerald-500/10",
        features: {
            en: ["Omnichannel Campaigns", "Live Marketing", "Events & Experiences", "OOH & TV/Radio"],
            pt: ["Campanhas Omnichannel", "Live Marketing", "Eventos e Experiências", "OOH e Mídia Tradicional"],
        },
    },
];
