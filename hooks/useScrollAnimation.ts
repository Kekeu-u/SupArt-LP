"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registrar ScrollTrigger apenas no cliente
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Defaults otimizados para performance
const DEFAULT_REVEAL_CONFIG = {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
};

const DEFAULT_TRIGGER_CONFIG: ScrollTrigger.Vars = {
    start: "top 80%",
    toggleActions: "play none none none",
    once: true,
};

interface UseScrollAnimationOptions {
    /**
     * Configuração do reveal (from values)
     */
    reveal?: gsap.TweenVars;
    /**
     * Configuração do ScrollTrigger
     */
    trigger?: ScrollTrigger.Vars;
    /**
     * Delay entre elementos stagger (em segundos)
     */
    stagger?: number;
    /**
     * Desabilitar em mobile (< 768px)
     */
    disableOnMobile?: boolean;
}

/**
 * Hook para animações scroll-triggered com GSAP
 *
 * @example
 * ```tsx
 * const containerRef = useScrollAnimation<HTMLDivElement>({
 *   reveal: { y: 50 },
 *   stagger: 0.1,
 * });
 *
 * return <div ref={containerRef}>...</div>
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollAnimationOptions = {}
) {
    const containerRef = useRef<T>(null);

    const {
        reveal = DEFAULT_REVEAL_CONFIG,
        trigger = DEFAULT_TRIGGER_CONFIG,
        stagger = 0,
        disableOnMobile = false,
    } = options;

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const element = containerRef.current;

            // Usa matchMedia para animações responsivas
            const mm = gsap.matchMedia();

            // Configuração para desktop (e mobile se permitido)
            const mediaQuery = disableOnMobile ? "(min-width: 768px)" : "all";

            mm.add(mediaQuery, () => {
                // Se há elementos filhos para stagger
                if (stagger > 0) {
                    const children = element.children;
                    if (children.length > 0) {
                        gsap.from(children, {
                            ...DEFAULT_REVEAL_CONFIG,
                            ...reveal,
                            stagger,
                            scrollTrigger: {
                                trigger: element,
                                ...DEFAULT_TRIGGER_CONFIG,
                                ...trigger,
                            },
                        });
                    }
                } else {
                    // Animação única no elemento
                    gsap.from(element, {
                        ...DEFAULT_REVEAL_CONFIG,
                        ...reveal,
                        scrollTrigger: {
                            trigger: element,
                            ...DEFAULT_TRIGGER_CONFIG,
                            ...trigger,
                        },
                    });
                }
            });

            // Cleanup automático via gsap.context
            return () => mm.revert();
        },
        { scope: containerRef, dependencies: [] }
    );

    return containerRef;
}

/**
 * Hook para efeito parallax em scroll
 *
 * @example
 * ```tsx
 * const bgRef = useParallax<HTMLDivElement>({ speed: 0.3 });
 * ```
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(options?: {
    speed?: number;
    direction?: "up" | "down";
}) {
    const elementRef = useRef<T>(null);
    const { speed = 0.5, direction = "up" } = options || {};

    useGSAP(
        () => {
            if (!elementRef.current) return;

            const yValue = direction === "up" ? `${speed * 100}%` : `-${speed * 100}%`;

            // Parallax apenas em desktop
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                gsap.to(elementRef.current, {
                    y: yValue,
                    ease: "none",
                    scrollTrigger: {
                        trigger: elementRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    },
                });
            });

            return () => mm.revert();
        },
        { scope: elementRef, dependencies: [] }
    );

    return elementRef;
}

/**
 * Utilitário para obter contadores de animações ativas (para DevPanel)
 */
export function getGSAPStats() {
    if (typeof window === "undefined") {
        return { tweens: 0, scrollTriggers: 0 };
    }

    return {
        tweens: gsap.globalTimeline.getChildren().length,
        scrollTriggers: ScrollTrigger.getAll().length,
    };
}
