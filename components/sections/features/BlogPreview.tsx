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
            pt: "Estratégias validadas de Design, IA e Vendas para escalar sua operação."
        },
        posts: [
            {
                slug: "clientes-2k-custam-mais-que-15k",
                category: { en: "Business", pt: "Negócios" },
                title: { en: "Why $2k Clients Cost More Than $15k Clients", pt: "Por Que Clientes de R$2k Custam Mais que Clientes de R$15k" },
                excerpt: { en: "The math behind high-ticket positioning.", pt: "A matemática por trás do posicionamento High-Ticket e como atrair os melhores projetos." },
                gradient: "from-blue-500 to-cyan-600",
                textGradient: "group-hover:from-blue-600 group-hover:to-cyan-600",
                icon: FaRocket,
            },
            {
                slug: "5-automacoes-eliminam-10-horas-semana",
                category: { en: "Automation", pt: "Automação" },
                title: { en: "5 Automations That Eliminate 10 Hours/Week", pt: "As 5 Automações que Eliminam 10 Horas/Semana da sua Agência" },
                excerpt: { en: "Scale your operation without hiring more people.", pt: "Escalando sua operação operacional sem precisar contratar mais gente imediatamente." },
                gradient: "from-gray-500 to-slate-600",
                textGradient: "group-hover:from-gray-600 group-hover:to-slate-600",
                icon: SiGoogleanalytics,
            },
            {
                slug: "roi-design-alta-fidelidade",
                category: { en: "Design", pt: "Design" },
                title: { en: "The ROI of High-Fidelity Design", pt: "O ROI do Design de Alta Fidelidade: Convertendo Visitantes em Fãs" },
                excerpt: { en: "How premium aesthetics drive conversion.", pt: "Como a estética premium aumenta a percepção de valor e a taxa de conversão." },
                gradient: "from-teal-500 to-emerald-600",
                textGradient: "group-hover:from-teal-600 group-hover:to-emerald-600",
                icon: FaLightbulb,
            }
        ],
        cta: {
            en: "Explore Our Blog",
            pt: "Ler Todos os Artigos"
        }
    };

    return (
        <section className="relative py-20 z-20 bg-white transition-colors duration-500">
            {/* Background Pattern - Subtle in Light, Visible in Dark */}
            <div className="absolute inset-0 pointer-events-none text-gray-100/5">
                <div className="absolute inset-0 opacity-40" style={{
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
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        {content.title[locale]}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                                <a href={`/blog/${post.slug}`} className="block h-full no-underline">
                                    <PremiumCard
                                        className="h-full p-8 flex flex-col group bg-white/60/5 backdrop-blur-xl border border-white/40 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-gray-500/30 dark:hover:border-gray-500/50"
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
                                        <h3 className={`text-xl font-bold text-black mb-3 group-hover:bg-gradient-to-r ${post.textGradient} group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight`}>
                                            {post.title[locale]}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                                            {post.excerpt[locale]}
                                        </p>

                                        {/* Arrow Icon */}
                                        <div className={`mt-auto flex items-center text-sm font-bold text-black group-hover:bg-gradient-to-r ${post.textGradient} group-hover:text-transparent group-hover:bg-clip-text transition-all`}>
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
