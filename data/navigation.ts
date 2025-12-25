export interface NavLink {
    label: { en: string; pt: string };
    href: string;
}

export interface NavSection {
    title: { en: string; pt: string };
    links: NavLink[];
}

export const footerLinks: NavSection[] = [
    {
        title: { en: "Services", pt: "Serviços" },
        links: [
            { label: { en: "Excellence", pt: "Excelência" }, href: "#" },
            { label: { en: "Web Development", pt: "Desenvolvimento Web" }, href: "#" },
            { label: { en: "Mobile Apps", pt: "Apps Mobile" }, href: "#" },
            { label: { en: "Consulting", pt: "Consultoria" }, href: "#" },
        ],
    },
    {
        title: { en: "Company", pt: "Empresa" },
        links: [
            { label: { en: "About", pt: "Sobre" }, href: "#" },
            { label: { en: "Careers", pt: "Carreiras" }, href: "#" },
            { label: { en: "Blog", pt: "Blog" }, href: "/blog" },
            { label: { en: "Contact", pt: "Contato" }, href: "#" },
        ],
    },
    {
        title: { en: "Legal", pt: "Legal" },
        links: [
            { label: { en: "Privacy", pt: "Privacidade" }, href: "/privacidade" },
            { label: { en: "Terms", pt: "Termos" }, href: "/termos" },
            { label: { en: "Cookies", pt: "Cookies" }, href: "#" },
        ],
    },
];

export const headerLinks: NavLink[] = [
    { label: { en: "Services", pt: "Serviços" }, href: "#servicos" },
    { label: { en: "Portfolio", pt: "Portfolio" }, href: "#portfolio" },
    { label: { en: "About", pt: "Sobre" }, href: "#sobre" },
    { label: { en: "Contact", pt: "Contato" }, href: "#contato" },
];
