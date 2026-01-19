"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

interface CircularPlayButtonProps {
    href: string;
    className?: string;
    size?: number; // Total diameter
}

export const CircularPlayButton: React.FC<CircularPlayButtonProps> = ({
    href,
    className = "",
    size = 140, // Default size
}) => {
    // Config for the text ring
    const text = "VER DEMONSTRAÇÃO • VER DEMONSTRAÇÃO • ";
    const radius = size / 2;
    const fontSize = 12; // Adjust based on size
    const letterSpacing = 3.1;

    return (
        <Link href={href} className={`relative group block cursor-pointer ${className}`} style={{ width: size, height: size }}>
            {/* 1. Rotating Text Ring */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transformOrigin: "center center" }}
            >
                <svg
                    viewBox={`0 0 ${size} ${size}`}
                    width={size}
                    height={size}
                    className="w-full h-full"
                    style={{ overflow: "visible" }}
                >
                    {/* Top Arc Path: Clockwise (Text sits outside) */}
                    <path
                        id="topCurve"
                        d={`M ${size / 2 - (size / 2 - 15)},${size / 2} A ${size / 2 - 15},${size / 2 - 15} 0 0,1 ${size / 2 + (size / 2 - 15)},${size / 2}`}
                        fill="none"
                    />

                    {/* Bottom Arc Path: Counter-clockwise (Text sits inside) 
                        Radius increased by ~9px to make the 'inside' text match the 'outside' text's ring position.
                    */}
                    <path
                        id="bottomCurve"
                        d={`M ${size / 2 - (size / 2 - 15 + 9)},${size / 2} A ${size / 2 - 15 + 9},${size / 2 - 15 + 9} 0 0,0 ${size / 2 + (size / 2 - 15 + 9)},${size / 2}`}
                        fill="none"
                    />

                    {/* Top Text */}
                    <text className="fill-gray-300 font-medium tracking-[2.5px] uppercase text-[10px]" textAnchor="middle" dominantBaseline="auto">
                        <textPath href="#topCurve" startOffset="50%">
                            VER DEMONSTRAÇÃO •
                        </textPath>
                    </text>

                    {/* Bottom Text */}
                    <text className="fill-gray-300 font-medium tracking-[2.5px] uppercase text-[10px]" textAnchor="middle" dominantBaseline="auto">
                        <textPath href="#bottomCurve" startOffset="50%">
                            • VER DEMONSTRAÇÃO
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* 2. Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="relative flex items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    style={{ width: size * 0.4, height: size * 0.4 }}
                >
                    {/* Glass/Gradient layer behind (optional, keeping it clean white for contrast per Apple Pro style or gradients if preferred)
              Let's use the requested gradient style: Purple/Pink or clean White.
              User mentioned "premium". Let's try a subtle gradient border or glow.
           */}

                    {/* Active Gradient Background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

                    {/* Actual Button Circle */}
                    <div className="z-10 w-full h-full rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center border border-white/50">
                        <FaPlay className="ml-1 w-4 h-4 text-purple-600" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
