"use client";

import { useState, useEffect } from "react";
import { headlines, headlinePrefix } from "@/data/headlines";
import { useI18n } from "@/lib/i18n";

export const RotatingHeadline = () => {
    const { locale } = useI18n();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const currentHeadlines = headlines[locale];
    const prefix = headlinePrefix[locale];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsExiting(true);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % currentHeadlines.length);
                setIsExiting(false);
            }, 600);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentHeadlines.length]);

    return (
        <div className="relative">
            {/* Main line */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 text-balance text-center tracking-tight">
                {prefix}
            </h1>

            {/* Rotating word */}
            <div className="text-center">
                <span
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-500 dark:text-gray-400 inline-block transition-all ${isExiting
                        ? 'opacity-0 -translate-y-4 blur-[3px]'
                        : 'opacity-100 translate-y-0 blur-0'
                        }`}
                    style={{
                        transitionDuration: '600ms',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {currentHeadlines[currentIndex]}
                </span>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8">
                {currentHeadlines.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsExiting(true);
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setIsExiting(false);
                            }, 300);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex
                            ? 'w-8 bg-gray-900 dark:bg-white'
                            : 'w-1.5 bg-black/10 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
