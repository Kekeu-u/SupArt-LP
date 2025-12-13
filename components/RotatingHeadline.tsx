"use client";

import { useState, useEffect } from "react";
import { headlines } from "@/data/headlines";

export const RotatingHeadline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsExiting(true);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % headlines.length);
                setIsExiting(false);
            }, 600); // Animação mais lenta
        }, 5000); // Intervalo maior entre trocas

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            {/* Linha principal - tudo junto */}
            <h1 className="headline-hero text-balance text-center">
                Design que converte pela
            </h1>

            {/* Palavra rotativa - linha separada, menor */}
            <div className="text-center mt-2">
                <span
                    className={`headline-section text-[var(--color-apple-gray)] inline-block transition-all ${isExiting
                            ? 'opacity-0 -translate-y-4 blur-[3px]'
                            : 'opacity-100 translate-y-0 blur-0'
                        }`}
                    style={{
                        transitionDuration: '600ms',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {headlines[currentIndex]}
                </span>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8">
                {headlines.map((_, index) => (
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
                                ? 'w-8 bg-[var(--color-apple-black)]'
                                : 'w-1.5 bg-black/10 hover:bg-black/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
