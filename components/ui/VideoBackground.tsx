"use client";

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
    return (
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
            {/* Video Element */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/background-main.png"
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/video-bg.webm" type="video/webm" />
                {/* Fallback message */}
                Seu navegador não suporta vídeos.
            </video>
        </div>
    );
}
