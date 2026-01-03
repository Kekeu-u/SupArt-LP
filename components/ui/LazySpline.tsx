"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LazySplineProps {
    src: string;
    className?: string;
    delay?: number; // ms antes de começar a carregar
}

/**
 * LazySpline - Carrega o iframe do Spline apenas quando necessário
 * 
 * Features:
 * - Intersection Observer para detectar visibilidade
 * - Delay configurável para não competir com conteúdo crítico
 * - Placeholder animado enquanto carrega
 * - Fade-in suave quando pronto
 */
export function LazySpline({ src, className = "", delay = 800 }: LazySplineProps) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Aguarda o delay inicial para não competir com o hero
        const delayTimer = setTimeout(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setShouldLoad(true);
                        observer.disconnect();
                    }
                },
                {
                    rootMargin: "100px", // Começa a carregar 100px antes de entrar na viewport
                    threshold: 0.01
                }
            );

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }

            return () => observer.disconnect();
        }, delay);

        return () => clearTimeout(delayTimer);
    }, [delay]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full ${className}`}
        >
            {/* Placeholder animado - sempre visível até carregar */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-pink-900/20"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Glow pulsante */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Iframe - só renderiza quando shouldLoad é true */}
            {shouldLoad && (
                <motion.iframe
                    src={src}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    title="Spline 3D Background"
                    style={{ pointerEvents: "none" }}
                    onLoad={() => setIsLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            )}
        </div>
    );
}

export default LazySpline;
