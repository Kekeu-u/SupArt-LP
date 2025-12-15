"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { gsap, EASING } from "@/lib/gsap-config";

// ═══════════════════════════════════════════════════════════════════════════
// USE CURSOR TRACKER - Hook para cursor customizado global
// ═══════════════════════════════════════════════════════════════════════════

export type CursorState = "default" | "hover" | "click" | "magnetic" | "hidden";

interface CursorPosition {
    x: number;
    y: number;
}

interface CursorTrackerOptions {
    /** Desabilitar em touch devices. Default: true */
    disableOnTouch?: boolean;
    /** Velocidade de animação do cursor. Default: 0.15 */
    speed?: number;
}

interface CursorTrackerResult {
    /** Posição atual do cursor */
    position: CursorPosition;
    /** Estado atual do cursor */
    state: CursorState;
    /** Define o estado do cursor */
    setState: (state: CursorState) => void;
    /** Se o cursor está ativo (não é touch device) */
    isActive: boolean;
    /** Ref para o cursor outer */
    outerRef: React.RefObject<HTMLDivElement | null>;
    /** Ref para o cursor inner */
    innerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook para tracking de cursor customizado
 * Usa GSAP quickTo para animações suaves 60fps
 * 
 * @example
 * ```tsx
 * const { outerRef, innerRef, state, isActive } = useCursorTracker();
 * 
 * if (!isActive) return null;
 * 
 * return (
 *   <>
 *     <div ref={outerRef} className={`cursor-outer ${state}`} />
 *     <div ref={innerRef} className="cursor-inner" />
 *   </>
 * );
 * ```
 */
export function useCursorTracker(
    options: CursorTrackerOptions = {}
): CursorTrackerResult {
    const { disableOnTouch = true, speed = 0.15 } = options;

    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [state, setState] = useState<CursorState>("default");
    const [isActive, setIsActive] = useState(false);

    const outerRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);

    // QuickTo functions para animação fluida
    const quickToOuterX = useRef<gsap.QuickToFunc | null>(null);
    const quickToOuterY = useRef<gsap.QuickToFunc | null>(null);
    const quickToInnerX = useRef<gsap.QuickToFunc | null>(null);
    const quickToInnerY = useRef<gsap.QuickToFunc | null>(null);

    // Inicialização
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Detecta touch device
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (disableOnTouch && isTouchDevice) {
            setIsActive(false);
            return;
        }

        setIsActive(true);

        // Inicializa quickTo quando os refs estiverem disponíveis
        if (outerRef.current) {
            quickToOuterX.current = gsap.quickTo(outerRef.current, "x", {
                duration: speed * 2, // Outer é mais lento (efeito de lag)
                ease: EASING.smooth,
            });
            quickToOuterY.current = gsap.quickTo(outerRef.current, "y", {
                duration: speed * 2,
                ease: EASING.smooth,
            });
        }

        if (innerRef.current) {
            quickToInnerX.current = gsap.quickTo(innerRef.current, "x", {
                duration: speed, // Inner é mais rápido
                ease: EASING.smooth,
            });
            quickToInnerY.current = gsap.quickTo(innerRef.current, "y", {
                duration: speed,
                ease: EASING.smooth,
            });
        }
    }, [disableOnTouch, speed]);

    // Handler para movimento do mouse
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { clientX, clientY } = e;

        setPosition({ x: clientX, y: clientY });

        // Anima ambos os cursores
        quickToOuterX.current?.(clientX);
        quickToOuterY.current?.(clientY);
        quickToInnerX.current?.(clientX);
        quickToInnerY.current?.(clientY);
    }, []);

    // Handler para detectar elementos hover
    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // Verifica se tem atributo data-cursor
        const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");

        if (cursorType === "hover" || target.closest("a, button")) {
            setState("hover");
        } else if (cursorType === "magnetic") {
            setState("magnetic");
        } else if (cursorType === "hidden") {
            setState("hidden");
        } else {
            setState("default");
        }
    }, []);

    // Handler para click
    const handleMouseDown = useCallback(() => {
        setState("click");
    }, []);

    const handleMouseUp = useCallback(() => {
        setState((prev) => (prev === "click" ? "default" : prev));
    }, []);

    // Event listeners
    useEffect(() => {
        if (!isActive) return;

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isActive, handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp]);

    return {
        position,
        state,
        setState,
        isActive,
        outerRef,
        innerRef,
    };
}

export default useCursorTracker;
