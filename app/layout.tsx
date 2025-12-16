import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { seoKeywords } from "@/data/seo-keywords";

// LenisProvider removido - causando travamentos no scroll
// import { LenisProvider } from "@/components/LenisProvider";
// CustomCursor removido - causando cursor invisível
// import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://supart.agency"),
    title: "SupArt / Agência de MKT",
    description: "Agência de IA e Curadoria de Dados",
    keywords: seoKeywords,
    alternates: {
        canonical: "/",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SupArt",
        "url": "https://supart.agency", // Substitua pelo URL real se diferente
        "logo": "https://supart.agency/logo.png", // Substitua pelo URL real do logo
        "alternateName": seoKeywords,
        "sameAs": [
            // Adicione links de redes sociais aqui se houver
        ]
    };

    return (
        <html lang="pt-BR" className={`${inter.variable} antialiased`} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                {/* LenisProvider e CustomCursor desabilitados para performance */}
                {children}
            </body>
        </html>
    );
}
