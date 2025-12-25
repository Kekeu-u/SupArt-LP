"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRocket, FaLightbulb } from "react-icons/fa";

export const BlogPreview = () => {
    const { locale } = useI18n();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects for cards - "Surge e Volte" (Rise and Return)
    // Cards start lower/faded, rise to center/full opacity, then fade out/lower again
    // This creates a "wave" effect that feels addictive to scroll through
    const y1 = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 100]);
    const y2 = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, 150]);
    const y3 = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, 200]);

    const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.6, 1, 0.6]);
    const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.9, 1, 0.9]);

    const buttonY = useTransform(scrollYProgress, [0.7, 1], [0, 100]);
    const buttonOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    const content = {
        title: {
            en: "Insights that Drive Results",
            pt: "Insights que Geram Resultados"
        },
        subtitle: {
            en: "Learn strategies that leading companies use to dominate their markets.",
            pt: "Aprenda as estratégias que empresas líderes usam para dominar seus mercados."
        },
        posts: [
            {
                category: { en: "Landing Pages", pt: "Landing Pages" },
                title: { en: "How to Create High-Converting Landing Pages", pt: "Como Criar Landing Pages de Alta Conversão" },
                excerpt: { en: "Essential strategies and elements", pt: "Estratégias e elementos essenciais" },
                gradient: "from-purple-500 to-blue-600",
                textGradient: "group-hover:from-purple-600 group-hover:to-blue-600",
                icon: FaRocket,
                y: y1
            },
            {
                category: { en: "Marketing", pt: "Marketing" },
                title: { en: "15 Mental Triggers that Increase Sales by 300%", pt: "15 Gatilhos Mentais que Aumentam Vendas em 300%" },
                excerpt: { en: "Powerful psychological triggers", pt: "Gatilhos psicológicos poderosos" },
                gradient: "from-pink-500 to-purple-600",
                textGradient: "group-hover:from-pink-600 group-hover:to-purple-600",
                icon: SiGoogleanalytics,
                y: y2
            },
            {
                category: { en: "SEO", pt: "SEO" },
                title: { en: "SEO for Landing Pages: Rank on Google in 30 Days", pt: "SEO para Landing Pages: Ranquear no Google em 30 Dias" },
                excerpt: { en: "Proven strategies and technical checklist", pt: "Estratégias comprovadas e checklist técnico" },
                gradient: "from-teal-500 to-green-600",
                textGradient: "group-hover:from-teal-600 group-hover:to-green-600",
                icon: FaLightbulb,
                y: y3
            }
        ],
        cta: {
            en: "Explore Our Blog",
            pt: "Conheça Nosso Blog"
        }
    };

    return (
        <section ref={containerRef} className="relative py-20 bg-[#F5F5F7] z-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-apple-black)] mb-4">
                        {content.title[locale]}
                    </h2>
                    <p className="text-lg text-[var(--color-apple-gray)] max-w-2xl mx-auto">
                        {content.subtitle[locale]}
                    </p>
                </motion.div>

                {/* Blog Preview Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                    {content.posts.map((post, index) => {
                        const Icon = post.icon;
                        return (
                            <motion.div
                                key={index}
                                style={{ y: post.y, opacity, scale }}
                                className="h-full"
                            >
                                <a href="/blog" className="block h-full no-underline">
                                    <PremiumCard
                                        variant="transparent"
                                        className="h-full p-8 flex flex-col group bg-white border border-black/5 shadow-xl transition-all duration-500"
                                    >
                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${post.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>

                                        {/* Category */}
                                        <span className={`text-xs font-bold uppercase tracking-wider mb-3 bg-gradient-to-r ${post.gradient} bg-clip-text text-transparent opacity-80`}>
                                            {post.category[locale]}
                                        </span>

                                        {/* Title */}
                                        <h3 className={`text-xl font-bold text-[var(--color-apple-black)] mb-3 bg-gradient-to-r ${post.textGradient} group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight`}>
                                            {post.title[locale]}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-[var(--color-apple-gray)] line-clamp-3 mb-6 flex-grow leading-relaxed">
                                            {post.excerpt[locale]}
                                        </p>

                                        {/* Arrow Icon */}
                                        <div className={`mt-auto flex items-center text-sm font-bold text-gray-900 bg-gradient-to-r ${post.textGradient} group-hover:text-transparent group-hover:bg-clip-text transition-all`}>
                                            <span>{locale === "en" ? "Read more" : "Ler mais"}</span>
                                            <svg className="w-4 h-4 ml-2 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </PremiumCard>
                                </a>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <motion.div
                    style={{ y: buttonY, opacity: buttonOpacity }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center"
                >
                    <ShinyButton href="/blog">
                        {content.cta[locale]}
                    </ShinyButton>
                </motion.div>
            </div>
        </section>
    );
};
