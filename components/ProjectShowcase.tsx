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
            className="relative h-full w-full flex items-center justify-center perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        rotate: isHovered ? (i - 1) * 10 : 0,
                        x: isHovered ? (i - 1) * 40 : 0,
                        y: isHovered ? -20 : 0,
                        scale: isHovered ? 1 : 1 - i * 0.05,
                        zIndex: 3 - i,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={cn(
                        "absolute w-48 h-64 rounded-xl shadow-xl border border-white/20 flex flex-col items-center justify-center p-4 text-center",
                        i === 0 ? "bg-white text-black" : "bg-[var(--color-apple-black)] text-white"
                    )}
                    style={{
                        top: '50%',
                        left: '50%',
                        marginLeft: '-6rem', // half of width
                        marginTop: '-8rem', // half of height
                    }}
                >
                    {i === 0 && (
                        <>
                            <h4 className="font-bold text-lg mb-2">Apresentação</h4>
                            <p className="text-xs text-gray-500">Passe o mouse para expandir</p>
                        </>
                    )}
                    {i === 1 && <h4 className="font-bold text-lg">Estratégia</h4>}
                    {i === 2 && <h4 className="font-bold text-lg">Resultados</h4>}
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
                {/* Site 1 - Large Tilt Card */}
                <BentoCard colSpan={2} className="p-0 overflow-visible bg-transparent border-none shadow-none">
                    <TiltCard className="bg-gradient-to-br from-blue-500 to-purple-600">
                        <div className="text-white text-center">
                            <h3 className="text-3xl font-bold mb-2">E-Commerce Future</h3>
                            <p className="opacity-80">Next.js + Shopify</p>
                            {/* Placeholder for Site Screenshot */}
                            <div className="mt-4 w-full h-32 bg-white/20 rounded-lg backdrop-blur-md" />
                        </div>
                    </TiltCard>
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
