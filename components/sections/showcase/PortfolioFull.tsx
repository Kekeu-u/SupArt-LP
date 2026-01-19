"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { projects, projectsSection } from "@/data/projects";
import { ShinyButton } from "@/components/ui/ShinyButton";

// Register plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const FullscreenProjectCard: React.FC<{ project: typeof projects[0]; index: number; locale: "en" | "pt" }> = ({
    project,
    index,
    locale,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

            const mm = gsap.matchMedia();

            // Desktop parallax
            mm.add("(min-width: 768px)", () => {
                // Image Parallax - subtle movement
                gsap.fromTo(
                    imageRef.current,
                    { yPercent: 10, scale: 1.05 },
                    {
                        yPercent: -5,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );

                // Content Reveal
                gsap.fromTo(
                    contentRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                            end: "top 30%",
                            scrub: 0.5,
                        },
                    }
                );
            });

            // Mobile parallax (reduced)
            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(
                    imageRef.current,
                    { yPercent: 5 },
                    {
                        yPercent: -5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            });

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    const category = project.tags.map(t => t.label[locale]).join(" / ");

    return (
        <section
            ref={sectionRef}
            className={`relative min-h-[100dvh] w-full flex flex-col md:flex-row items-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
            style={{ contentVisibility: "auto", containIntrinsicSize: "auto 100dvh" }}
        >
            {/* Content - Left Side (Desktop) / Top (Mobile) */}
            <div className="relative z-20 w-full md:w-[40%] h-full flex flex-col justify-center px-6 py-20 md:pl-20 md:pr-0 pointer-events-none">
                <div ref={contentRef} className="pointer-events-auto will-change-transform">
                    {/* Category Badge */}
                    <span
                        className={`inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/10`}
                    >
                        {category}
                    </span>

                    {/* Title */}
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-gray-300 max-w-md mb-8 leading-relaxed">
                        {project.description[locale]}
                    </p>

                    {/* CTA */}
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium transition-all hover:bg-white/20 hover:scale-105`}
                    >
                        {locale === "en" ? "View Case" : "Ver Case"}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>

            {/* Image - Bottom Right (Desktop) / Bottom (Mobile) */}
            <div
                className="absolute bottom-0 right-0 w-full md:w-[65%] h-[50vh] md:h-[85vh] z-10 overflow-hidden rounded-tl-[3rem] md:rounded-tl-[5rem] shadow-2xl border-t border-l border-white/10 bg-black/20 backdrop-blur-sm"
            >
                <div ref={imageRef} className="relative w-full h-[120%] -top-[10%] will-change-transform">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 65vw"
                        priority={index === 0}
                    />
                    {/* Inner Shadow for depth */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
                </div>
            </div>

            {/* Project Number Watermark */}
            <div
                className={`absolute top-10 right-10 md:top-20 md:right-20 text-[80px] md:text-[150px] font-bold text-white/5 pointer-events-none select-none z-0 leading-none`}
            >
                0{index + 1}
            </div>
        </section>
    );
};

export const PortfolioFull = () => {
    const { locale } = useI18n();
    const content = projectsSection;

    return (
        <div id="portfolio" className="relative bg-black overflow-hidden" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 100dvh" }}>
            {/* Background Texture & Glows (Restored from Backup) */}
            <div className="absolute inset-0 bg-black pointer-events-none" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gray-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
            {/* Header Section */}
            <section className="relative py-20 md:py-32 bg-transparent text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {content.title[locale]}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        {content.subtitle[locale]}
                    </p>
                </div>
            </section>

            {/* Fullscreen Project Cards */}
            {projects.map((project, index) => (
                <FullscreenProjectCard key={index} project={project} index={index} locale={locale} />
            ))}


        </div>
    );
};
