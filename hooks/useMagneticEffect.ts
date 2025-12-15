"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap, EASING, DURATION } from "@/lib/gsap-config";

// ═══════════════════════════════════════════════════════════════════════════
// USE MAGNETIC EFFECT - Hook para efeito magnético em elementos
// ═══════════════════════════════════════════════════════════════════════════

interface MagneticOptions {
    /** Força do efeito magnético (0-1). Default: 0.3 */
    strength?: number;
    /** Duração da animação de retorno. Default: 0.4 */
    duration?: number;
    /** Easing da animação. Default: power2.out */
    ease?: string;
    /** Desabilitar em touch devices. Default: true */
    disableOnTouch?: boolean;
}

interface MagneticResult<T extends HTMLElement> {
    /** Ref para o elemento */
    ref: React.RefObject<T | null>;
    /** Callback para onMouseMove */
    onMouseMove: (e: React.MouseEvent<T>) => void;
    /** Callback para onMouseLeave */
    onMouseLeave: () => void;
}

/**
 * Hook para adicionar efeito magnético a elementos
 * O elemento "segue" o cursor quando hover
 * 
 * @example
 * ```tsx
 * const { ref, onMouseMove, onMouseLeave } = useMagneticEffect<HTMLButtonElement>();
 * 
 * return (
 *   <button
 *     ref={ref}
 *     onMouseMove={onMouseMove}
 *     onMouseLeave={onMouseLeave}
 *   >
 *     Hover me
 *   </button>
 * );
 * ```
 */
export function useMagneticEffect<T extends HTMLElement = HTMLDivElement>(
    options: MagneticOptions = {}
): MagneticResult<T> {
    const {
        strength = 0.3,
        duration = DURATION.normal,
        ease = EASING.smooth,
        disableOnTouch = true,
    } = options;

    const ref = useRef<T | null>(null);
    const quickToX = useRef<gsap.QuickToFunc | null>(null);
    const quickToY = useRef<gsap.QuickToFunc | null>(null);
    const isTouchDevice = useRef(false);

    // Inicializa quickTo para animações fluidas 60fps
    useEffect(() => {
        if (!ref.current) return;

        // Detecta touch device
        isTouchDevice.current =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        // Cria funções quickTo para x e y
        quickToX.current = gsap.quickTo(ref.current, "x", {
            duration,
            ease,
        });

        quickToY.current = gsap.quickTo(ref.current, "y", {
            duration,
            ease,
        });

        return () => {
            // Reset na desmontagem
            if (ref.current) {
                gsap.set(ref.current, { x: 0, y: 0 });
            }
        };
    }, [duration, ease]);

    // Handler para movimento do mouse
    const onMouseMove = useCallback(
        (e: React.MouseEvent<T>) => {
            if (!ref.current || !quickToX.current || !quickToY.current) return;
            if (disableOnTouch && isTouchDevice.current) return;

            const rect = ref.current.getBoundingClientRect();

            // Calcula posição relativa ao centro do elemento
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Distância do cursor ao centro
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // Aplica a força magnética
            quickToX.current(deltaX * strength);
            quickToY.current(deltaY * strength);
        },
        [strength, disableOnTouch]
    );

    // Handler para quando o mouse sai
    const onMouseLeave = useCallback(() => {
        if (!quickToX.current || !quickToY.current) return;
        if (disableOnTouch && isTouchDevice.current) return;

        // Retorna suavemente ao centro
        quickToX.current(0);
        quickToY.current(0);
    }, [disableOnTouch]);

    return { ref, onMouseMove, onMouseLeave };
}

export default useMagneticEffect;
