"use client";

import { useRef, useEffect } from "react";

/**
 * VideoBackground - Componente de vídeo em looping como background
 * 
 * Renderiza um vídeo fullscreen atrás de todo o conteúdo.
 * Features:
 * - Autoplay com mute (necessário para autoplay em browsers)
 * - Loop infinito
 * - Carregamento otimizado com playsInline
 * - Fallback com poster image
 */
export function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Force play on mount to ensure autoplay works in all browsers
            video.play().catch(() => {
                // Silently handle autoplay restrictions
                // Video will show poster image as fallback
            });
        }
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
            {/* Video Element */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/background-main.png"
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/Video-Bg.webm" type="video/webm" />
                {/* Fallback message */}
                Seu navegador não suporta vídeos.
            </video>
        </div>
    );
}
