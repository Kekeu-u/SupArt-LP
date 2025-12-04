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

            <BentoGrid className="auto-rows-[400px]">
                {/* Site 1 - Large Tilt Card - ADESP/RS */}
                <BentoCard colSpan={2} className="p-0 overflow-visible bg-transparent border-none shadow-none group/card">
                    <a href="https://adesprs.org.br/" target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                        <TiltCard className="relative overflow-hidden bg-gradient-to-br from-[#0a2e1d] via-[#1a1a1a] to-[#3d0a0a]"> {/* Darker, richer gradient */}
                            {/* Background Noise/Texture */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                                {/* Header Content */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] font-medium text-white/80 uppercase tracking-wider">
                                                Non-Profit
                                            </span>
                                            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] font-medium text-white/80 uppercase tracking-wider">
                                                Institutional
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-bold text-white tracking-tight mb-2">ADESP/RS</h3>
                                        <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                                            Transformando vidas através do esporte e educação. Uma plataforma digital robusta para uma missão nobre.
                                        </p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/card:bg-white group-hover/card:text-black transition-colors duration-300">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </div>
                                </div>

                                {/* Browser Mockup Image */}
                                <div className="mt-8 relative w-full flex-1 min-h-[200px] rounded-t-xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm group-hover/card:translate-y-[-10px] transition-transform duration-500">
                                    {/* Browser Header */}
                                    <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                        <div className="ml-4 h-4 w-32 rounded-full bg-white/5" />
                                    </div>
                                    {/* Image */}
                                    <div className="relative w-full h-full overflow-hidden">
                                        <img
                                            src="/adesp-preview.png"
                                            alt="ADESP/RS Website Preview"
                                            className="w-full h-full object-cover object-top transform group-hover/card:scale-105 transition-transform duration-700"
                                        />
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </a>
                </BentoCard>

                {/* Presentation - Interactive Deck */}
                <BentoCard colSpan={1} className="bg-[var(--color-apple-off-white)] border border-black/5 overflow-visible">
                    <DeckCard />
                </BentoCard>

                {/* Site 2 - Vertical Tilt Card */}
                <BentoCard colSpan={1} className="p-0 overflow-visible bg-transparent border-none shadow-none">
                    <TiltCard className="bg-gradient-to-br from-emerald-500 to-teal-600">
                        <div className="text-white text-center">
                            <h3 className="text-2xl font-bold mb-2">SaaS Dashboard</h3>
                            <p className="opacity-80">React + Tailwind</p>
                            {/* Placeholder for Site Screenshot */}
                            <div className="mt-4 w-full h-32 bg-white/20 rounded-lg backdrop-blur-md" />
                        </div>
                    </TiltCard>
                </BentoCard>
            </BentoGrid>
        </section>
    );
};
