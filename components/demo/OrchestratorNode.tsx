'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface OrchestratorNodeProps {
    isActive: boolean;
    isProcessing: boolean;
}

export const OrchestratorNode = ({ isActive, isProcessing }: OrchestratorNodeProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isActive && nodeRef.current) {
            gsap.to(nodeRef.current, {
                scale: 1.1,
                boxShadow: '0 0 60px rgba(107, 70, 193, 0.6)',
                duration: 0.4,
                ease: 'power2.out'
            });
        } else if (nodeRef.current) {
            gsap.to(nodeRef.current, {
                scale: 1,
                boxShadow: '0 0 30px rgba(107, 70, 193, 0.3)',
                duration: 0.3
            });
        }
    }, [isActive]);

    return (
        <div className="orchestrator relative flex flex-col items-center gap-4">
            {/* Particle effects (CSS-based) */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                {isProcessing && (
                    <>
                        <motion.div
                            className="absolute w-2 h-2 bg-purple-400 rounded-full"
                            animate={{
                                x: [0, 30, -20, 0],
                                y: [0, -40, 20, 0],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ top: '30%', left: '20%' }}
                        />
                        <motion.div
                            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                            animate={{
                                x: [0, -25, 15, 0],
                                y: [0, 30, -25, 0],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                            style={{ top: '50%', right: '25%' }}
                        />
                        <motion.div
                            className="absolute w-1 h-1 bg-pink-400 rounded-full"
                            animate={{
                                x: [0, 20, -30, 0],
                                y: [0, -20, 35, 0],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
                            style={{ bottom: '30%', left: '30%' }}
                        />
                    </>
                )}
            </div>

            {/* Main Node */}
            <motion.div
                ref={nodeRef}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#1a0b2e] to-[#0d0d0d] border-2 border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(107,70,193,0.3)] overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Inner glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-900/50 to-transparent" />

                {/* Pulsing ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                    animate={isProcessing ? { scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Brain/Network Icon */}
                <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-purple-400 relative z-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>

                {/* Processing spinner */}
                {isProcessing && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-t-2 border-purple-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                )}
            </motion.div>

            {/* Label */}
            <motion.div
                className="orchestrator-label text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-white'}`}>
                    Orquestrador IA
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                    {isProcessing ? 'Analisando...' : 'Aguardando'}
                </p>
            </motion.div>
        </div>
    );
};
