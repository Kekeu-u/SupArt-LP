"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { services } from "@/data";
import { useI18n } from "@/lib/i18n";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ShinyButton } from "@/components/ui/ShinyButton";

// Registrar plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Solutions() {
    const { locale } = useI18n();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                mm.add("(min-width: 768px)", () => {
                    // Tracking Responsivo Vinculado à Rolagem (Scrubbing)
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 90%", // Começa quando o topo da seção entra na viewport
                            end: "center 50%", // Termina quando o centro da seção está no meio da tela
                            scrub: 0.5, // Suavização do tracking (responsivo mas suave)
                            toggleActions: "play reverse play reverse"
                        }
                    });

                    tl.fromTo(".service-card",
                        {
                            y: 100,
                            opacity: 0,
                            scale: 0.8,
                            rotateX: 15 // Leve inclinação inicial para efeito 3D ao subir
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            stagger: 0.1, // Efeito cascata entre os cards
                            ease: "power2.out"
                        }
                    );
                });
            });

            return () => {
                mm.revert();
            };
        },
        { scope: sectionRef, dependencies: [] }
    );

    const sectionTitle = locale === "en" ? "Solutions" : "Soluções";

    return (
        <section
            ref={sectionRef}
            id="solutions"
            className="section-reveal px-6 py-32 bg-transparent relative overflow-hidden"
        >
            {/* Background Sólido - Sem Animações/Gradientes */}

            <div className="max-w-7xl mx-auto relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-semibold tracking-tight mb-20 text-center dark:text-white"
                >
                    {sectionTitle}
                </motion.h2>

                <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <PremiumCard
                            key={i}
                            variant="transparent"
                            className={cn(
                                "service-card group relative p-6 transition-all duration-500 will-change-transform bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2",
                                "hover:border-purple-500/30 dark:hover:border-purple-500/50" // Adiciona cor na borda ao passar o mouse
                            )}
                            style={{ opacity: 0, transform: "translateY(50px) scale(0.95)" }}
                        >
                            {/* Gradiente de fundo sutil que aparece no hover */}
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br rounded-3xl pointer-events-none", service.gradient)} />

                            <div className="h-40 mb-6 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center overflow-hidden relative border border-black/5 dark:border-white/5 group-hover:border-transparent transition-colors">
                                {/* Animated gradient on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full"
                                    style={{ transitionDuration: "1s" }}
                                />
                                {/* Features preview */}
                                <div className="flex flex-wrap gap-2 justify-center px-4">
                                    {service.features[locale].slice(0, 3).map((feature, idx) => (
                                        <span key={idx} className="px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-medium text-[var(--color-apple-gray)] dark:text-gray-300">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 dark:text-white">{service.title[locale]}</h3>
                            <p className="text-[var(--color-apple-gray)] dark:text-gray-400 mb-6 leading-relaxed">
                                {service.desc[locale]}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-sm font-medium text-[var(--color-apple-black)] dark:text-white">
                                    {service.price[locale]}
                                </span>
                                <button className="w-10 h-10 rounded-full bg-[var(--color-apple-black)] dark:bg-white text-white dark:text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 hover:scale-110">
                                    →
                                </button>
                            </div>
                        </PremiumCard>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <ShinyButton href="#contact">
                        {locale === "en" ? "Talk to us" : "Fale com a gente"}
                    </ShinyButton>
                </div>
            </div>
        </section>
    );
}
