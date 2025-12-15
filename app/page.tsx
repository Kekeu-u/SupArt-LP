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
import { services, footerLinks, siteConfig } from "@/data";

// Registrar plugin e configurar para FPS ilimitado
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    // FPS ilimitado - sem limites para monitores de alta taxa
    gsap.ticker.fps(-1);
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
                        y: 80,
                        opacity: 0,
                        scale: 0.95,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            end: "top 20%",
                            toggleActions: "play none none none",
                        },
                    });
                });

                // Service cards stagger reveal
                gsap.from(".service-card", {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
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

            return () => mm.revert();
        },
        { scope: mainRef, dependencies: [] }
    );

    return (
        <>
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

                    {/* Floating Orbs - Leves e Impressionantes */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Orb 1 - Roxo grande */}
                        <div className="orb-1 absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-400/30 via-purple-500/10 to-transparent blur-3xl transform-gpu" />

                        {/* Orb 2 - Azul médio */}
                        <div className="orb-2 absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-radial from-blue-400/25 via-cyan-400/10 to-transparent blur-3xl transform-gpu" />

                        {/* Orb 3 - Rosa pequeno */}
                        <div className="orb-3 absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-radial from-pink-400/20 to-transparent blur-2xl transform-gpu" />
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
                    SERVICES SECTION
                    ═══════════════════════════════════════════ */}
                <section className="section-reveal px-6 py-32 bg-white relative overflow-hidden">
                    {/* Background Gradient Sutil */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-semibold tracking-tight mb-20 text-center"
                        >
                            Soluções
                        </motion.h2>

                        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((service, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "service-card group relative p-8 rounded-[32px] border border-black/5 bg-gradient-to-br hover:shadow-2xl transition-all duration-500 hover:-translate-y-2",
                                        service.gradient
                                    )}
                                >
                                    <div className="h-48 mb-8 rounded-2xl bg-white/50 backdrop-blur-sm shadow-inner flex items-center justify-center overflow-hidden">
                                        {/* Animated gradient on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: "1s" }} />
                                        <span className="text-[var(--color-apple-gray)] font-medium opacity-50">Product Shot</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                                    <p className="text-[var(--color-apple-gray)] mb-6 leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-sm font-medium text-[var(--color-apple-black)]">{service.price}</span>
                                        <button className="w-10 h-10 rounded-full bg-[var(--color-apple-black)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 hover:scale-110">
                                            →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

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
