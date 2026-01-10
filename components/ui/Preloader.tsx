"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HamsterLoader } from "@/components/ui/HamsterLoader";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for page to be fully ready
        const handleLoad = () => {
            // Small delay to ensure smooth transition
            setTimeout(() => setIsLoading(false), 300);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            // Fallback timeout in case load event doesn't fire
            const fallback = setTimeout(() => setIsLoading(false), 3000);
            return () => {
                window.removeEventListener("load", handleLoad);
                clearTimeout(fallback);
            };
        }
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="scale-75 md:scale-100">
                            <HamsterLoader />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
