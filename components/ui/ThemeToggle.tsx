"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={styles.switch} style={{ opacity: 0 }} />; // Placeholder
    }

    // Logic: 
    // Unchecked (Default CSS) = Dark Mode (Moon/Stars)
    // Checked = Light Mode (Sun/Clouds)
    // So checked should be true when theme is 'light'
    const isLight = theme === "light";

    const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? "light" : "dark");
    };

    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={isLight}
                onChange={toggleTheme}
                aria-label="Toggle Dark Mode"
            />
            <span className={styles.slider}>
                <span className={`${styles.star} ${styles.star_1}`}></span>
                <span className={`${styles.star} ${styles.star_2}`}></span>
                <span className={`${styles.star} ${styles.star_3}`}></span>

                {/* Cloud SVG */}
                <svg
                    className={styles.cloud}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17 10C17 6.68629 14.3137 4 11 4C7.68629 4 5 6.68629 5 10C2.23858 10 0 12.2386 0 15C0 17.7614 2.23858 20 5 20H17C19.7614 20 22 17.7614 22 15C22 12.2386 19.7614 10 17 10Z" fill="white" />
                </svg>
            </span>
        </label>
    );
}
