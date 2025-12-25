"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "pt";

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (en: string, pt: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en");

    // Auto-detect & Persist preference
    useEffect(() => {
        const saved = localStorage.getItem("supart-lang") as Locale;
        if (saved && (saved === "en" || saved === "pt")) {
            setLocale(saved);
        } else {
            // Auto-detect from browser
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith("pt")) {
                setLocale("pt");
            } else {
                setLocale("en");
            }
        }
    }, []);

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem("supart-lang", newLocale);
    };

    const t = (en: string, pt: string) => (locale === "en" ? en : pt);

    return (
        <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error("useI18n must be used within I18nProvider");
    }
    return context;
}

// Helper for data files
export function localized<T>(data: { en: T; pt: T }, locale: Locale): T {
    return data[locale];
}
