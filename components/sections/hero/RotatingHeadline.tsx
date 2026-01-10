"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { headlines, headlinePrefix } from "@/data/headlines";
import { useI18n } from "@/lib/i18n";

export const RotatingHeadline = () => {
    const { locale } = useI18n();
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentHeadlines = headlines[locale];
    const prefix = headlinePrefix[locale];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % currentHeadlines.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentHeadlines.length]);

    return (
        <div className="relative flex flex-col items-center">
            {/* Main line */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8 text-balance text-center tracking-tight">
                {prefix}
            </h1>

            {/* Rotating word */}
            <div className="h-[1.2em] overflow-visible flex items-center justify-center relative w-full">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentIndex}
                        initial={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-500 absolute whitespace-nowrap"
                    >
                        {currentHeadlines[currentIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8 z-10">
                {currentHeadlines.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex
                            ? 'w-8 bg-gray-900'
                            : 'w-1.5 bg-black/10 hover:bg-black/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
