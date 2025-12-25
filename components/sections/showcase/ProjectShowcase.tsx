"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoCard } from "./BentoGrid";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { useI18n } from "@/lib/i18n";
import { projectsSection } from "@/data/projects";

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn("relative h-full w-full rounded-[var(--radius-apple)]", className)}
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 grid place-content-center rounded-[20px] shadow-lg"
            >
                {children}
            </div>
        </motion.div>
    );
};

export const ProjectShowcase = () => {
    const { locale } = useI18n();
    const content = projectsSection;

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                    {content.title[locale]}
                </h2>
                <p className="text-lg text-[var(--color-apple-gray)] max-w-xl mx-auto">
                    {content.subtitle[locale]}
                </p>
            </motion.div>

            <BentoGrid className="auto-rows-[450px]">
                {/* Site 1 - Large Card - ADESP/RS */}
                <BentoCard colSpan={2} className="p-0 overflow-hidden bg-transparent border-none shadow-none group/card">
                    <a href="https://adesprs.org.br/" target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3320] via-[#1a1a1a] to-[#2d1515]">
                            {/* Background Noise */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                            {/* Content Container */}
                            <div className="relative z-10 h-full flex flex-col p-5 md:p-6">

                                {/* Top Row: Tags + Arrow */}
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
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title + Description */}
                                <div className="mb-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1.5">ADESP/RS</h3>
                                    <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                                        {locale === "en"
                                            ? "Transforming lives through sports and education."
                                            : "Transformando vidas através do esporte e educação."}
                                    </p>
                                </div>

                                {/* Browser Mockup - Flex grow */}
                                <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-black/40 group-hover/card:border-white/20 transition-colors duration-300">
                                    {/* Browser Header */}
                                    <div className="h-6 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                        <div className="ml-3 flex-1 max-w-[200px] h-3.5 rounded bg-white/5 flex items-center justify-center">
                                            <span className="text-[8px] text-white/30">adesprs.org.br</span>
                                        </div>
                                    </div>
                                    {/* Site Screenshot */}
                                    <div className="relative w-full h-[calc(100%-1.5rem)] overflow-hidden">
                                        <Image
                                            src="/adesp-preview.png"
                                            alt="ADESP/RS Website"
                                            fill
                                            className="object-cover object-top group-hover/card:scale-[1.03] transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </BentoCard>

                {/* Site 2 - Dunga - Side by Side with Adesp */}
                <BentoCard colSpan={2} className="p-0 overflow-hidden bg-transparent border-none shadow-none group/card">
                    <a href="https://dunga.com.br/" target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900 via-[#1a1a1a] to-stone-900">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                            <div className="relative h-full flex flex-col p-5 md:p-6">
                                {/* Top Row */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-medium text-white/70 uppercase tracking-wider">
                                            {locale === "en" ? "Partnership" : "Parceria"}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-[10px] font-medium text-amber-300 uppercase tracking-wider">
                                            {locale === "en" ? "Strategic" : "Estratégica"}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/card:bg-white group-hover/card:text-black transition-all duration-300">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title + Description */}
                                <div className="mb-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1.5">Dunga</h3>
                                    <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                                        {locale === "en"
                                            ? "Premium visual identity for Brazil's world champion captain."
                                            : "Identidade visual premium para o capitão tetracampeão."}
                                    </p>
                                </div>

                                {/* Browser Mockup */}
                                <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-black/40 group-hover/card:border-white/20 transition-colors duration-300">
                                    <div className="h-6 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                        <div className="ml-3 flex-1 max-w-[140px] h-3.5 rounded bg-white/5 flex items-center justify-center">
                                            <span className="text-[8px] text-white/30">dunga.com.br</span>
                                        </div>
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

                {/* SaaS Dashboard */}
                <BentoCard colSpan={2} className="p-0 overflow-hidden bg-transparent border-none shadow-none lg:col-start-2">
                    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex flex-col justify-center relative overflow-hidden">
                        <div className="relative z-10 text-white">
                            <span className="px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-medium uppercase tracking-wider mb-3 inline-block">
                                {content.inDevelopment[locale]}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold mb-1">SaaS Dashboard</h3>
                            <p className="opacity-70 text-xs md:text-sm">React + Tailwind + Supabase</p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-tl-full" />
                    </div>
                </BentoCard>
            </BentoGrid>


            <div className="mt-16 pb-8 flex justify-center">
                <ShinyButton href="/portfolio">
                    {locale === "en" ? "View More Projects" : "Ver Mais Projetos"}
                </ShinyButton>
            </div>
        </section >
    );
};
