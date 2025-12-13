"use client";

import { useState, useEffect } from "react";
import { headlines } from "@/data/headlines";

export const RotatingHeadline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = headlines[currentIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentWord.length) {
                    setDisplayText(currentWord.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % headlines.length);
                }
            }
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex]);

    return (
        <div className="relative">
            <h1 className="headline-hero text-balance text-center">
                <span className="block">Design que converte</span>
                <span className="block">
                    pela{" "}
                    <span className="text-[var(--color-apple-gray)] inline-block min-w-[8ch] sm:min-w-[12ch] md:min-w-[14ch] text-left">
                        {displayText}
                        <span className="animate-pulse font-light">|</span>
                    </span>
                </span>
            </h1>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8">
                {headlines.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDisplayText("");
                            setIsDeleting(false);
                            setCurrentIndex(index);
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
