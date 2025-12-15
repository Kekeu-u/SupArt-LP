"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, EASING } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX BACKGROUND - Layers com profundidade e velocidades diferentes
// ═══════════════════════════════════════════════════════════════════════════

interface ParallaxLayer {
    /** Conteúdo do layer (pode ser JSX) */
    content?: ReactNode;
    /** Classe de cor/gradient para o layer */
    className?: string;
    /** Velocidade do parallax (0 = parado, 1 = scroll normal, -1 = oposto) */
    speed: number;
    /** Opacidade do layer */
    opacity?: number;
    /** Blur progressivo (pixels) */
    blur?: number;
    /** Z-index do layer */
    zIndex?: number;
}

interface ParallaxBackgroundProps {
    /** Layers de parallax */
    layers?: ParallaxLayer[];
    /** Conteúdo principal (fica por cima) */
    children?: ReactNode;
    /** Classes adicionais */
    className?: string;
    /** Altura mínima do container */
    minHeight?: string;
    /** Gradient animado no scroll */
    animatedGradient?: boolean;
    /** Intensidade do scrub (0-1, menor = mais suave) */
    scrubIntensity?: number;
}

// Layers default se não fornecidos
const DEFAULT_LAYERS: ParallaxLayer[] = [
    {
        className: "bg-gradient-radial from-purple-500/20 via-purple-600/10 to-transparent",
        speed: 0.2,
        opacity: 0.7,
        blur: 60,
        zIndex: 1,
    },
    {
        className: "bg-gradient-radial from-blue-400/15 via-cyan-500/8 to-transparent",
        speed: 0.35,
        opacity: 0.6,
        blur: 40,
        zIndex: 2,
    },
    {
        className: "bg-gradient-radial from-pink-400/20 via-rose-500/10 to-transparent",
        speed: 0.5,
        opacity: 0.5,
        blur: 20,
        zIndex: 3,
    },
    {
        className: "bg-gradient-to-b from-transparent via-white/5 to-transparent",
        speed: 0.8,
        opacity: 0.3,
        blur: 0,
        zIndex: 4,
    },
];

/**
 * Background com múltiplos layers de parallax
 * Cada layer se move em velocidade diferente criando profundidade
 * 
 * @example
 * ```tsx
 * <ParallaxBackground animatedGradient>
 *   <HeroContent />
 * </ParallaxBackground>
 * 
 * // Com layers customizados
 * <ParallaxBackground
 *   layers={[
 *     { speed: 0.2, className: "bg-purple-500/20 blur-3xl" },
 *     { speed: 0.5, className: "bg-pink-500/20 blur-2xl" },
 *   ]}
 * >
 *   <Content />
 * </ParallaxBackground>
 * ```
 */
export function ParallaxBackground({
    layers = DEFAULT_LAYERS,
    children,
    className,
    minHeight = "100vh",
    animatedGradient = true,
    scrubIntensity = 0.5,
}: ParallaxBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const mm = gsap.matchMedia();

            // Apenas desktop
            mm.add("(min-width: 768px)", () => {
                // Anima cada layer com velocidade diferente
                layers.forEach((layer, index) => {
                    const layerEl = layerRefs.current[index];
                    if (!layerEl) return;

                    gsap.to(layerEl, {
                        y: `${layer.speed * 100}%`,
                        ease: EASING.none,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: scrubIntensity,
                        },
                    });
                });

                // Gradient animado no scroll (se ativo)
                if (animatedGradient) {
                    gsap.to(containerRef.current, {
                        "--gradient-rotation": "360deg",
                        ease: EASING.none,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    });
                }
            });

            return () => mm.revert();
        },
        { scope: containerRef, dependencies: [layers, animatedGradient, scrubIntensity] }
    );

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden",
                className
            )}
            style={{
                minHeight,
                // CSS custom property para gradient animado
                ["--gradient-rotation" as string]: "0deg",
            }}
        >
            {/* Animated gradient base (se ativo) */}
            {animatedGradient && (
                <div
                    className="
                        absolute inset-0 
                        bg-gradient-conic from-purple-500/10 via-pink-500/5 via-blue-500/10 to-purple-500/10
                        opacity-50
                        pointer-events-none
                    "
                    style={{
                        transform: "rotate(var(--gradient-rotation))",
                        transformOrigin: "center center",
                    }}
                />
            )}

            {/* Parallax Layers */}
            {layers.map((layer, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        layerRefs.current[index] = el;
                    }}
                    className={cn(
                        "absolute inset-0 pointer-events-none transform-gpu",
                        layer.className
                    )}
                    style={{
                        zIndex: layer.zIndex ?? index + 1,
                        opacity: layer.opacity ?? 1,
                        filter: layer.blur ? `blur(${layer.blur}px)` : undefined,
                        willChange: "transform",
                    }}
                >
                    {layer.content}
                </div>
            ))}

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-texture" />

            {/* Main content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default ParallaxBackground;
