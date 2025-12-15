"use client";

import { useEffect, createContext, useContext, ReactNode } from "react";
import { initLenis, destroyLenis, getLenis, scrollTo, stopScroll, startScroll } from "@/lib/lenis-config";
import type Lenis from "lenis";

// ═══════════════════════════════════════════════════════════════════════════
// LENIS PROVIDER - Smooth scroll global para Next.js App Router
// ═══════════════════════════════════════════════════════════════════════════

interface LenisContextValue {
    /** Instância do Lenis */
    lenis: Lenis | null;
    /** Scroll para um elemento ou posição */
    scrollTo: typeof scrollTo;
    /** Para o scroll */
    stop: typeof stopScroll;
    /** Retoma o scroll */
    start: typeof startScroll;
}

const LenisContext = createContext<LenisContextValue | null>(null);

interface LenisProviderProps {
    children: ReactNode;
}

/**
 * Provider que inicializa o Lenis smooth scroll globalmente
 * Deve envolver toda a aplicação no layout.tsx
 * 
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { LenisProvider } from "@/components/LenisProvider";
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <LenisProvider>
 *           {children}
 *         </LenisProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function LenisProvider({ children }: LenisProviderProps) {
    useEffect(() => {
        // Inicializa Lenis no mount
        const lenis = initLenis();

        // Cleanup no unmount
        return () => {
            destroyLenis();
        };
    }, []);

    const value: LenisContextValue = {
        lenis: getLenis(),
        scrollTo,
        stop: stopScroll,
        start: startScroll,
    };

    return (
        <LenisContext.Provider value={value}>
            {children}
        </LenisContext.Provider>
    );
}

/**
 * Hook para acessar o Lenis context
 */
export function useLenis(): LenisContextValue {
    const context = useContext(LenisContext);

    if (!context) {
        // Retorna valores default se não houver provider
        // Isso permite o componente funcionar mesmo sem provider
        return {
            lenis: null,
            scrollTo,
            stop: stopScroll,
            start: startScroll,
        };
    }

    return context;
}

export default LenisProvider;
