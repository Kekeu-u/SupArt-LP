"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ═══════════════════════════════════════════════════════════════════════════
// GSAP CONFIG - Configuração centralizada para animações premium
// ═══════════════════════════════════════════════════════════════════════════

// Registrar plugins apenas no cliente
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // FPS ilimitado para monitores de alta taxa de atualização
    gsap.ticker.fps(-1);

    // Força aceleração GPU por padrão
    gsap.config({
        force3D: true,
        nullTargetWarn: false,
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// EASING PRESETS - Curvas de animação premium (Apple-style)
// ─────────────────────────────────────────────────────────────────────────────
export const EASING = {
    // Entradas suaves
    smooth: "power2.out",
    smoothIn: "power2.in",
    smoothInOut: "power2.inOut",

    // Cinematográficas (mais dramáticas)
    cinematic: "power3.out",
    cinematicIn: "power3.in",
    cinematicInOut: "power3.inOut",

    // Bounce sutil (para CTAs)
    bounce: "back.out(1.2)",
    bounceIn: "back.in(1.2)",

    // Elástico (para micro-interações)
    elastic: "elastic.out(1, 0.5)",

    // Linear (para parallax/scroll)
    none: "none",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DURATION PRESETS - Tempos consistentes
// ─────────────────────────────────────────────────────────────────────────────
export const DURATION = {
    instant: 0.1,
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    cinematic: 0.8,
    reveal: 1.0,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL DEFAULTS - Para scroll reveals
// ─────────────────────────────────────────────────────────────────────────────
export const REVEAL_DEFAULTS = {
    y: 40,
    opacity: 0,
    duration: DURATION.cinematic,
    ease: EASING.cinematic,
};

export const SCROLL_TRIGGER_DEFAULTS: ScrollTrigger.Vars = {
    start: "top 85%",
    end: "top 20%",
    toggleActions: "play none none none",
};

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC EFFECT PRESETS - Para hover magnético
// ─────────────────────────────────────────────────────────────────────────────
export const MAGNETIC_DEFAULTS = {
    strength: 0.3,        // Força do efeito (0-1)
    duration: 0.4,        // Duração da animação
    ease: EASING.smooth,  // Curva de easing
};

// ─────────────────────────────────────────────────────────────────────────────
// QUICKTO FACTORY - Cria animações fluidas para magnetic effects
// ─────────────────────────────────────────────────────────────────────────────
export function createQuickTo(
    target: gsap.TweenTarget,
    prop: string,
    duration: number = 0.4
) {
    return gsap.quickTo(target, prop, {
        duration,
        ease: EASING.smooth,
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGGER PRESETS - Para animações em sequência
// ─────────────────────────────────────────────────────────────────────────────
export const STAGGER = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    cinematic: 0.2,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY - Verifica se está em mobile
// ─────────────────────────────────────────────────────────────────────────────
export function isMobile(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY - Verifica se é touch device
// ─────────────────────────────────────────────────────────────────────────────
export function isTouchDevice(): boolean {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export { gsap, ScrollTrigger };
