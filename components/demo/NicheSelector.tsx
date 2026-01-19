'use client';

import { motion } from 'framer-motion';
import { niches } from '@/lib/demo/flowData';

interface NicheSelectorProps {
    onSelect: (nicheId: string) => void;
}

export const NicheSelector = ({ onSelect }: NicheSelectorProps) => {
    const nicheList = Object.values(niches);

    const colorMap: Record<string, string> = {
        purple: 'from-purple-500/20 to-purple-900/10 border-purple-500/30 hover:border-purple-500/60',
        cyan: 'from-cyan-500/20 to-cyan-900/10 border-cyan-500/30 hover:border-cyan-500/60',
        emerald: 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/30 hover:border-emerald-500/60',
        orange: 'from-orange-500/20 to-orange-900/10 border-orange-500/30 hover:border-orange-500/60',
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Escolha um Nicho
                </h2>
                <p className="text-gray-400">
                    Veja como o sistema funciona em diferentes segmentos
                </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nicheList.map((niche, idx) => (
                    <motion.button
                        key={niche.id}
                        onClick={() => onSelect(niche.id)}
                        className={`group relative p-6 rounded-2xl bg-gradient-to-br ${colorMap[niche.color]} border backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Icon */}
                        <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform">
                            {niche.icon}
                        </div>

                        {/* Name */}
                        <h3 className="text-white font-semibold text-sm md:text-base">
                            {niche.name}
                        </h3>

                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
