"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader - Loading screen minimalista enquanto a página carrega
 * 
 * Features:
 * - Aparece imediatamente (sem flash)
 * - Animação de logo/glow suave
 * - Desaparece com fade após conteúdo carregar
 * - Previne interação até pronto
 */
export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Aguarda o DOM estar pronto + pequeno buffer
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Tempo mínimo para garantir que hero renderize

        // Fallback: força remoção após 3s mesmo se algo travar
        const fallback = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(fallback);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Glow central animado */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Círculo pulsante de fundo */}
                        <motion.div
                            className="absolute -inset-12 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-2xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Logo text */}
                        <div className="relative text-2xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                                SupArt
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Preloader;
