"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoCard } from "./BentoGrid";

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

// --- Interactive Deck Component ---
const DeckCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative h-full w-full flex items-center justify-center perspective-1000 group/deck"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        rotate: isHovered ? (i - 1) * 5 : 0, // Reduced rotation for cleaner look
                        x: isHovered ? (i - 1) * 30 : 0,
                        y: isHovered ? (i === 1 ? -10 : 0) : 0,
                        scale: isHovered ? 1 : 1 - i * 0.05,
                        zIndex: 3 - i,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={cn(
                        "absolute w-56 h-36 rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center bg-black",
                        i === 0 ? "z-30" : "z-20"
                    )}
                    style={{
                        top: '50%',
                        left: '50%',
                        marginLeft: '-7rem', // half of width (56 = 14rem)
                        marginTop: '-4.5rem', // half of height (36 = 9rem)
                    }}
                >
                    {/* Content for the cards */}
                    {i === 0 && (
                        <div className="relative w-full h-full">
                            <img src="/dunga-preview.png" alt="Dunga Parceria" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover/deck:bg-transparent transition-colors" />
                            <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-[10px] text-white/80 font-medium bg-black/50 backdrop-blur-md px-2 py-1 rounded-full inline-block">
                                    Parceria Estratégica
                                </p>
                            </div>
                        </div>
                    )}

                    {i > 0 && (
                        <div className="w-full h-full bg-[var(--color-apple-black)] flex items-center justify-center p-4 border-l border-white/5">
                            <div className="text-center">
                                <h4 className="text-white font-bold text-sm mb-1">{i === 1 ? "Conceito" : "Impacto"}</h4>
                                <p className="text-[10px] text-gray-400 leading-tight">
                                    {i === 1 ? "Identidade visual premium." : "Engajamento global."}
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export const ProjectShowcase = () => {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Cases Selecionados</h2>
                <p className="text-xl text-[var(--color-apple-gray)] max-w-xl mx-auto">
                    Uma curadoria de projetos que definem nosso padrão de excelência.
                </p>
            </motion.div>

            <BentoGrid className="auto-rows-[550px]">
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
                                            Institucional
                                        </span>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover/card:bg-white group-hover/card:text-black transition-all duration-300">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title + Description */}
                                <div className="mb-4">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1.5">ADESP/RS</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        Transformando vidas através do esporte e educação.
                                    </p>
                                </div>

                                {/* Browser Mockup - Flex grow */}
                                <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-black/40 group-hover/card:border-white/20 transition-colors duration-300">
                                    {/* Browser Header */}
                                    <div className="h-7 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                        <div className="ml-3 flex-1 max-w-[200px] h-4 rounded bg-white/5 flex items-center justify-center">
                                            <span className="text-[9px] text-white/30">adesprs.org.br</span>
                                        </div>
                                    </div>
                                    {/* Site Screenshot */}
                                    <div className="relative w-full h-[calc(100%-1.75rem)] overflow-hidden">
                                        <img
                                            src="/adesp-preview.png"
                                            alt="ADESP/RS Website"
                                            className="w-full h-full object-cover object-top group-hover/card:scale-[1.03] transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </BentoCard>
            </BentoGrid>

            {/* Segunda linha - Dunga + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 max-w-7xl mx-auto px-6">
                {/* Parceria Estratégica Dunga - Ocupa 2 colunas */}
                <div className="md:col-span-2 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900 via-[#1a1a1a] to-stone-900 group/card">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="relative h-full flex p-5 md:p-6 gap-6">
                        {/* Left: Info */}
                        <div className="flex flex-col justify-between shrink-0 w-48 md:w-64">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-medium text-white/70 uppercase tracking-wider">
                                        Parceria
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-[10px] font-medium text-amber-300 uppercase tracking-wider">
                                        Estratégica
                                    </span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Dunga</h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Identidade visual premium e narrativa esportiva para o tetracampeão.
                                </p>
                            </div>
                            <p className="text-white/30 text-xs italic">
                                "Com garra, tudo é possível."
                            </p>
                        </div>

                        {/* Right: Browser Preview */}
                        <div className="flex-1 rounded-lg overflow-hidden border border-white/10 bg-black/40 group-hover/card:border-white/20 transition-colors">
                            <div className="h-7 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                <div className="ml-3 flex-1 max-w-[140px] h-4 rounded bg-white/5 flex items-center justify-center">
                                    <span className="text-[9px] text-white/30">dunga.com.br</span>
                                </div>
                            </div>
                            <div className="relative w-full h-[calc(100%-1.75rem)] overflow-hidden">
                                <img
                                    src="/dunga-preview.png"
                                    alt="Parceria Dunga"
                                    className="w-full h-full object-cover object-top group-hover/card:scale-[1.03] transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="h-80 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-6 flex flex-col justify-center items-center">
                    <span className="text-5xl md:text-6xl font-bold text-white">+15</span>
                    <p className="text-white/70 text-sm mt-2">Projetos Entregues</p>
                    <div className="mt-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-xs text-white">Design</span>
                        <span className="px-3 py-1 rounded-full bg-white/20 text-xs text-white">Dev</span>
                    </div>
                </div>
            </div>

            {/* Terceira linha - SaaS Dashboard */}
            <div className="grid grid-cols-1 gap-4 mt-4 max-w-7xl mx-auto px-6">
                <div className="h-48 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex items-center justify-between">
                    <div className="text-white">
                        <span className="px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-medium uppercase tracking-wider mb-3 inline-block">
                            Em Desenvolvimento
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-1">SaaS Dashboard</h3>
                        <p className="opacity-70 text-sm">React + Tailwind + Supabase</p>
                    </div>
                    <div className="w-32 h-20 bg-white/20 rounded-lg" />
                </div>
            </div>
        </section>
    );
};
