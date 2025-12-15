"use client";

import { useState, useRef, useCallback, ReactNode } from "react";
import confetti from "canvas-confetti";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { gsap, EASING, DURATION } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// CTA PREMIUM - Botão de conversão impossível de ignorar
// ═══════════════════════════════════════════════════════════════════════════

type CTAState = "idle" | "loading" | "success" | "error";

interface CTAPremiumProps {
    /** Texto do botão */
    children: ReactNode;
    /** Classes adicionais */
    className?: string;
    /** Handler para click - pode retornar Promise para loading state */
    onClick?: () => void | Promise<void>;
    /** Força do efeito magnético */
    magneticStrength?: number;
    /** Tamanho */
    size?: "md" | "lg" | "xl";
    /** Desabilita confetti no sucesso */
    disableConfetti?: boolean;
    /** Ícone à esquerda */
    icon?: ReactNode;
    /** Tipo do botão */
    type?: "button" | "submit";
    /** Desabilitado */
    disabled?: boolean;
}

/**
 * CTA Premium com múltiplos efeitos:
 * - Glow pulsante animado
 * - Gradient shimmer no hover
 * - Ripple effect no click
 * - Confetti no sucesso
 * - Loading state premium
 * - Efeito magnético
 * 
 * @example
 * ```tsx
 * <CTAPremium onClick={handleSubmit}>
 *   Quero Minha Landing Page
 * </CTAPremium>
 * ```
 */
export function CTAPremium({
    children,
    className,
    onClick,
    magneticStrength = 0.2,
    size = "lg",
    disableConfetti = false,
    icon,
    type = "button",
    disabled = false,
}: CTAPremiumProps) {
    const [state, setState] = useState<CTAState>("idle");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleRef = useRef<HTMLSpanElement>(null);

    // Hook magnético
    const { ref: magneticRef, onMouseMove, onMouseLeave } = useMagneticEffect<HTMLButtonElement>({
        strength: magneticStrength,
    });

    // Merge refs
    const setRefs = useCallback((node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        (magneticRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    }, [magneticRef]);

    // ─────────────────────────────────────────────────────────────────────────
    // RIPPLE EFFECT
    // ─────────────────────────────────────────────────────────────────────────
    const triggerRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || !rippleRef.current) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();

        // Posição do click relativa ao botão
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Tamanho do ripple (diagonal do botão)
        const size = Math.max(rect.width, rect.height) * 2;

        // Anima o ripple
        gsap.fromTo(
            rippleRef.current,
            {
                x: x - size / 2,
                y: y - size / 2,
                width: size,
                height: size,
                opacity: 0.5,
                scale: 0,
            },
            {
                scale: 1,
                opacity: 0,
                duration: DURATION.slow,
                ease: EASING.smooth,
            }
        );
    }, []);

    // ─────────────────────────────────────────────────────────────────────────
    // CONFETTI EXPLOSION
    // ─────────────────────────────────────────────────────────────────────────
    const triggerConfetti = useCallback(() => {
        if (disableConfetti || !buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        // Confetti burst
        confetti({
            particleCount: 60,
            spread: 70,
            origin: { x, y },
            colors: ["#a855f7", "#ec4899", "#8b5cf6", "#f472b6"],
            ticks: 100,
            gravity: 1.2,
            decay: 0.94,
            startVelocity: 20,
        });
    }, [disableConfetti]);

    // ─────────────────────────────────────────────────────────────────────────
    // CLICK HANDLER
    // ─────────────────────────────────────────────────────────────────────────
    const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (state === "loading" || disabled) return;

        // Trigga o ripple
        triggerRipple(e);

        if (!onClick) return;

        try {
            setState("loading");
            const result = onClick();

            // Se retornar Promise, espera
            if (result instanceof Promise) {
                await result;
            }

            setState("success");
            triggerConfetti();

            // Volta ao idle após delay
            setTimeout(() => setState("idle"), 2000);
        } catch {
            setState("error");
            setTimeout(() => setState("idle"), 2000);
        }
    }, [onClick, state, disabled, triggerRipple, triggerConfetti]);

    return (
        <button
            ref={setRefs}
            type={type}
            onClick={handleClick}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            disabled={disabled || state === "loading"}
            data-cursor="magnetic"
            className={cn(
                // Base
                "relative overflow-hidden",
                "inline-flex items-center justify-center gap-3",
                "font-bold tracking-tight",
                "rounded-full",
                "transform-gpu transition-all duration-300",

                // Gradient background
                "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600",
                "bg-[length:200%_100%]",

                // Hover effects
                "hover:-translate-y-1",
                "hover:bg-[position:100%_0]",

                // Glow base
                "shadow-lg shadow-purple-500/40",
                "hover:shadow-xl hover:shadow-purple-500/50",

                // States
                state === "loading" && "animate-pulse pointer-events-none",
                state === "success" && "bg-green-500 shadow-green-500/40",
                state === "error" && "bg-red-500 shadow-red-500/40",
                disabled && "opacity-50 pointer-events-none",

                // Sizes
                getSizeClasses(size),

                className
            )}
        >
            {/* Animated gradient shimmer */}
            <span
                className="
                    absolute inset-0 
                    bg-gradient-to-r from-transparent via-white/25 to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform duration-1000
                "
            />

            {/* Pulsing glow ring */}
            <span
                className="
                    absolute -inset-1
                    bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500
                    rounded-full opacity-0
                    animate-pulse-glow
                    blur-xl -z-10
                "
            />

            {/* Ripple container */}
            <span
                ref={rippleRef}
                className="
                    absolute rounded-full
                    bg-white/30
                    pointer-events-none
                "
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {state === "loading" ? (
                    <LoadingSpinner />
                ) : state === "success" ? (
                    <CheckMark />
                ) : (
                    <>
                        {icon}
                        <span className="text-white">{children}</span>
                    </>
                )}
            </span>
        </button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function LoadingSpinner() {
    return (
        <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

function CheckMark() {
    return (
        <svg
            className="h-5 w-5 text-white animate-check"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getSizeClasses(size: string): string {
    switch (size) {
        case "md":
            return "px-6 py-3 text-base";
        case "lg":
            return "px-8 py-4 text-lg";
        case "xl":
            return "px-10 py-5 text-xl";
        default:
            return "px-8 py-4 text-lg";
    }
}

export default CTAPremium;
