"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroLogo } from "@/components/sections/hero/HeroLogo";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula um tempo mínimo de carregamento para garantir que a animação seja vista
        // e para dar tempo de carregar recursos críticos
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HeroLogo size={100} />
                        <motion.div
                            className="mt-8 h-1 w-32 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mx-auto"
                        >
                            <motion.div
                                className="h-full bg-black dark:bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
