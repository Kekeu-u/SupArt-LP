"use client";

import React, { useRef, ReactNode, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, EASING, DURATION, STAGGER } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// REVEAL SECTION - Wrapper para scroll reveals cinematográficos
// ═══════════════════════════════════════════════════════════════════════════

type RevealVariant =
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "scale"
    | "rotate"
    | "word-split"
    | "char-split";

interface RevealSectionProps {
    /** Conteúdo a ser revelado */
    children: ReactNode;
    /** Tipo de animação */
    variant?: RevealVariant;
    /** Classes adicionais */
    className?: string;
    /** Delay antes de iniciar (segundos) */
    delay?: number;
    /** Duração da animação */
    duration?: number;
    /** Stagger entre elementos filhos */
    stagger?: number;
    /** Repetir ao voltar para view */
    replay?: boolean;
    /** Pin section durante animação */
    pin?: boolean;
    /** Duração do pin (em vh) */
    pinDuration?: string;
    /** Tag HTML para o container */
    as?: React.ElementType;
    /** Threshold para trigger (0-1) */
    threshold?: number;
    /** Desabilitar em mobile */
    disableOnMobile?: boolean;
}

/**
 * Wrapper para scroll reveals cinematográficos
 * Usa GSAP ScrollTrigger para animações baseadas em scroll
 * 
 * @example
 * ```tsx
 * // Fade simples
 * <RevealSection variant="fade">
 *   <h2>Título que aparece</h2>
 * </RevealSection>
 * 
 * // Split text por palavra
 * <RevealSection variant="word-split">
 *   <h1>Cada palavra aparece separada</h1>
 * </RevealSection>
 * 
 * // Com stagger em filhos
 * <RevealSection variant="slide-up" stagger={0.1}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </RevealSection>
 * ```
 */
export const RevealSection = forwardRef<HTMLElement, RevealSectionProps>(
    function RevealSection(
        {
            children,
            variant = "slide-up",
            className,
            delay = 0,
            duration = DURATION.cinematic,
            stagger = 0,
            replay = false,
            pin = false,
            pinDuration = "100vh",
            as: Component = "div",
            threshold = 0.15,
            disableOnMobile = false,
        },
        _forwardedRef
    ) {
        const containerRef = useRef<HTMLDivElement>(null);

        useGSAP(
            () => {
                if (!containerRef.current) return;

                const element = containerRef.current;
                const mm = gsap.matchMedia();

                const mediaQuery = disableOnMobile ? "(min-width: 768px)" : "all";

                mm.add(mediaQuery, () => {
                    // Configuração base do ScrollTrigger
                    const scrollTriggerConfig: ScrollTrigger.Vars = {
                        trigger: element,
                        start: `top ${100 - threshold * 100}%`,
                        end: pin ? `+=${pinDuration}` : "top 20%",
                        toggleActions: replay
                            ? "play reverse play reverse"
                            : "play none none none",
                        pin: pin,
                    };

                    // Obtém propriedades de animação baseadas na variante
                    const animProps = getVariantProps(variant, duration, EASING.cinematic);

                    // Se tem stagger e elementos filhos
                    if (stagger > 0 && element.children.length > 0) {
                        gsap.from(element.children, {
                            ...animProps,
                            delay,
                            stagger,
                            scrollTrigger: scrollTriggerConfig,
                        });
                    }
                    // Split text variants
                    else if (variant === "word-split" || variant === "char-split") {
                        const textElements = element.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span");

                        textElements.forEach((textEl) => {
                            const text = textEl.textContent || "";
                            const splitBy = variant === "word-split" ? " " : "";
                            const units = text.split(splitBy);

                            // Limpa e recria com spans
                            textEl.innerHTML = units
                                .map((unit) => `<span class="inline-block">${unit}${variant === "word-split" ? "&nbsp;" : ""}</span>`)
                                .join("");

                            // Anima cada span
                            gsap.from(textEl.querySelectorAll("span"), {
                                y: 40,
                                opacity: 0,
                                duration,
                                ease: EASING.cinematic,
                                stagger: variant === "word-split" ? STAGGER.normal : STAGGER.fast,
                                delay,
                                scrollTrigger: {
                                    trigger: textEl,
                                    start: `top ${100 - threshold * 100}%`,
                                    toggleActions: replay
                                        ? "play reverse play reverse"
                                        : "play none none none",
                                },
                            });
                        });
                    }
                    // Animação simples no container
                    else {
                        gsap.from(element, {
                            ...animProps,
                            delay,
                            scrollTrigger: scrollTriggerConfig,
                        });
                    }
                });

                return () => mm.revert();
            },
            { scope: containerRef, dependencies: [variant, delay, duration, stagger, replay, pin] }
        );

        // Renderiza como o componente especificado
        const Tag = Component as React.ElementType;

        return (
            <Tag
                ref={containerRef}
                className={cn("reveal-section", className)}
            >
                {children}
            </Tag>
        );
    }
);

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getVariantProps(
    variant: RevealVariant,
    duration: number,
    ease: string
): gsap.TweenVars {
    const baseProps = { duration, ease };

    switch (variant) {
        case "fade":
            return { ...baseProps, opacity: 0 };

        case "slide-up":
            return { ...baseProps, opacity: 0, y: 60 };

        case "slide-down":
            return { ...baseProps, opacity: 0, y: -60 };

        case "slide-left":
            return { ...baseProps, opacity: 0, x: 60 };

        case "slide-right":
            return { ...baseProps, opacity: 0, x: -60 };

        case "scale":
            return { ...baseProps, opacity: 0, scale: 0.9 };

        case "rotate":
            return { ...baseProps, opacity: 0, rotation: 5, transformOrigin: "left bottom" };

        // word-split e char-split são tratados separadamente
        default:
            return { ...baseProps, opacity: 0, y: 40 };
    }
}

export default RevealSection;
