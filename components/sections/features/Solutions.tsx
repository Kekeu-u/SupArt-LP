"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/data";
import { useI18n } from "@/lib/i18n";
import { ShinyButton } from "@/components/ui/ShinyButton";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Solutions() {
    const { locale } = useI18n();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(".service-card",
                { y: 80, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "center 60%",
                        scrub: 0.5
                    }
                }
            );
        });
        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="solutions" className="py-24 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
                >
                    {locale === "en" ? "Solutions" : "Soluções"}
                </motion.h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <article
                            key={i}
                            className="service-card group bg-gray-50 border border-gray-200 p-6 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all"
                            style={{ opacity: 0 }}
                        >
                            {/* Features */}
                            <div className="h-32 mb-4 flex flex-wrap gap-1 items-center justify-center">
                                {service.features[locale].slice(0, 3).map((f, idx) => (
                                    <span key={idx} className="px-2 py-1 rounded-full bg-gray-200 text-xs text-gray-600">
                                        {f}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title[locale]}</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.desc[locale]}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-sm font-semibold text-gray-900">{service.price[locale]}</span>
                                <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 flex justify-center">
                    <ShinyButton href="#contact">
                        {locale === "en" ? "Talk to us" : "Fale com a gente"}
                    </ShinyButton>
                </div>
            </div>
        </section>
    );
}
