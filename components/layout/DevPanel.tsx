"use client";

import { useState, useEffect, useCallback } from "react";
import { getGSAPStats } from "@/hooks/useScrollAnimation";

// Só exportar/renderizar em desenvolvimento
const isDev = process.env.NODE_ENV === "development";

interface Metrics {
    fps: number;
    fcp: number | null;
    lcp: number | null;
    cls: number;
    tweens: number;
    scrollTriggers: number;
    transferSize: string;
}

/**
 * DevPanel - Painel de métricas visível apenas em desenvolvimento
 *
 * Exibe:
 * - FPS em tempo real
 * - Core Web Vitals (FCP, LCP, CLS)
 * - Animações GSAP ativas
 * - ScrollTriggers registrados
 * - Transfer size da página
 */
export function DevPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [metrics, setMetrics] = useState<Metrics>({
        fps: 0,
        fcp: null,
        lcp: null,
        cls: 0,
        tweens: 0,
        scrollTriggers: 0,
        transferSize: "...",
    });

    // Monitor de FPS
    useEffect(() => {
        if (!isOpen) return;

        let frameCount = 0;
        let lastTime = performance.now();
        let animationId: number;

        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - lastTime;

            if (elapsed >= 1000) {
                const fps = Math.round((frameCount * 1000) / elapsed);
                setMetrics((prev) => ({ ...prev, fps }));
                frameCount = 0;
                lastTime = currentTime;
            }

            animationId = requestAnimationFrame(measureFPS);
        };

        animationId = requestAnimationFrame(measureFPS);

        return () => cancelAnimationFrame(animationId);
    }, [isOpen]);

    // Core Web Vitals via Performance API
    useEffect(() => {
        if (!isOpen || typeof window === "undefined") return;

        // FCP
        const paintEntries = performance.getEntriesByType("paint");
        const fcpEntry = paintEntries.find((e) => e.name === "first-contentful-paint");
        if (fcpEntry) {
            setMetrics((prev) => ({ ...prev, fcp: Math.round(fcpEntry.startTime) }));
        }

        // LCP via PerformanceObserver
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
                setMetrics((prev) => ({
                    ...prev,
                    lcp: Math.round(lastEntry.startTime),
                }));
            }
        });

        try {
            lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
        } catch {
            // LCP não suportado
        }

        // CLS via PerformanceObserver
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as PerformanceEntry[]) {
                // @ts-expect-error - Layout shift entries have hadRecentInput
                if (!entry.hadRecentInput) {
                    // @ts-expect-error - Layout shift entries have value
                    clsValue += entry.value;
                    setMetrics((prev) => ({ ...prev, cls: Math.round(clsValue * 1000) / 1000 }));
                }
            }
        });

        try {
            clsObserver.observe({ type: "layout-shift", buffered: true });
        } catch {
            // CLS não suportado
        }

        // Transfer Size
        const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
        if (navEntries.length > 0) {
            const transferBytes = navEntries[0].transferSize;
            const transferKB = (transferBytes / 1024).toFixed(1);
            setMetrics((prev) => ({ ...prev, transferSize: `${transferKB} KB` }));
        }

        return () => {
            lcpObserver.disconnect();
            clsObserver.disconnect();
        };
    }, [isOpen]);

    // GSAP Stats polling
    useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            const stats = getGSAPStats();
            setMetrics((prev) => ({
                ...prev,
                tweens: stats.tweens,
                scrollTriggers: stats.scrollTriggers,
            }));
        }, 500);

        return () => clearInterval(interval);
    }, [isOpen]);

    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    // Não renderizar em produção
    if (!isDev) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[9999] font-mono text-xs">
            {/* Botão Toggle */}
            <button
                onClick={toggle}
                className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-lg hover:scale-110 transition-transform shadow-2xl"
                title="DevPanel"
            >
                📊
            </button>

            {/* Painel Expandido */}
            {isOpen && (
                <div className="absolute bottom-14 right-0 w-64 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-2xl">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                        <span className="text-white/70 font-semibold">DevPanel</span>
                        <button
                            onClick={toggle}
                            className="text-white/50 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-2">
                        {/* FPS */}
                        <MetricRow
                            label="FPS"
                            value={metrics.fps}
                            status={metrics.fps >= 55 ? "good" : metrics.fps >= 30 ? "warn" : "bad"}
                        />

                        {/* Core Web Vitals */}
                        <div className="pt-2 border-t border-white/5">
                            <span className="text-white/40 text-[10px] uppercase tracking-wider">
                                Core Web Vitals
                            </span>
                        </div>

                        <MetricRow
                            label="FCP"
                            value={metrics.fcp !== null ? `${metrics.fcp}ms` : "..."}
                            status={
                                metrics.fcp === null
                                    ? "neutral"
                                    : metrics.fcp <= 1800
                                        ? "good"
                                        : metrics.fcp <= 3000
                                            ? "warn"
                                            : "bad"
                            }
                        />

                        <MetricRow
                            label="LCP"
                            value={metrics.lcp !== null ? `${metrics.lcp}ms` : "..."}
                            status={
                                metrics.lcp === null
                                    ? "neutral"
                                    : metrics.lcp <= 2500
                                        ? "good"
                                        : metrics.lcp <= 4000
                                            ? "warn"
                                            : "bad"
                            }
                        />

                        <MetricRow
                            label="CLS"
                            value={metrics.cls}
                            status={metrics.cls <= 0.1 ? "good" : metrics.cls <= 0.25 ? "warn" : "bad"}
                        />

                        {/* GSAP Stats */}
                        <div className="pt-2 border-t border-white/5">
                            <span className="text-white/40 text-[10px] uppercase tracking-wider">
                                GSAP
                            </span>
                        </div>

                        <MetricRow label="Tweens" value={metrics.tweens} status="neutral" />
                        <MetricRow label="ScrollTriggers" value={metrics.scrollTriggers} status="neutral" />

                        {/* Transfer Size */}
                        <div className="pt-2 border-t border-white/5">
                            <MetricRow label="Transfer" value={metrics.transferSize} status="neutral" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente auxiliar para linha de métrica
function MetricRow({
    label,
    value,
    status,
}: {
    label: string;
    value: string | number;
    status: "good" | "warn" | "bad" | "neutral";
}) {
    const statusColors = {
        good: "text-green-400",
        warn: "text-yellow-400",
        bad: "text-red-400",
        neutral: "text-white/70",
    };

    return (
        <div className="flex justify-between items-center">
            <span className="text-white/50">{label}</span>
            <span className={statusColors[status]}>{value}</span>
        </div>
    );
}
