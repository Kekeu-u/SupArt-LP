"use client";

import { useCursorTracker, type CursorState } from "@/hooks/useCursorTracker";

// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR - Cursor customizado Awwwards-level
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Cursor customizado global com múltiplos estados visuais
 * Desabilitado automaticamente em touch devices
 * 
 * Estados:
 * - default: círculo normal
 * - hover: expande e muda cor
 * - click: pulsa
 * - magnetic: inverte cores
 * - hidden: invisível
 * 
 * @example
 * ```tsx
 * // Adicione ao layout.tsx
 * <CustomCursor />
 * 
 * // Para ativar estados em elementos:
 * <button data-cursor="hover">Hover me</button>
 * <div data-cursor="magnetic">Magnetic area</div>
 * ```
 */
export function CustomCursor() {
    const { outerRef, innerRef, state, isActive } = useCursorTracker();

    // Não renderiza em touch devices
    if (!isActive) return null;

    return (
        <>
            {/* Cursor Outer - Ring que segue com lag */}
            <div
                ref={outerRef}
                className={`
                    fixed top-0 left-0 pointer-events-none z-[9999]
                    w-10 h-10 -ml-5 -mt-5
                    rounded-full border-2
                    transition-all duration-200 ease-out
                    mix-blend-difference
                    ${getOuterStyles(state)}
                `}
                style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                }}
            />

            {/* Cursor Inner - Dot central */}
            <div
                ref={innerRef}
                className={`
                    fixed top-0 left-0 pointer-events-none z-[9999]
                    w-2 h-2 -ml-1 -mt-1
                    rounded-full
                    transition-all duration-150 ease-out
                    ${getInnerStyles(state)}
                `}
                style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                }}
            />

            {/* CSS Global para esconder cursor nativo */}
            <style jsx global>{`
                /* Esconde cursor nativo quando CustomCursor está ativo */
                * {
                    cursor: none !important;
                }
                
                /* Restaura cursor em iframes e outros contextos */
                iframe {
                    cursor: auto !important;
                }
            `}</style>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLE HELPERS - Estilos por estado
// ─────────────────────────────────────────────────────────────────────────────

function getOuterStyles(state: CursorState): string {
    switch (state) {
        case "hover":
            return "border-white scale-150 bg-white/10";
        case "click":
            return "border-white scale-75 bg-white/20";
        case "magnetic":
            return "border-gray-400 scale-200 bg-gray-400/10";
        case "hidden":
            return "opacity-0 scale-0";
        default:
            return "border-white";
    }
}

function getInnerStyles(state: CursorState): string {
    switch (state) {
        case "hover":
            return "bg-white scale-0";
        case "click":
            return "bg-white scale-150";
        case "magnetic":
            return "bg-gray-400 scale-200";
        case "hidden":
            return "opacity-0 scale-0";
        default:
            return "bg-white";
    }
}

export default CustomCursor;