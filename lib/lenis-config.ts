"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap-config";

// ═══════════════════════════════════════════════════════════════════════════
// LENIS CONFIG - Smooth scroll premium com integração GSAP
// ═══════════════════════════════════════════════════════════════════════════

let lenisInstance: Lenis | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO PADRÃO - Otimizada para performance e fluidez
// ─────────────────────────────────────────────────────────────────────────────
export const LENIS_CONFIG = {
    // Duração do scroll (quanto maior, mais suave)
    duration: 1.2,

    // Easing function (lerp é mais natural)
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

    // Orientação
    orientation: "vertical" as const,

    // Suavização do gesto
    gestureOrientation: "vertical" as const,

    // Multiplicador de velocidade da roda do mouse
    smoothWheel: true,

    // Touch suave
    touchMultiplier: 2,

    // Limitar para não ultrapassar os bounds
    infinite: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// INICIALIZAÇÃO - Cria e configura a instância Lenis
// ─────────────────────────────────────────────────────────────────────────────
export function initLenis(): Lenis {
    if (typeof window === "undefined") {
        throw new Error("Lenis deve ser inicializado apenas no cliente");
    }

    // Se já existe, retorna a instância atual
    if (lenisInstance) {
        return lenisInstance;
    }

    // Cria nova instância
    lenisInstance = new Lenis(LENIS_CONFIG);

    // Integração com GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Usa GSAP ticker para animação
    gsap.ticker.add((time) => {
        lenisInstance?.raf(time * 1000);
    });

    // Desabilita lag smoothing para máxima responsividade
    gsap.ticker.lagSmoothing(0);

    return lenisInstance;
}

// ─────────────────────────────────────────────────────────────────────────────
// DESTRUIÇÃO - Limpa a instância
// ─────────────────────────────────────────────────────────────────────────────
export function destroyLenis(): void {
    if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// GETTER - Obtém a instância atual
// ─────────────────────────────────────────────────────────────────────────────
export function getLenis(): Lenis | null {
    return lenisInstance;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES - Métodos úteis
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scroll suave para um elemento ou posição
 */
export function scrollTo(
    target: string | number | HTMLElement,
    options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
    }
): void {
    lenisInstance?.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration,
        immediate: options?.immediate ?? false,
    });
}

/**
 * Para o scroll temporariamente (útil para modais)
 */
export function stopScroll(): void {
    lenisInstance?.stop();
}

/**
 * Retoma o scroll
 */
export function startScroll(): void {
    lenisInstance?.start();
}

/**
 * Verifica se o scroll está pausado
 */
export function isScrollStopped(): boolean {
    return lenisInstance?.isStopped ?? true;
}
