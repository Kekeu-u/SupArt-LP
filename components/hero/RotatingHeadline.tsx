"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const phrases = [
    { en: "work for you", pt: "trabalharem por você" },
    { en: "scale your business", pt: "escalarem seu negócio" },
    { en: "serve your clients", pt: "atenderem seus clientes" },
    { en: "automate your sales", pt: "automatizarem suas vendas" },
];

export const RotatingHeadline = () => {
    const { locale, t } = useI18n();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {t("We make AI Agents", "Fazemos Agentes de IA")}
            </h1>
            <div className="h-12 sm:h-16 md:h-20 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 pb-2"
                    >
                        {phrases[index][locale]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};
