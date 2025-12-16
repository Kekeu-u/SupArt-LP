"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoLoaderProps {
    /**
     * Tamanho do loader em pixels.
     * @default 120
     */
    size?: number;
    /**
     * Cor do contorno. 
     * @default "currentColor"
     */
    color?: string;
    /**
     * Duração da animação em segundos.
     * @default 2.5
     */
    duration?: number;
    /**
     * Classes CSS adicionais.
     */
    className?: string;
    /**
     * Se true, mostra o texto "Carregando..." abaixo.
     * @default false
     */
    showText?: boolean;
}

// Path da logo SupArt
const LOGO_PATH = "M499.706 289.76c2.902-5.094 5.598-9.885 8.376-14.628 3.362-5.74 6.297-5.731 9.625.037 22.555 39.1 45.088 78.212 67.638 117.314 16.726 29.002 33.473 57.992 50.187 87 .884 1.536 2.228 2.943 1.925 5.02-1.69 1.116-2.834-.299-4.005-.97-21.244-12.181-42.449-24.43-63.698-36.601-2.594-1.486-4.174-3.68-5.608-6.179-14.834-25.865-29.711-51.704-44.586-77.545-.484-.842-1.07-1.625-2.208-3.337-.147 2.508-.318 4.06-.317 5.613.014 46.322.092 92.645-.003 138.967-.01 4.466 1.213 7.164 5.326 9.53 63.957 36.814 127.801 73.821 191.669 110.79 1.585.917 3.173 1.839 4.696 2.855 5.783 3.863 5.76 6.101-.171 9.55-12.096 7.031-24.227 14.001-36.335 21.012-48.29 27.962-96.574 55.931-144.863 83.893-6.774 3.922-13.621 7.721-20.32 11.769-2.946 1.78-5.436 1.607-8.357-.082-38.648-22.342-77.344-44.603-116.015-66.906-1.408-.812-3.036-1.465-3.616-3.197.091-1.638 1.338-2.262 2.468-2.93 11.47-6.78 22.986-13.48 34.402-20.35 2.748-1.653 4.882-.983 7.372.465 22.174 12.899 44.37 25.76 66.617 38.535 8.28 4.755 8.79 4.378 8.795-5.237.019-42.157.044-84.314.02-126.471-.002-2.089.55-4.288-.742-6.59-4.992 1.586-9.143 4.693-13.535 7.23-49.037 28.323-98.043 56.702-146.973 85.21-4.4 2.562-7.892 2.747-12.321-.035-8.879-5.578-18.111-10.596-27.241-15.768-6.013-3.406-6.442-4.62-3.03-10.532 16.32-28.277 32.667-56.54 48.99-84.815 45.8-79.342 91.594-158.69 137.393-238.033 2.748-4.76 5.516-9.506 8.445-14.584M460.03 443.48l-81.14 140.865c3.388-.076 4.814-1.325 6.373-2.226 39.378-22.764 78.717-45.596 118.174-68.223 3.804-2.181 5.384-4.475 5.371-8.957-.131-46.666-.033-93.332-.023-139.998 0-1.39.36-2.887-.799-4.68-16.013 27.774-31.81 55.174-47.956 83.219m176.93 185.953-119.414-68.964c-.208 2.43-.437 3.862-.437 5.295-.002 43.951.008 87.903.046 131.855.005 5.558.927 6.122 5.677 3.392 38.239-21.979 76.46-43.99 114.669-66.019 1.228-.708 2.776-1.18 3.278-3.096a278 278 0 0 0-3.82-2.463";

export function LogoLoader({
    size = 120,
    color = "currentColor",
    duration = 2.5,
    className = "",
    showText = false,
}: LogoLoaderProps) {
    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
            <svg
                width={size}
                height={size}
                viewBox="290 270 450 540"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                {/* Ghost path para sombra/guia */}
                <path
                    d={LOGO_PATH}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.1"
                />

                {/* Path animado com stroke-dasharray */}
                <motion.path
                    d={LOGO_PATH}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                        pathLength: 0,
                        opacity: 0.5
                    }}
                    animate={{
                        pathLength: 1,
                        opacity: 1
                    }}
                    transition={{
                        pathLength: {
                            duration: duration,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 0.5,
                        },
                        opacity: {
                            duration: 0.5,
                        }
                    }}
                />

                {/* Glow effect */}
                <motion.path
                    d={LOGO_PATH}
                    fill="none"
                    stroke={color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="blur(8px)"
                    initial={{
                        pathLength: 0,
                        opacity: 0
                    }}
                    animate={{
                        pathLength: 1,
                        opacity: 0.3
                    }}
                    transition={{
                        pathLength: {
                            duration: duration,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 0.5,
                        },
                        opacity: {
                            duration: 0.5,
                        }
                    }}
                />
            </svg>

            {showText && (
                <motion.p
                    className="text-sm font-medium opacity-60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Carregando...
                </motion.p>
            )}
        </div>
    );
}

/**
 * Componente de loading de página inteira.
 * Útil para transições de página ou loading inicial do app.
 */
export function PageLoader({ className = "" }: { className?: string }) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-apple-off-white)]/95 backdrop-blur-sm ${className}`}>
            <LogoLoader size={150} showText />
        </div>
    );
}

/**
 * Componente de loading para seções/cards.
 * Versão menor para usar em containers específicos.
 */
export function SectionLoader({
    className = "",
    size = 80
}: {
    className?: string;
    size?: number;
}) {
    return (
        <div className={`flex items-center justify-center py-12 ${className}`}>
            <LogoLoader size={size} />
        </div>
    );
}

export default LogoLoader;
