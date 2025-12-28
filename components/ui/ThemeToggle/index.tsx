"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <motion.label
            className="relative inline-block w-16 h-8 cursor-pointer"
            whileTap={{ scale: 0.95 }}
        >
            <input
                type="checkbox"
                className="sr-only"
                checked={isDark}
                onChange={() => setTheme(isDark ? "light" : "dark")}
            />

            {/* Background Slider */}
            <motion.div
                className="absolute inset-0 rounded-full overflow-hidden shadow-md"
                animate={{
                    backgroundColor: isDark ? "#2a2a2a" : "#00a6ff"
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                {/* Stars (Dark Mode) */}
                {[
                    { left: "60%", top: "20%" },
                    { left: "55%", top: "55%" },
                    { left: "72%", top: "40%" }
                ].map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={pos}
                        animate={{
                            opacity: isDark ? 1 : 0,
                            scale: isDark ? 1 : 0
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                ))}

                {/* Cloud SVG (Light Mode) */}
                <motion.svg
                    className="absolute w-10 h-10"
                    style={{ left: "-12%", bottom: "-44%" }}
                    viewBox="0 0 16 16"
                    animate={{
                        opacity: isDark ? 0 : 1,
                        y: isDark ? 8 : -3
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <path
                        transform="matrix(.77976 0 0 .78395 -299.99 -418.63)"
                        fill="#fff"
                        d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                    />
                </motion.svg>
            </motion.div>

            {/* Sun/Moon Ball */}
            <motion.div
                className="absolute top-1 left-1 w-6 h-6 rounded-full shadow-inner"
                animate={{
                    x: isDark ? 0 : 32,
                    boxShadow: isDark
                        ? "inset 8px -4px 0 0 #fff"
                        : "inset 15px -4px 0 15px #ffcf48"
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.81, -0.04, 0.38, 1.5] // Original cubic-bezier bounce
                }}
            />
        </motion.label>
    );
}
