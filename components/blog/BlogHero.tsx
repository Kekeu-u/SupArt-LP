"use client";

import { useI18n } from "@/lib/i18n";

export const BlogHero = () => {
    const { t } = useI18n();

    return (
        <div className="text-center mb-16 space-y-4">
            <div className="inline-block">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-4 inline-block">
                    {t("AI Powerer", "Impulsionado por IA")}
                </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900">
                {t("Insights & Innovation", "Insights & Inovação")}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                {t("Explore the future of digital design, technology, and artificial intelligence.", "Explore o futuro do design digital, tecnologia e inteligência artificial.")}
                <span className="block mt-1 text-blue-600 font-semibold">
                    {t("Premium content for creative minds.", "Conteúdo premium para mentes criativas.")}
                </span>
            </p>
        </div>
    );
};
