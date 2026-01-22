"use client";

import { motion } from "framer-motion";
import { services } from "@/data";
import { useI18n } from "@/lib/i18n";
import { ShinyButton } from "@/components/ui/ShinyButton";

export function Solutions() {
    const { locale } = useI18n();

    return (
        <section id="solutions" className="py-24 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
                >
                    {locale === "en" ? "+Solutions" : "+Soluções"}
                </motion.h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            viewport={{ once: true }}
                            transition={{
                                opacity: { delay: i * 0.1, duration: 0.4 },
                                y: { delay: i * 0.1, duration: 0.4 },
                                default: { duration: 0.2 }
                            }}
                            className="service-card group bg-white/80 backdrop-blur-xl border border-gray-100 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-lg flex flex-col"
                        >
                            {/* Features as Pills */}
                            <div className="h-28 mb-4 flex flex-wrap gap-1.5 items-start justify-center content-start">
                                {service.features[locale].slice(0, 3).map((f, idx) => (
                                    <span key={idx} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-600 font-medium">
                                        {f}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title[locale]}</h3>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-grow">{service.desc[locale]}</p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                <span className="text-sm font-semibold text-gray-900">{service.price[locale]}</span>
                                <button className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    →
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 flex justify-center">
                    <ShinyButton href="#contact">
                        {locale === "en" ? "Talk to us" : "Fale com a gente"}
                    </ShinyButton>
                </div>
            </div>
        </section>
    );
}
