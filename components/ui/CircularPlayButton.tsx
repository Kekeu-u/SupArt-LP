"use client";

import React, { useId } from "react";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

interface CircularPlayButtonProps {
    href: string;
    className?: string;
    size?: number;
}

export const CircularPlayButton: React.FC<CircularPlayButtonProps> = ({
    href,
    className = "",
    size = 140,
}) => {
    const id = useId().replace(/:/g, '');
    const circleId = `textpath-${id}`;

    const radius = (size / 2) - 14;
    const cx = size / 2;
    const cy = size / 2;

    return (
        <Link href={href} className={`relative group block cursor-pointer ${className}`} style={{ width: size, height: size }}>
            {/* Rotating Text Ring */}
            <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
                    <defs>
                        <path
                            id={circleId}
                            d={`M ${cx},${cy - radius} A ${radius},${radius} 0 1,1 ${cx},${cy + radius} A ${radius},${radius} 0 1,1 ${cx},${cy - radius}`}
                            fill="none"
                        />
                    </defs>
                    <text className="fill-gray-300 font-medium uppercase" style={{ fontSize: 10 }}>
                        {/* 
                            lengthAdjust="spacingAndGlyphs" + textLength igual ao perímetro (2 * PI * radius)
                            garante distribuição perfeita sem gaps ou sobreposição
                        */}
                        <textPath
                            href={`#${circleId}`}
                            textLength={2 * Math.PI * radius}
                            lengthAdjust="spacing"
                        >
                            VER DEMO • VER DEMO • VER DEMO •&nbsp;
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="relative flex items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110 shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                    style={{ width: size * 0.42, height: size * 0.42 }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-lg" />
                    <div className="z-10 w-full h-full rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center border border-gray-200/50">
                        <FaPlay className="ml-0.5 text-purple-600" style={{ width: size * 0.12, height: size * 0.12 }} />
                    </div>
                </div>
            </div>
        </Link>
    );
};
