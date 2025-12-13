"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { companies, technologies } from "@/data/tech-stack";

const marqueeCompanies = [...companies, ...companies, ...companies];

// Easing suave
const ease: [number, number, number, number] = [0.32, 0.72, 0, 1];

// Card simples sem glow para evitar bugs
const TechCard = ({ tech, index, isExpanded, onToggle }: {
    tech: typeof technologies[0],
    index: number,
    isExpanded: boolean,
    onToggle: () => void
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease }}
            onClick={(e) => {
                e.stopPropagation(); // Previne propagação para o backdrop
                onToggle();
            }}
            className="relative cursor-pointer group"
        >
            {/* Card container */}
            <div
                className={`
                    relative bg-white rounded-xl border overflow-hidden
                    transition-all duration-300
                    ${isExpanded
                        ? 'border-gray-200 shadow-xl'
                        : 'border-gray-100 group-hover:border-gray-200 group-hover:shadow-lg'}
                `}
            >
                {/* Content */}
                <div className="p-3 sm:p-4">
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

                    {/* Icon */}
                    <motion.div
                        animate={{
                            width: isExpanded ? 48 : 32,
                            height: isExpanded ? 48 : 32,
                        }}
                        transition={{ duration: 0.3, ease }}
                        className={`rounded-xl flex items-center justify-center bg-gradient-to-br ${tech.gradient} group-hover:scale-105 transition-transform duration-300`}
                    >
                        <motion.span
                            animate={{ fontSize: isExpanded ? 20 : 12 }}
                            transition={{ duration: 0.3, ease }}
                            className="font-bold text-white"
                        >
                            {tech.letter}
                        </motion.span>
                    </motion.div>

                    {/* Title & Description */}
                    <div className="mt-2">
                        <motion.h3
                            animate={{ fontSize: isExpanded ? 18 : 11 }}
                            transition={{ duration: 0.3, ease }}
                            className="font-semibold text-gray-900 leading-tight"
                        >
                            {tech.name}
                        </motion.h3>

                        <motion.p
                            animate={{ fontSize: isExpanded ? 13 : 9 }}
                            transition={{ duration: 0.3, ease }}
                            className="text-gray-500 leading-tight"
                        >
                            {tech.description}
                        </motion.p>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence mode="sync">
                        {isExpanded && (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease }}
                                className="overflow-hidden"
                            >
                                <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {tech.detail}
                                    </p>

                                    {/* Stats */}
                                    <div className="space-y-2">
                                        {Object.entries(tech.stats).map(([key, value], i) => (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease }}
                                            >
                                                <div className="flex justify-between text-[10px] mb-0.5">
                                                    <span className="text-gray-400 capitalize">{key}</span>
                                                    <span className="text-gray-600 font-medium">{value}%</span>
                                                </div>
                                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${value}%` }}
                                                        transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                                                        className={`h-full rounded-full bg-gradient-to-r ${tech.gradient}`}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {tech.features.map((feature, i) => (
                                            <motion.span
                                                key={feature}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.25 + i * 0.05, duration: 0.3, ease }}
                                                className={`px-2 py-0.5 text-[10px] font-medium rounded-full bg-gradient-to-r ${tech.gradient} text-white`}
                                            >
                                                {feature}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <p className="text-[9px] text-gray-300 text-center pt-1">
                                        Toque fora para fechar
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Expand hint */}
                {!isExpanded && (
                    <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gray-100/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-1.5 h-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const TechStackMarquee = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Fechar ao clicar fora (estilo Apple)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (expandedIndex !== null && cardsRef.current && !cardsRef.current.contains(event.target as Node)) {
                setExpandedIndex(null);
            }
        };

        // Adiciona listeners para mouse e touch
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [expandedIndex]);

    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setExpandedIndex(null);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section className="py-12 md:py-16 bg-[var(--color-apple-off-white)] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <span className="text-xs font-medium text-[var(--color-apple-gray)] uppercase tracking-widest">
                            Powered by
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" className="h-8 w-auto">
                            <mask height="180" id="nextjs-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
                                <circle cx="90" cy="90" fill="black" r="90" />
                            </mask>
                            <g mask="url(#nextjs-mask)">
                                <circle cx="90" cy="90" fill="black" r="90" />
                                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#nextjs-gradient1)" />
                                <rect fill="url(#nextjs-gradient2)" height="72" width="12" x="115" y="54" />
                            </g>
                            <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" id="nextjs-gradient1" x1="109" x2="144.5" y1="116.5" y2="160.5">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient gradientUnits="userSpaceOnUse" id="nextjs-gradient2" x1="121" x2="120.799" y1="54" y2="106.875">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <p className="text-base md:text-lg text-[var(--color-apple-gray)]">
                        A mesma tecnologia escolhida pelos líderes globais.
                    </p>
                </motion.div>

                {/* Marquee de Logos */}
                <div className="relative overflow-hidden mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[var(--color-apple-off-white)] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[var(--color-apple-off-white)] to-transparent z-10 pointer-events-none" />

                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex gap-10 md:gap-16 items-center py-3"
                            animate={{ x: "-50%" }}
                            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
                        >
                            {marqueeCompanies.map((company, i) => (
                                <a
                                    key={i}
                                    href={company.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 h-10 w-28 flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                >
                                    <img src={company.logo} alt={company.name} className="max-h-7 max-w-full w-auto object-contain" />
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Tech Cards Grid */}
                <div ref={cardsRef} className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
                    {technologies.map((tech, index) => (
                        <TechCard
                            key={tech.name}
                            tech={tech}
                            index={index}
                            isExpanded={expandedIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center gap-8 sm:gap-16 pt-6 border-t border-black/5"
                >
                    {[
                        { value: "99.9%", label: "Uptime" },
                        { value: "<50ms", label: "Resposta" },
                        { value: "100%", label: "SEO" }
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            className="text-center group cursor-default"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, ease }}
                        >
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-apple-black)] group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                {stat.value}
                            </div>
                            <div className="text-[10px] sm:text-xs text-[var(--color-apple-gray)]">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
