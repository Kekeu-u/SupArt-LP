import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                leather: {
                    black: "#1a1a1a",
                    dark: "#2d2d2d",
                    accent: "#4a4a4a",
                },
                cream: {
                    light: "#f5f5f0",
                    DEFAULT: "#e8e8e3",
                },
            },
        },
    },
    plugins: [],
};
export default config;
