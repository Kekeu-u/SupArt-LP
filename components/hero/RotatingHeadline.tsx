"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const phrases = [
    { en: "Elite Design", pt: "Design de Elite" },
    { en: "Premium Strategy", pt: "Estratégia Premium" },
    { en: "Total Automation", pt: "Automação Total" },
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
        <div className="flex flex-col items-center justify-center text-center gap-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-none tracking-tight">
                {t("Your brand deserves", "Sua marca merece")}
            </h1>
            {/* Container compacto para mobile */}
            <div className="relative h-12 sm:h-16 md:h-20 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, filter: "blur(8px)", y: -15 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, filter: "blur(10px)", y: -15 }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-pink-300 to-violet-300 absolute whitespace-nowrap pb-1"
                    >
                        {phrases[index][locale]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

