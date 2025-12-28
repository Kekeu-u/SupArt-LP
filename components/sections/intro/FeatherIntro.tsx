"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FeatherIntroProps {
    onComplete?: () => void;
}

export const FeatherIntro = ({ onComplete }: FeatherIntroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const featherRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !featherRef.current) return;

            // Timeline for feather falling animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                    onLeave: () => onComplete?.(),
                },
            });

            // Feather falling animation
            // Phase 1: Gentle sway while falling
            tl.fromTo(
                featherRef.current,
                {
                    y: "-100vh",
                    x: "10vw",
                    rotation: -15,
                    scale: 0.5,
                    opacity: 0,
                },
                {
                    y: "30vh",
                    x: "-5vw",
                    rotation: 15,
                    scale: 1,
                    opacity: 1,
                    ease: "power1.inOut",
                    duration: 0.5,
                }
            );

            // Phase 2: Landing with bounce
            tl.to(featherRef.current, {
                y: "40vh",
                x: "0",
                rotation: 0,
                scale: 1.1,
                ease: "elastic.out(1, 0.5)",
                duration: 0.3,
            });

            // Phase 3: Fade out and reveal
            tl.to(featherRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
            });

            return () => {
                tl.kill();
            };
        },
        { scope: containerRef, dependencies: [] }
    );

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full bg-gradient-to-b from-black via-[#0a0a0a] to-transparent z-50"
        >
            {/* Feather Container */}
            <div
                ref={featherRef}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] pointer-events-none"
            >
                {/* 
                    TODO: Replace with actual 3D feather asset
                    Options:
                    1. Spline 3D scene
                    2. Three.js with GLTF model
                    3. High-quality PNG with CSS 3D transforms
                */}
                <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                    [3D Feather Asset Placeholder]
                </div>
            </div>

            {/* Ambient particles (optional enhancement) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Subtle floating particles can be added here */}
            </div>
        </section>
    );
};

export default FeatherIntro;
