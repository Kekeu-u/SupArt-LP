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
        <div className="flex flex-col items-center justify-center text-center gap-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tight">
                {t("Your brand deserves", "Sua marca merece")}
            </h1>
            {/* Container */}
            <div className="relative h-14 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, filter: "blur(12px)", y: -20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-pink-300 to-violet-300 absolute whitespace-nowrap pb-2"
                    >
                        {phrases[index][locale]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

