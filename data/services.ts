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
            en: "High-Converting Landing Pages",
            pt: "O Acelerador de Leads",
        },
        desc: {
            en: "Conversion-focused landing pages with persuasive copy and hypnotic design that turn visitors into customers.",
            pt: "Landing pages de alta conversão com copy persuasiva e design hipnótico.",
        },
        price: {
            en: "From $1,500",
            pt: "A partir de R$ 5k",
        },
        gradient: "from-blue-500/10 to-purple-500/10",
        features: {
            en: ["A/B Testing Ready", "Mobile-First", "SEO Optimized", "Analytics Dashboard"],
            pt: ["Pronto para Testes A/B", "Mobile-First", "SEO Otimizado", "Dashboard Analytics"],
        },
    },
    {
        title: {
            en: "Complete Brand Identity",
            pt: "Identidade Visual 360",
        },
        desc: {
            en: "Full rebranding package. Logo, typography, colors, and comprehensive brand guidelines.",
            pt: "Rebranding completo. Logo, tipografia, cores e manual de marca.",
        },
        price: {
            en: "From $2,500",
            pt: "A partir de R$ 8k",
        },
        gradient: "from-orange-500/10 to-red-500/10",
        features: {
            en: ["Logo Design", "Brand Guidelines", "Social Media Kit", "Stationery Design"],
            pt: ["Design de Logo", "Manual de Marca", "Kit Redes Sociais", "Papelaria"],
        },
    },
    {
        title: {
            en: "Full Digital Ecosystem",
            pt: "Ecosistema Digital",
        },
        desc: {
            en: "Corporate website, blog, and CRM integrations. Your complete digital presence.",
            pt: "Site institucional, blog e integrações CRM. A presença completa.",
        },
        price: {
            en: "Custom Quote",
            pt: "Sob Consulta",
        },
        gradient: "from-green-500/10 to-emerald-500/10",
        features: {
            en: ["Custom CMS", "CRM Integration", "Analytics", "24/7 Support"],
            pt: ["CMS Customizado", "Integração CRM", "Analytics", "Suporte 24/7"],
        },
    },
];
