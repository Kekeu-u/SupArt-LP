"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { HeroChat } from "@/components/HeroChat";
import { DevPanel } from "@/components/DevPanel";
import { Solutions } from "@/components/Solutions";
import { siteConfig, footerLinks } from "@/data";

// Registrar plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const [isChatActive, setIsChatActive] = useState(false);
    const mainRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    // ═══════════════════════════════════════════
    // ANIMAÇÕES GSAP - IMPRESSIONANTES E LEVES
    // ═══════════════════════════════════════════
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // ─────────────────────────────────────
            // ANIMAÇÕES DESKTOP
            // ─────────────────────────────────────
            mm.add("(min-width: 768px)", () => {
                // Floating Orbs parallax suave
                gsap.to(".orb-1", {
                    y: "30%",
                    x: "10%",
                    scale: 1.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top top",
                        end: "50% top",
                        scrub: 0.5,
                    },
                });

                gsap.to(".orb-2", {
                    y: "50%",
                    x: "-15%",
                    scale: 0.9,
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top top",
                        end: "60% top",
                        scrub: 0.7,
                    },
                });

                gsap.to(".orb-3", {
                    y: "40%",
                    x: "20%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top top",
                        end: "70% top",
                        scrub: 0.6,
                    },
                });

                // Hero text parallax + fade
                gsap.to(".hero-text", {
                    y: "-15%",
                    opacity: 0,
                    filter: "blur(8px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top top",
                        end: "35% top",
                        scrub: 0.3,
                    },
                });

                // Hero CTA parallax
                gsap.to(".hero-cta", {
                    y: "-25%",
                    opacity: 0.3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top top",
                        end: "40% top",
                        scrub: 0.4,
                    },
                });

                // Section reveals com perspectiva 3D
                gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
                    gsap.from(section, {
                        y: 50, // Reduzido de 80 para menos movimento
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%", // Começa mais cedo
                            end: "top 20%",
                            toggleActions: "play none none reverse", // Permite reverter suavemente
                        },
                    });
                });
            });

            // ─────────────────────────────────────
            // ANIMAÇÕES MOBILE (simplificadas)
            // ─────────────────────────────────────
            mm.add("(max-width: 767px)", () => {
                // Apenas fade simples no hero
                gsap.to(".hero-text", {
                    opacity: 0.5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top top",
                        end: "30% top",
                        scrub: 0.3,
                    },
                });
            });

            // Forçar recálculo após montagem para garantir precisão
            // Útil se houver imagens carregando acima que mudam o layout
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1000);

            return () => {
                mm.revert();
                clearTimeout(timer);
            };
        },
        { scope: mainRef, dependencies: [] }
    );

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "O que a SupArt faz?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Somos uma agência especializada em unir Design Premium, Inteligência Artificial e Estratégia de Marketing para escalar negócios."
                }
            },
            {
                "@type": "Question",
                "name": "Como a IA pode ajudar minha empresa?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Utilizamos IA para automatizar vendas (SDR), gerar conteúdo em escala e criar visuais únicos, reduzindo custos e aumentando a eficiência."
                }
            },
            {
                "@type": "Question",
                "name": "Vocês atendem todo o Brasil?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim, nossa operação é 100% digital e atendemos clientes em todo o Brasil e no exterior."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {/* DevPanel - só aparece em desenvolvimento */}
            <DevPanel />

            <main ref={mainRef} className="min-h-screen bg-[var(--color-apple-off-white)] text-[var(--color-apple-black)] overflow-x-hidden selection:bg-[var(--color-apple-blue)] selection:text-white">

                {/* ═══════════════════════════════════════════
                    HERO SECTION - Com Floating Orbs
                    ═══════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="hero-section relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
                >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-mesh opacity-50" />

                    {/* Floating Orbs - Tamanhos responsivos para não causar overflow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Orb 1 - Roxo grande */}
                        <div className="orb-1 absolute top-1/4 left-1/4 w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full bg-gradient-radial from-purple-400/30 via-purple-500/10 to-transparent blur-3xl transform-gpu" />

                        {/* Orb 2 - Azul médio */}
                        <div className="orb-2 absolute top-1/2 right-1/4 w-[min(450px,60vw)] h-[min(450px,60vw)] rounded-full bg-gradient-radial from-blue-400/25 via-cyan-400/10 to-transparent blur-3xl transform-gpu" />

                        {/* Orb 3 - Rosa pequeno */}
                        <div className="orb-3 absolute bottom-1/4 left-1/3 w-[min(300px,50vw)] h-[min(300px,50vw)] rounded-full bg-gradient-radial from-pink-400/20 to-transparent blur-2xl transform-gpu" />
                    </div>

                    {/* Noise Grain Texture */}
                    <div className="absolute inset-0 opacity-[0.015] pointer-events-none noise-texture" />

                    {/* Conteúdo Hero */}
                    <div className="relative z-10 text-center max-w-5xl mx-auto">
                        {/* Texto do Hero */}
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{
                                opacity: isChatActive ? 0 : 1,
                                y: isChatActive ? -30 : 0,
                                scale: isChatActive ? 0.95 : 1,
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <RotatingHeadline />
                            <p className="text-lead text-[var(--color-apple-gray)] max-w-2xl mx-auto mt-6">
                                Transformamos sua presença digital em uma experiência cinematográfica de alta fidelidade.
                            </p>
                        </motion.div>

                        {/* Chat CTA */}
                        <div className="hero-cta">
                            <HeroChat onStateChange={setIsChatActive} />
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <motion.div
                            className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-1"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="w-1.5 h-3 rounded-full bg-black/30" />
                        </motion.div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════
                    TECH STACK SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal">
                    <TechStackMarquee />
                </div>

                {/* ═══════════════════════════════════════════
                    PROJECT SHOWCASE SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal">
                    <ProjectShowcase />
                </div>

                {/* ═══════════════════════════════════════════
                    SOLUTIONS SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal">
                    <Solutions />
                </div>

                {/* ═══════════════════════════════════════════
                    FOOTER
                    ═══════════════════════════════════════════ */}
                <footer className="bg-[var(--color-apple-off-white)] py-32 border-t border-black/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                            <div className="col-span-2 md:col-span-1">
                                <h4 className="font-semibold mb-6">{siteConfig.name}</h4>
                                <p className="text-sm text-[var(--color-apple-gray)] leading-relaxed max-w-xs">
                                    {siteConfig.description}
                                </p>
                            </div>

                            {footerLinks.map((col, i) => (
                                <div key={i}>
                                    <h4 className="font-semibold mb-6 text-sm">{col.title}</h4>
                                    <ul className="space-y-4">
                                        {col.links.map((link) => (
                                            <li key={link.label}>
                                                <a href={link.href} className="text-sm text-[var(--color-apple-gray)] hover:text-[var(--color-apple-black)] transition-colors">
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-[var(--color-apple-gray)]">
                                {siteConfig.copyright}
                            </p>
                            <p className="text-xs text-[var(--color-apple-gray)]">
                                {siteConfig.location}
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
