export interface Service {
    title: string;
    desc: string;
    price: string;
    gradient: string;
}

export const services: Service[] = [
    {
        title: "O Acelerador de Leads",
        desc: "Landing pages de alta conversão com copy persuasiva e design hipnótico.",
        price: "A partir de R$ 5k",
        gradient: "from-blue-500/10 to-purple-500/10"
    },
    {
        title: "Identidade Visual 360",
        desc: "Rebranding completo. Logo, tipografia, cores e manual de marca.",
        price: "A partir de R$ 8k",
        gradient: "from-orange-500/10 to-red-500/10"
    },
    {
        title: "Ecosistema Digital",
        desc: "Site institucional, blog e integrações CRM. A presença completa.",
        price: "Sob Consulta",
        gradient: "from-green-500/10 to-emerald-500/10"
    }
];
