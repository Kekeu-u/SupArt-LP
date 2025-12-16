"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { services } from "@/data";

// Registrar plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Solutions() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Service cards stagger reveal - OTIMIZADO
                ScrollTrigger.batch(".service-card", {
                    onEnter: (batch) => {
                        gsap.to(batch, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            stagger: 0.1,
                            duration: 0.6,
                            ease: "power2.out",
                            overwrite: true,
                        });
                    },
                    onLeaveBack: (batch) => {
                        gsap.set(batch, { opacity: 0, y: 50, scale: 0.95, overwrite: true });
                    },
                    start: "top 85%",
                });
            });

            return () => {
                mm.revert();
            };
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section
            ref={sectionRef}
            id="solutions"
            className="section-reveal px-6 py-32 bg-white relative overflow-hidden"
        >
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
                                "service-card group relative p-8 rounded-[32px] border border-black/5 bg-gradient-to-br hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 will-change-transform",
                                service.gradient
                            )}
                            style={{ opacity: 0, transform: "translateY(50px) scale(0.95)" }}
                        >
                            <div className="h-48 mb-8 rounded-2xl bg-white/50 backdrop-blur-sm shadow-inner flex items-center justify-center overflow-hidden">
                                {/* Animated gradient on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full"
                                    style={{ transitionDuration: "1s" }}
                                />
                                <span className="text-[var(--color-apple-gray)] font-medium opacity-50">
                                    Product Shot
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                            <p className="text-[var(--color-apple-gray)] mb-6 leading-relaxed">
                                {service.desc}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-sm font-medium text-[var(--color-apple-black)]">
                                    {service.price}
                                </span>
                                <button className="w-10 h-10 rounded-full bg-[var(--color-apple-black)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 hover:scale-110">
                                    →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
