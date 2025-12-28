"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectShowcase } from "@/components/sections/showcase/ProjectShowcase";
import { TechStackMarquee } from "@/components/sections/features/TechStackMarquee";
import { RotatingHeadline } from "@/components/sections/hero/RotatingHeadline";
import { HeroChat } from "@/components/sections/hero/HeroChat";
import { DevPanel } from "@/components/layout/DevPanel";
import { Solutions } from "@/components/sections/features/Solutions";
import { BlogPreview } from "@/components/sections/features/BlogPreview";
import { Testimonials } from "@/components/sections/social/Testimonials";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { siteConfig, footerLinks } from "@/data";
import { HeroLogo } from "@/components/sections/hero/HeroLogo";
import { useI18n } from "@/lib/i18n";
import { PremiumDivider } from "@/components/ui/PremiumDivider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Registrar plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const { locale, t } = useI18n();
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
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%",
                            end: "top 20%",
                            toggleActions: "play none none reverse",
                        },
                    });
                });
            });

            // ─────────────────────────────────────
            // ANIMAÇÕES MOBILE (simplificadas)
            // ─────────────────────────────────────
            mm.add("(max-width: 767px)", () => {
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
                "name": "What does SupArt do?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We are an agency specialized in combining Premium Design, Artificial Intelligence, and Marketing Strategy to scale businesses worldwide."
                }
            },
            {
                "@type": "Question",
                "name": "How can AI help my business?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use AI to automate sales (SDR), generate content at scale, and create unique visuals, reducing costs and increasing efficiency."
                }
            },
            {
                "@type": "Question",
                "name": "Do you work with international clients?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our operation is 100% remote and we serve clients across Brazil, USA, Europe, and worldwide."
                }
            }
        ]
    };

    const heroSubtitle = t(
        "We transform your digital presence into a high-fidelity cinematic experience.",
        "Transformamos sua presença digital em uma experiência cinematográfica de alta fidelidade."
    );

    const ctaText = t("Start Project", "Iniciar Projeto");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {/* DevPanel - só aparece em desenvolvimento */}
            <DevPanel />

            {/* Floating Theme Toggle - Home Page Only */}
            <div className="fixed top-6 right-6 z-[60]">
                <ThemeToggle />
            </div>

            <main ref={mainRef} className="min-h-screen bg-transparent text-[var(--color-apple-black)] overflow-x-hidden selection:bg-[var(--color-apple-blue)] selection:text-white">

                {/* ═══════════════════════════════════════════
                    HERO SECTION - Com Spline 3D Background
                    ═══════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="hero-section relative min-h-screen flex flex-col items-center justify-center px-6 pb-24 overflow-hidden"
                >
                    {/* Spline 3D Background - Fixed Position to stay visible */}
                    <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none">
                        <iframe
                            src="https://my.spline.design/flowingribbon-TlkEaNrvCCNZuJBNJN3LXpRF"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            id="aura-spline"
                            title="Spline 3D Background"
                            style={{ pointerEvents: 'none' }}
                        />
                    </div>

                    {/* Conteúdo Hero */}
                    <div className="relative z-10 text-center max-w-5xl mx-auto pointer-events-none">
                        {/* Logo Animada */}
                        <motion.div
                            className="mb-6 flex justify-center pointer-events-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: isChatActive ? 0 : 1,
                                y: isChatActive ? -20 : 0,
                                scale: isChatActive ? 0.8 : 1,
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <HeroLogo size={140} />
                        </motion.div>

                        {/* Texto do Hero */}
                        <motion.div
                            className="hero-text pointer-events-auto"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{
                                opacity: isChatActive ? 0 : 1,
                                y: isChatActive ? -30 : 0,
                                scale: isChatActive ? 0.95 : 1,
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <RotatingHeadline />
                            <p className="text-lead text-[var(--color-apple-gray)] max-w-2xl mx-auto mt-5 mb-8">
                                {heroSubtitle}
                            </p>
                        </motion.div>

                        {/* Shiny CTA Removed as per user request */}
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto hidden md:block"
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
                {/* ═══════════════════════════════════════════
                    TECH STACK SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-white dark:bg-[var(--color-apple-off-white)]/80 dark:backdrop-blur-sm">
                    <TechStackMarquee />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    PROJECT SHOWCASE SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-white dark:bg-[var(--color-apple-off-white)]/80 dark:backdrop-blur-sm">
                    <ProjectShowcase />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    TESTIMONIALS SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10">
                    <Testimonials />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    SOLUTIONS SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10">
                    <Solutions />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    BLOG PREVIEW
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10">
                    <BlogPreview />
                </div>

                {/* ═══════════════════════════════════════════
                    FOOTER
                    ═══════════════════════════════════════════ */}
                <footer className="bg-[var(--color-apple-off-white)] dark:bg-black py-32 border-t border-black/5 dark:border-white/10 transition-colors duration-500">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                            <div className="col-span-2 md:col-span-1">
                                <h4 className="font-semibold mb-6 dark:text-white">{siteConfig.name}</h4>
                                <p className="text-sm text-[var(--color-apple-gray)] dark:text-gray-400 leading-relaxed max-w-xs">
                                    {siteConfig.description[locale]}
                                </p>
                                {/* Availability Badge */}
                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    {siteConfig.availability[locale]}
                                </div>
                            </div>

                            {footerLinks.map((col, i) => (
                                <div key={i}>
                                    <h4 className="font-semibold mb-6 text-sm dark:text-white">{col.title[locale]}</h4>
                                    <ul className="space-y-4">
                                        {col.links.map((link) => (
                                            <li key={link.label.en}>
                                                <a href={link.href} className="text-sm text-[var(--color-apple-gray)] dark:text-gray-400 hover:text-[var(--color-apple-black)] dark:hover:text-white transition-colors">
                                                    {link.label[locale]}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-[var(--color-apple-gray)] dark:text-gray-500">
                                {siteConfig.copyright[locale]}
                            </p>
                            <p className="text-xs text-[var(--color-apple-gray)] dark:text-gray-500">
                                {siteConfig.location}
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
