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
import { AiAgents } from "@/components/sections/AiAgents";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
    const { locale, t } = useI18n();
    const mainRef = useRef<HTMLElement>(null);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": t("What does SupArt do?", "O que a SupArt faz?"),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t(
                        "We are an agency specialized in combining Premium Design, Artificial Intelligence, and Marketing Strategy to scale businesses worldwide.",
                        "Somos uma agência especializada em combinar Design Premium, Inteligência Artificial e Estratégia de Marketing para escalar negócios globalmente."
                    )
                }
            },
            {
                "@type": "Question",
                "name": t("How can AI help my business?", "Como a IA pode ajudar meu negócio?"),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t(
                        "We use AI to automate sales (SDR), generate content at scale, and create unique visuals, reducing costs and increasing efficiency.",
                        "Usamos IA para automatizar vendas (SDR), gerar conteúdo em escala e criar visuais únicos, reduzindo custos e aumentando a eficiência."
                    )
                }
            },
            {
                "@type": "Question",
                "name": t("Do you work with international clients?", "Vocês atendem clientes internacionais?"),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t(
                        "Yes, our operation is 100% remote and we serve clients across Brazil, USA, Europe, and worldwide.",
                        "Sim, nossa operação é 100% remota e atendemos clientes no Brasil, EUA, Europa e em todo o mundo."
                    )
                }
            }
        ]
    };

    const heroSubtitle = t(
        "Design that sells. Automation that scales. Strategy that converts.",
        "Design que vende. Automação que escala. Estratégia que converte."
    );

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
                    HERO SECTION - ORIGINAL RESTORED
                    ═══════════════════════════════════════════ */}
                <section id="home" className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
                    <VideoBackground />
                    {/* Camada única de conteúdo */}
                    <motion.div
                        className="text-center w-full max-w-[90vw] md:max-w-4xl mx-auto z-10 -mt-16 md:-mt-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <HeroLogo size={110} className="mx-auto mb-6 w-24 h-24 md:w-32 md:h-32" />
                        <RotatingHeadline />
                        <div className="w-full py-2">
                            <p className="text-sm sm:text-base md:text-xl text-gray-400 max-w-full mx-auto leading-relaxed font-light tracking-wide md:whitespace-nowrap px-4">
                                <span className="shimmer-silver inline-block">{heroSubtitle}</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator - Posicionado com bottom-safe - DESKTOP ONLY */}
                    <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 items-start justify-center p-1 animate-bounce backdrop-blur-sm rounded-full border-2 border-white/20 w-6 h-10">
                        <div className="w-1.5 h-3 rounded-full bg-white/50" />
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTIONS BELOW
                    ═══════════════════════════════════════════ */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <TechStackMarquee />
                </div>

                <PremiumDivider className="my-0" />

                <div className="section-reveal relative z-10 bg-transparent">
                    <Method />
                </div>

                <PremiumDivider className="my-0" />

                <div className="section-reveal relative z-10 bg-transparent">
                    <AiAgents />
                </div>

                <PremiumDivider className="my-0" />

                <div className="section-reveal relative z-10 bg-transparent">
                    <Solutions />
                </div>

                <PremiumDivider className="my-0" />

                <div className="section-reveal relative z-10 bg-transparent">
                    <ProjectShowcase />
                </div>

                <PremiumDivider className="my-0" />

                <div className="section-reveal relative z-10 bg-transparent">
                    <Testimonials />
                </div>

                <div className="section-reveal relative z-10 bg-transparent">
                    <BlogPreview />
                </div>

                <PremiumDivider className="my-0" />

                {/* DiagnosticSection - Última seção antes do Footer */}
                <div className="section-reveal relative z-10 bg-transparent">
                    <DiagnosticSection />
                </div>

            </main>
            <Footer />
        </>
    );
}
