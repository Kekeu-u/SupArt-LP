export interface NavLink {
    label: string;
    href: string;
}

export interface NavSection {
    title: string;
    links: NavLink[];
}

export const footerLinks: NavSection[] = [
    {
        title: "Serviços",
        links: [
            { label: "Design System", href: "#" },
            { label: "Web Development", href: "#" },
            { label: "Mobile Apps", href: "#" },
            { label: "Consultoria", href: "#" },
        ]
    },
    {
        title: "Empresa",
        links: [
            { label: "Sobre", href: "#" },
            { label: "Carreiras", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contato", href: "#" },
        ]
    },
    {
        title: "Legal",
        links: [
            { label: "Privacidade", href: "/privacidade" },
            { label: "Termos", href: "/termos" },
            { label: "Cookies", href: "#" },
        ]
    }
];

export const headerLinks: NavLink[] = [
    { label: "Serviços", href: "#servicos" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
];
