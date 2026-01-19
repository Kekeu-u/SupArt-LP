'use client';

import { motion } from 'framer-motion';

interface ConnectionLinesProps {
    isVisible: boolean;
    activeIndex?: number; // -1 = all, 0-2 = specific line
}

export const ConnectionLines = ({ isVisible, activeIndex = -1 }: ConnectionLinesProps) => {
    const lines = [
        { id: 0, d: 'M 200 100 Q 300 80 400 150', label: 'Análise' },
        { id: 1, d: 'M 200 100 L 400 100', label: 'Roteamento' },
        { id: 2, d: 'M 200 100 Q 300 120 400 50', label: 'Validação' },
    ];

    return (
        <svg
            className="connection-lines absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 600 200"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                {/* Gradient for active lines */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6B46C1" />
                    <stop offset="50%" stopColor="#00d9ff" />
                    <stop offset="100%" stopColor="#00ff88" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {lines.map((line, idx) => {
                const isActive = activeIndex === -1 || activeIndex === idx;

                return (
                    <g key={line.id}>
                        {/* Base line (dim) */}
                        <motion.path
                            d={line.d}
                            fill="none"
                            stroke="rgba(107, 70, 193, 0.2)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                        />

                        {/* Active line (glowing) */}
                        {isActive && (
                            <motion.path
                                d={line.d}
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="3"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 + idx * 0.15 }}
                            />
                        )}

                        {/* Data packet (traveling orb) */}
                        {isVisible && isActive && (
                            <motion.circle
                                r="5"
                                fill="#00d9ff"
                                filter="url(#glow)"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    offsetDistance: ['0%', '100%']
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: 1 + idx * 0.3,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                                style={{
                                    offsetPath: `path('${line.d}')`,
                                    offsetRotate: '0deg'
                                }}
                            />
                        )}
                    </g>
                );
            })}
        </svg>
    );
};
