"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoCard } from "./BentoGrid";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { useI18n } from "@/lib/i18n";
import { projectsSection } from "@/data/projects";

export const ProjectShowcase = () => {
    const { locale } = useI18n();
    const content = projectsSection;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-gray-900">
                        {content.title[locale]}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        {content.subtitle[locale]}
                    </p>
                </motion.div>

                <BentoGrid className="auto-rows-[450px]">
                    {/* Site 1 - Large Card - ADESP/RS */}
                    <BentoCard colSpan={2} className="p-0 overflow-hidden bg-transparent border-none shadow-none group/card">
                        <a href="/cases" className="block h-full w-full">
                            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3320] via-[#1a1a1a] to-[#2d1515] backdrop-blur-xl border border-white/10">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                <div className="relative z-10 h-full flex flex-col p-5 md:p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-medium text-white/70 uppercase tracking-wider">
                                                Non-Profit
                                            </span>
                                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-medium text-white/70 uppercase tracking-wider">
                                                {locale === "en" ? "Institutional" : "Institucional"}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/card:bg-white group-hover/card:text-black transition-all duration-300">
                                            <span className="text-lg">→</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1.5">ADESP/RS</h3>
                                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                            {locale === "en" ? "Transforming lives through sports and education." : "Transformando vidas através do esporte e educação."}
                                        </p>
                                    </div>
                                    <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-black/40 group-hover/card:border-white/20 transition-colors duration-300">
                                        <div className="h-6 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                        </div>
                                        <div className="relative w-full h-[calc(100%-1.5rem)] overflow-hidden">
                                            <Image
                                                src="/adesp-preview.png"
                                                alt="ADESP/RS Website"
                                                fill
                                                className="object-cover object-top group-hover/card:scale-[1.03] transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </BentoCard>

                    {/* Site 2 - Dunga */}
                    <BentoCard colSpan={2} className="p-0 overflow-hidden bg-transparent border-none shadow-none group/card">
                        <a href="/cases" className="block h-full w-full">
                            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900 via-[#1a1a1a] to-stone-900 backdrop-blur-xl border border-white/10">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                <div className="relative h-full flex flex-col p-5 md:p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-medium text-white/70 uppercase tracking-wider">
                                                {locale === "en" ? "Partnership" : "Parceria"}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/card:bg-white group-hover/card:text-black transition-all duration-300">
                                            <span className="text-lg">→</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1.5">Dunga</h3>
                                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                            {locale === "en" ? "Premium visual identity for Brazil's world champion captain." : "Identidade visual premium para o capitão tetracampeão."}
                                        </p>
                                    </div>
                                    <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-black/40 group-hover/card:border-white/20 transition-colors duration-300">
                                        <div className="h-6 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                        </div>
                                        <div className="relative w-full h-[calc(100%-1.5rem)] overflow-hidden">
                                            <Image
                                                src="/dunga-preview.png"
                                                alt="Parceria Dunga"
                                                fill
                                                className="object-cover object-top group-hover/card:scale-[1.03] transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </BentoCard>
                </BentoGrid>

                <div className="mt-16 pb-8 flex justify-center">
                    <ShinyButton href="/cases">
                        {locale === "en" ? "View All Projects" : "Ver Todos os Projetos"}
                    </ShinyButton>
                </div>
            </div>
        </section>
    );
};
