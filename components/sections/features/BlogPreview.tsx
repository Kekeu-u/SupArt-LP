"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRocket, FaLightbulb } from "react-icons/fa";

export const BlogPreview = () => {
    const { locale } = useI18n();

    // Content data
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
            },
            {
                category: { en: "Marketing", pt: "Marketing" },
                title: { en: "15 Mental Triggers that Increase Sales by 300%", pt: "15 Gatilhos Mentais que Aumentam Vendas em 300%" },
                excerpt: { en: "Powerful psychological triggers", pt: "Gatilhos psicológicos poderosos" },
                gradient: "from-pink-500 to-purple-600",
                textGradient: "group-hover:from-pink-600 group-hover:to-purple-600",
                icon: SiGoogleanalytics,
            },
            {
                category: { en: "SEO", pt: "SEO" },
                title: { en: "SEO for Landing Pages: Rank on Google in 30 Days", pt: "SEO para Landing Pages: Ranquear no Google em 30 Dias" },
                excerpt: { en: "Proven strategies and technical checklist", pt: "Estratégias comprovadas e checklist técnico" },
                gradient: "from-teal-500 to-green-600",
                textGradient: "group-hover:from-teal-600 group-hover:to-green-600",
                icon: FaLightbulb,
            }
        ],
        cta: {
            en: "Explore Our Blog",
            pt: "Conheça Nosso Blog"
        }
    };

    return (
        <section className="relative py-20 bg-transparent z-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
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
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-apple-black)] dark:text-white mb-4">
                        {content.title[locale]}
                    </h2>
                    <p className="text-lg text-[var(--color-apple-gray)] dark:text-gray-400 max-w-2xl mx-auto">
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
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <a href="/blog" className="block h-full no-underline">
                                    <PremiumCard
                                        variant="transparent"
                                        className="h-full p-8 flex flex-col group bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/30 dark:hover:border-purple-500/50"
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
                                        <h3 className={`text-xl font-bold text-[var(--color-apple-black)] dark:text-white mb-3 bg-gradient-to-r ${post.textGradient} group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight`}>
                                            {post.title[locale]}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-[var(--color-apple-gray)] dark:text-gray-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                                            {post.excerpt[locale]}
                                        </p>

                                        {/* Arrow Icon */}
                                        <div className={`mt-auto flex items-center text-sm font-bold text-gray-900 dark:text-white bg-gradient-to-r ${post.textGradient} group-hover:text-transparent group-hover:bg-clip-text transition-all`}>
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
