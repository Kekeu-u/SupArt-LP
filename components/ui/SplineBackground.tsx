"use client";

import React, { useRef, useEffect, useState } from "react";

interface VideoBackgroundProps {
    src: string;
    poster?: string;
    opacity?: number;
}

/**
 * Video Background - Ultra performant
 * Uses native HTML5 video with hardware acceleration
 */
export function VideoBackground({
    src,
    poster,
    opacity = 0.4
}: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Only play when loaded
        video.addEventListener("canplaythrough", () => {
            setIsLoaded(true);
            video.play().catch(() => {
                // Autoplay blocked, that's ok
            });
        });

        // Pause when not visible (save resources)
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
            style={{
                contain: "strict",
            }}
        >
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{
                    opacity: isLoaded ? opacity : 0,
                    willChange: "transform",
                }}
                src={src}
                poster={poster}
                muted
                loop
                playsInline
                preload="auto"
            />
        </div>
    );
}

// Fallback to Spline if no video provided
export function SplineBackground() {
    // Placeholder - você vai trocar pelo vídeo
    return (
        <VideoBackground
            src="/background-loop.webm"
            opacity={0.4}
        />
    );
}

export default SplineBackground;
