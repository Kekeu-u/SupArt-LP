"use client";

import { PortfolioFull } from "@/components/sections/showcase/PortfolioFull";
import { Header } from "@/components/layout/Header";
import { siteConfig, footerLinks } from "@/data";
import { useI18n } from "@/lib/i18n";

export default function CasesPage() {
    const { locale } = useI18n();

    return (
        <main className="min-h-screen bg-black text-[var(--color-apple-off-white)] selection:bg-[var(--color-apple-blue)] selection:text-white">
            <Header />

            <PortfolioFull />

            {/* Footer - Reused from main page layout */}
            <footer className="bg-[var(--color-apple-off-white)] py-32 border-t border-black/5 text-[var(--color-apple-black)]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="font-semibold mb-6">{siteConfig.name}</h4>
                            <p className="text-sm text-[var(--color-apple-gray)] leading-relaxed max-w-xs">
                                {siteConfig.description[locale]}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {siteConfig.availability[locale]}
                            </div>
                        </div>

                        {footerLinks.map((col, i) => (
                            <div key={i}>
                                <h4 className="font-semibold mb-6 text-sm">{col.title[locale]}</h4>
                                <ul className="space-y-4">
                                    {col.links.map((link) => (
                                        <li key={link.label.en}>
                                            <a href={link.href} className="text-sm text-[var(--color-apple-gray)] hover:text-[var(--color-apple-black)] transition-colors">
                                                {link.label[locale]}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[var(--color-apple-gray)]">
                            {siteConfig.copyright[locale]}
                        </p>
                        <p className="text-xs text-[var(--color-apple-gray)]">
                            {siteConfig.location}
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
