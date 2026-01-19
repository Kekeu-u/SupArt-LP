'use client';

import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import { SiOpenai, SiGooglecalendar, SiWhatsapp, SiAnthropic, SiGooglegemini, SiN8N, SiNextdotjs } from 'react-icons/si';

interface AIOrchestratorProps {
    className?: string;
}

export const AIOrchestrator = ({ className = '' }: AIOrchestratorProps) => {
    return (
        <div className={`relative w-[260px] h-[260px] flex items-center justify-center ${className}`}>
            {/* Orbit 1: LLMs (OpenAI, Gemini, Anthropic) */}
            <div className="absolute inset-[15%] border border-purple-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-[15%] animate-[spin_30s_linear_infinite]">
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-[#111] rounded-full border border-white/10 flex items-center justify-center border-purple-500/30 shadow-lg shadow-purple-500/20">
                    <SiGooglegemini className="w-4 h-4 text-blue-400" />
                </div>
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-[#111] rounded-full border border-white/10 flex items-center justify-center border-purple-500/30 shadow-lg shadow-purple-500/20">
                    <SiAnthropic className="w-4 h-4 text-orange-200" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#111] rounded-full border border-white/10 flex items-center justify-center border-purple-500/30 shadow-lg shadow-purple-500/20">
                    <SiOpenai className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Orbit 2: Tools (Calendar, WhatsApp, N8N, Next.js) */}
            <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-0 animate-[spin_40s_linear_infinite_reverse]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-9 h-9 bg-[#111] rounded-full border border-white/10 flex items-center justify-center border-cyan-500/30 shadow-lg shadow-cyan-500/20 text-green-400">
                    <SiWhatsapp className="w-5 h-5" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-4 w-9 h-9 bg-[#111] rounded-full border border-white/10 flex items-center justify-center border-cyan-500/30 shadow-lg shadow-cyan-500/20 text-blue-500">
                    <SiGooglecalendar className="w-5 h-5" />
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-9 h-9 bg-[#111] rounded-full border border-white/10 flex items-center justify-center border-cyan-500/30 shadow-lg shadow-cyan-500/20 text-pink-500">
                    <SiN8N className="w-8 h-4" />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-9 h-9 bg-[#111] rounded-full border border-white/10 flex items-center justify-center border-cyan-500/30 shadow-lg shadow-cyan-500/20 text-white">
                    <SiNextdotjs className="w-5 h-5" />
                </div>
            </div>

            {/* Central Brain */}
            <motion.div
                className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 border-2 border-purple-400/50 flex flex-col items-center justify-center shadow-lg shadow-purple-500/30 z-10 relative"
                animate={{
                    boxShadow: ['0 0 30px rgba(139, 92, 246, 0.3)', '0 0 60px rgba(139, 92, 246, 0.5)', '0 0 30px rgba(139, 92, 246, 0.3)'],
                    scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <FaBrain className="w-10 h-10 text-white mb-1.5" />
                <span className="text-white text-[10px] font-medium text-center px-2">Orquestrador IA</span>
            </motion.div>
        </div>
    );
};
