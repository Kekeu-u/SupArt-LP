"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// ═══════════════════════════════════════════════════════════════════════════
// LAZY IMPORTS - Carregados sob demanda para performance
// ═══════════════════════════════════════════════════════════════════════════
const ProjectShowcase = dynamic(
    () => import("@/components/sections/showcase/ProjectShowcase").then((mod) => mod.ProjectShowcase),
    { ssr: true }
);
const Solutions = dynamic(
    () => import("@/components/sections/features/Solutions").then((mod) => mod.Solutions),
    { ssr: true }
);
const BlogPreview = dynamic(
    () => import("@/components/sections/features/BlogPreview").then((mod) => mod.BlogPreview),
    { ssr: true }
);
const Testimonials = dynamic(
    () => import("@/components/sections/social/Testimonials").then((mod) => mod.Testimonials),
    { ssr: true }
);

// ═══════════════════════════════════════════════════════════════════════════
// IMPORTS SÍNCRONOS - Críticos para First Paint
// ═══════════════════════════════════════════════════════════════════════════
import { TechStackMarquee } from "@/components/sections/features/TechStackMarquee";
import { DevPanel } from "@/components/layout/DevPanel";
import { siteConfig, footerLinks } from "@/data";
import { HeroLogo } from "@/components/sections/hero/HeroLogo";
import { RotatingHeadline } from "@/components/hero/RotatingHeadline";
import { useI18n } from "@/lib/i18n";
import { PremiumDivider } from "@/components/ui/PremiumDivider";
import { Method } from "@/components/sections/Method";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";

export default function Home() {
    const { locale, t } = useI18n();
    const mainRef = useRef<HTMLElement>(null);

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
        "We transform businesses with Elite Design and AI. From strategy to automation.",
        "Transformamos negócios com Design de Elite e IA. Da estratégia à automação."
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

            <main ref={mainRef} className="min-h-screen bg-transparent overflow-x-hidden selection:bg-[var(--color-apple-blue)] selection:text-white">

                {/* ═══════════════════════════════════════════
                    HERO SECTION - REFATORADO (3 camadas)
                    ═══════════════════════════════════════════ */}
                <section id="home" className="relative min-h-screen flex items-center justify-center px-8 md:px-16">
                    {/* Camada única de conteúdo */}
                    <motion.div
                        className="text-center max-w-4xl mx-auto mt-[10vh]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <HeroLogo size={100} className="mx-auto mb-4" />
                        <RotatingHeadline />
                        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-6 leading-relaxed">
                            {heroSubtitle}
                        </p>
                        <a
                            href="#method"
                            className="inline-block px-6 py-3 rounded-full bg-black text-white font-semibold text-base hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
                        >
                            {t("Understand how it works", "Entender como funciona")}
                        </a>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
                        <div className="w-6 h-10 rounded-full border-2 border-black/20 flex items-start justify-center p-1 animate-bounce">
                            <div className="w-1.5 h-3 rounded-full bg-black/30" />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    TECH STACK SECTION
                    ═══════════════════════════════════════════ */}
                {/* ═══════════════════════════════════════════
                    TECH STACK SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <TechStackMarquee />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    METHOD SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <Method />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    SOLUTIONS SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <Solutions />
                </div>



                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    PROJECT SHOWCASE SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <ProjectShowcase />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    TESTIMONIALS SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <Testimonials />
                </div>

                <PremiumDivider className="my-0" />



                {/* ═══════════════════════════════════════════
                    BLOG PREVIEW
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <BlogPreview />
                </div>

                <PremiumDivider className="my-0" />

                {/* ═══════════════════════════════════════════
                    DIAGNOSTIC SECTION
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <DiagnosticSection />
                </div>

                {/* ═══════════════════════════════════════════
                    FOOTER
                    ═══════════════════════════════════════════ */}
                <footer className="bg-[var(--color-apple-off-white)] py-32 border-t border-black/5 transition-colors duration-500">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                            <div className="col-span-2 md:col-span-1">
                                <h4 className="font-semibold mb-6">{siteConfig.name}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                                    {siteConfig.description[locale]}
                                </p>
                                {/* Availability Badge */}
                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-green-200 text-green-800 text-xs font-medium shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    {siteConfig.availability[locale]}
                                </div>
                            </div>

                            {footerLinks.map((col, i) => (
                                <div key={i}>
                                    <h4 className="font-semibold mb-6 text-sm">{col.title[locale]}</h4>
                                    <ul className="space-y-4">
                                        {col.links.map((link) => (
                                            <li key={link.label.en}>
                                                <a href={link.href} className="text-sm text-gray-600 hover:text-[var(--color-apple-black)] transition-colors">
                                                    {link.label[locale]}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-gray-500">
                                {siteConfig.copyright[locale]}
                            </p>
                            <p className="text-xs text-gray-500">
                                {siteConfig.location}
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
