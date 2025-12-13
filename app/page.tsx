"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { HeroChat } from "@/components/HeroChat";
import { services, footerLinks, siteConfig } from "@/data";

export default function Home() {
    const [isChatActive, setIsChatActive] = useState(false);

    return (
        <main className="min-h-screen bg-[var(--color-apple-off-white)] text-[var(--color-apple-black)] overflow-x-hidden selection:bg-[var(--color-apple-blue)] selection:text-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="spline-container absolute top-0 left-0 w-full h-full">
                        <iframe
                            src="https://my.spline.design/herolightcopy-HWuYMA6IdNGk0VGuyvrItNGB"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            id="aura-spline"
                            className="w-full h-full"
                        />
                    </div>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Texto do Hero - some quando chat abre */}
                    <motion.div
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

                    {/* Chat integrado no hero */}
                    <HeroChat onStateChange={setIsChatActive} />
                </div>
            </section>

            {/* Tech Stack - Logo + Marquee + Cards + Stats */}
            <TechStackMarquee />

            {/* Project Showcase Section */}
            <ProjectShowcase />

            {/* Services as Products */}
            <section className="px-6 py-32 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-semibold tracking-tight mb-20 text-center"
                    >
                        Soluções
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "group relative p-8 rounded-[32px] border border-black/5 bg-gradient-to-br hover:shadow-2xl transition-all duration-500",
                                    service.gradient
                                )}
                            >
                                <div className="h-48 mb-8 rounded-2xl bg-white/50 backdrop-blur-sm shadow-inner flex items-center justify-center">
                                    {/* Product Image Placeholder */}
                                    <span className="text-[var(--color-apple-gray)] font-medium opacity-50">Product Shot</span>
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-[var(--color-apple-gray)] mb-6 leading-relaxed">
                                    {service.desc}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm font-medium text-[var(--color-apple-black)]">{service.price}</span>
                                    <button className="w-8 h-8 rounded-full bg-[var(--color-apple-black)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                        →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
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
    );
}
