"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, EASING, DURATION } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// HERO 3D - Hero Section com efeito 3D infinito usando CSS 3D
// Alternativa leve ao Three.js (~0KB vs ~150KB)
// ═══════════════════════════════════════════════════════════════════════════

interface Hero3DProps {
    /** Conteúdo principal (texto do hero) */
    children: ReactNode;
    /** Classes adicionais */
    className?: string;
    /** Habilita o efeito de scale infinito */
    infiniteScale?: boolean;
    /** Intensidade do efeito 3D */
    intensity?: number;
    /** CTA component */
    cta?: ReactNode;
    /** Background particles (opcional) */
    particles?: boolean;
}

/**
 * Hero Section com efeito 3D infinito usando CSS transforms
 * Baseado no estilo Bureau DAM - texto que escala infinitamente no scroll
 * 
 * Efeitos:
 * - Logo/texto 3D que escala no scroll (scale 0 → 1 → ∞)
 * - Transform origin animado (top → center → bottom)
 * - Parallax em camadas
 * - Fade out progressivo
 * 
 * @example
 * ```tsx
 * <Hero3D 
 *   infiniteScale 
 *   cta={<CTAPremium>Get Started</CTAPremium>}
 * >
 *   <h1>Agency Name</h1>
 *   <p>Tagline here</p>
 * </Hero3D>
 * ```
 */
export function Hero3D({
    children,
    className,
    infiniteScale = true,
    intensity = 1,
    cta,
    particles = true,
}: Hero3DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !contentRef.current) return;

            const mm = gsap.matchMedia();

            // ─────────────────────────────────────────────────────────
            // DESKTOP ANIMATIONS
            // ─────────────────────────────────────────────────────────
            mm.add("(min-width: 768px)", () => {
                // Timeline principal para o efeito infinito
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "150% top",
                        scrub: 0.5,
                        pin: infiniteScale,
                    },
                });

                // Efeito de scale infinito no conteúdo
                if (infiniteScale) {
                    tl
                        // Fase 1: Scale up + fade parcial
                        .to(contentRef.current, {
                            scale: 2 * intensity,
                            opacity: 0.5,
                            filter: "blur(2px)",
                            duration: 0.5,
                            ease: EASING.smooth,
                        })
                        // Fase 2: Scale máximo + fade out completo
                        .to(contentRef.current, {
                            scale: 5 * intensity,
                            opacity: 0,
                            filter: "blur(10px)",
                            duration: 0.5,
                            ease: EASING.cinematicIn,
                        });

                    // Background parallax mais lento
                    if (bgRef.current) {
                        gsap.to(bgRef.current, {
                            scale: 1.3,
                            opacity: 0.3,
                            ease: EASING.none,
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top top",
                                end: "150% top",
                                scrub: 1,
                            },
                        });
                    }
                } else {
                    // Efeito simples de fade + parallax
                    tl.to(contentRef.current, {
                        y: "-20%",
                        opacity: 0,
                        filter: "blur(8px)",
                        duration: 1,
                        ease: EASING.smooth,
                    });
                }

                // Animação de entrada inicial
                gsap.from(contentRef.current, {
                    y: 50,
                    opacity: 0,
                    scale: 0.95,
                    duration: DURATION.cinematic,
                    ease: EASING.cinematic,
                    delay: 0.2,
                });
            });

            // ─────────────────────────────────────────────────────────
            // MOBILE ANIMATIONS (simplificado)
            // ─────────────────────────────────────────────────────────
            mm.add("(max-width: 767px)", () => {
                // Apenas fade simples no mobile
                gsap.to(contentRef.current, {
                    opacity: 0.5,
                    ease: EASING.none,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "50% top",
                        scrub: 0.3,
                    },
                });

                // Animação de entrada
                gsap.from(contentRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: DURATION.slow,
                    ease: EASING.smooth,
                    delay: 0.1,
                });
            });

            return () => mm.revert();
        },
        { scope: containerRef, dependencies: [infiniteScale, intensity] }
    );

    return (
        <div
            ref={containerRef}
            className={cn(
                "hero-3d relative min-h-screen flex items-center justify-center overflow-hidden",
                className
            )}
            style={{
                perspective: "1000px",
                perspectiveOrigin: "center center",
            }}
        >
            {/* Background Layer com Gradient */}
            <div
                ref={bgRef}
                className="absolute inset-0 pointer-events-none transform-gpu"
            >
                {/* Gradient mesh animado */}
                <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

                {/* Orbs de luz */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-400/30 via-purple-500/10 to-transparent blur-3xl transform-gpu animate-float-slow" />
                <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-radial from-blue-400/25 via-cyan-400/10 to-transparent blur-3xl transform-gpu animate-float-medium" />
                <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-radial from-pink-400/20 to-transparent blur-2xl transform-gpu animate-float-fast" />
            </div>

            {/* Floating Particles (opcional) */}
            {particles && <FloatingParticles />}

            {/* Main Content com efeito 3D */}
            <div
                ref={contentRef}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto transform-gpu"
                style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, filter",
                }}
            >
                {children}

                {/* CTA separado para animação independente */}
                {cta && (
                    <div className="mt-8 hero-cta">
                        {cta}
                    </div>
                )}
            </div>

            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none noise-texture" />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING PARTICLES - Partículas flutuantes CSS puro (leve)
// ─────────────────────────────────────────────────────────────────────────────

function FloatingParticles() {
    // Gera partículas estáticas (sem re-render)
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-white/20 animate-float-particle"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        left: p.left,
                        top: p.top,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

export default Hero3D;
