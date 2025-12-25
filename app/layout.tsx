import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { seoKeywords } from "@/data/seo-keywords";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://supart.agency"),
    title: "SupArt Agency | Premium Digital Experiences",
    description: "AI-powered design & development agency. We create high-converting landing pages, brand identities, and digital ecosystems for clients worldwide.",
    keywords: seoKeywords,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        alternateLocale: "pt_BR",
        siteName: "SupArt Agency",
        title: "SupArt Agency | Premium Digital Experiences",
        description: "AI-powered design & development agency creating high-converting digital experiences.",
    },
    twitter: {
        card: "summary_large_image",
        title: "SupArt Agency",
        description: "Premium digital experiences that convert.",
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
        "name": "SupArt Agency",
        "url": "https://supart.agency",
        "logo": "https://supart.agency/logo.png",
        "description": "Premium AI-powered design & development agency",
        "foundingDate": "2024",
        "areaServed": "Worldwide",
        "serviceType": ["Web Design", "Brand Identity", "Digital Marketing", "AI Solutions"],
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "São Paulo",
            "addressCountry": "BR"
        },
        "sameAs": [
            "https://instagram.com/supartagency",
            "https://linkedin.com/company/supart",
            "https://twitter.com/supartagency"
        ]
    };

    return (
        <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                <I18nProvider>
                    {children}
                </I18nProvider>
            </body>
        </html>
    );
}
