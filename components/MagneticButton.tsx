"use client";

import { ReactNode, forwardRef } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON - Botão com efeito magnético Awwwards-level
// ═══════════════════════════════════════════════════════════════════════════

interface MagneticButtonProps {
    /** Conteúdo do botão */
    children: ReactNode;
    /** Classes adicionais */
    className?: string;
    /** Força do efeito magnético (0-1). Default: 0.3 */
    strength?: number;
    /** Variante visual */
    variant?: "primary" | "secondary" | "ghost";
    /** Tamanho */
    size?: "sm" | "md" | "lg";
    /** Tipo do botão */
    type?: "button" | "submit" | "reset";
    /** Handler de click */
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    /** Desabilitado */
    disabled?: boolean;
    /** Atributo href para links */
    href?: string;
    /** Atributo data-cursor para CustomCursor */
    dataCursor?: "hover" | "magnetic";
}

/**
 * Botão com efeito magnético que "segue" o cursor
 * Inclui hover levitation + shadow dinâmico
 * 
 * @example
 * ```tsx
 * <MagneticButton variant="primary" strength={0.4}>
 *   Call to Action
 * </MagneticButton>
 * ```
 */
export const MagneticButton = forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    MagneticButtonProps
>(function MagneticButton(
    {
        children,
        className,
        strength = 0.3,
        variant = "primary",
        size = "md",
        type = "button",
        onClick,
        disabled = false,
        href,
        dataCursor = "magnetic",
    },
    _ref
) {
    // Hook para efeito magnético
    const { ref, onMouseMove, onMouseLeave } = useMagneticEffect<HTMLButtonElement>({
        strength,
        disableOnTouch: true,
    });

    // Classes base
    const baseClasses = cn(
        // Reset e estrutura
        "relative inline-flex items-center justify-center",
        "font-semibold tracking-tight",
        "transition-all duration-300 ease-out",
        "transform-gpu",

        // Hover levitation
        "hover:-translate-y-1",

        // Focus ring
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

        // Disabled
        disabled && "opacity-50 pointer-events-none",

        // Variantes
        getVariantClasses(variant),

        // Tamanhos
        getSizeClasses(size),

        className
    );

    // Conteúdo interno com wrapper para inner magnetic effect
    const content = (
        <span className="relative z-10 flex items-center gap-2">
            {children}
        </span>
    );

    // Handlers tipados corretamente para cada elemento
    const handleAnchorMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onMouseMove(e as unknown as React.MouseEvent<HTMLButtonElement>);
    };

    // Renderiza como link se tiver href
    if (href) {
        return (
            <a
                ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={baseClasses}
                onMouseMove={handleAnchorMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                data-cursor={dataCursor}
            >
                {content}
                <MagneticGlow variant={variant} />
            </a>
        );
    }

    // Renderiza como botão
    return (
        <button
            ref={ref}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseClasses}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            data-cursor={dataCursor}
        >
            {content}
            <MagneticGlow variant={variant} />
        </button>
    );
});

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function MagneticGlow({ variant }: { variant: string }) {
    if (variant !== "primary") return null;

    return (
        <span
            className="
                absolute inset-0 rounded-full
                bg-gradient-to-r from-gray-500/20 via-pink-500/20 to-gray-500/20
                opacity-0 group-hover:opacity-100
                blur-xl transition-opacity duration-500
                -z-10
            "
        />
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getVariantClasses(variant: string): string {
    switch (variant) {
        case "primary":
            return cn(
                "bg-gradient-to-r from-gray-600 to-pink-600",
                "hover:from-gray-500 hover:to-pink-500",
                "text-white",
                "shadow-lg shadow-gray-500/30",
                "hover:shadow-xl hover:shadow-gray-500/40",
                "rounded-full",
                "group"
            );
        case "secondary":
            return cn(
                "bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-xl",
                "hover:from-gray-700/95 hover:via-gray-800/95 hover:to-gray-700/95",
                "text-white",
                "border border-white/30",
                "hover:border-white/50",
                "shadow-lg shadow-black/20",
                "rounded-full"
            );
        case "ghost":
            return cn(
                "bg-transparent",
                "hover:bg-black/5",
                "text-current",
                "rounded-xl"
            );
        default:
            return "";
    }
}

function getSizeClasses(size: string): string {
    switch (size) {
        case "sm":
            return "px-4 py-2 text-sm";
        case "md":
            return "px-6 py-3 text-base";
        case "lg":
            return "px-8 py-4 text-lg";
        default:
            return "px-6 py-3 text-base";
    }
}

export default MagneticButton;
