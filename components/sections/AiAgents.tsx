'use client';

import { motion } from 'framer-motion';
import { FaClock, FaCalendarAlt, FaBrain, FaDatabase, FaArrowRight } from 'react-icons/fa';
import { useI18n } from '@/lib/i18n';

// Import standalone components
import { AIOrchestrator } from '../ui/AIOrchestrator';
import { PhoneMockup } from '../ui/PhoneMockup';
import { AIAgentsHeadline } from '../ui/AIAgentsHeadline';
import { AIFlowDiagram } from '../ui/AIFlowDiagram';
import { CircularPlayButton } from '../ui/CircularPlayButton';

const features = [
    { icon: FaClock, label: '24h Auto-Response' },
    { icon: FaCalendarAlt, label: 'Multi-Calendar' },
    { icon: FaDatabase, label: 'Smart CRM' },
    { icon: FaBrain, label: 'Context Memory' },
    { icon: FaClock, label: '<3s response time' },
];

export const AiAgents = () => {
    const { t } = useI18n();

    return (
        <section id="ai-agents" className="py-12 lg:py-24 px-4 md:px-8 lg:px-12 bg-black relative overflow-hidden">

            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-[1600px] mx-auto w-full">

                {/* Feature badges - Top */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-8 lg:mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {features.map((feat, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                        >
                            <feat.icon className="w-3 h-3 text-purple-400" />
                            <span className="text-xs text-gray-300">{feat.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* ===== ROW 1: TEXT (left) | SMARTPHONE (right) - ALWAYS SIDE BY SIDE ===== */}
                <div className="flex flex-row items-start justify-between gap-4 lg:gap-12 mb-8 lg:mb-16">

                    {/* Wrapper: Text Content - aligned left, z-10 to overlap phone */}
                    <motion.div
                        className="flex flex-col items-start justify-start flex-1 z-10"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <AIAgentsHeadline />
                    </motion.div>

                    {/* Wrapper: Smartphone with Play Button overlay */}
                    <motion.div
                        className="shrink-0 -ml-8 lg:ml-0 relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Mobile: sm, Desktop: lg */}
                        <div className="lg:hidden">
                            <PhoneMockup size="sm" className="rotate-[3deg] hover:rotate-0 transition-transform duration-700" />
                        </div>
                        <div className="hidden lg:block">
                            <PhoneMockup size="lg" className="rotate-[3deg] hover:rotate-0 transition-transform duration-700" />
                        </div>

                        {/* CircularPlayButton - positioned at bottom left corner, overlapping */}
                        <div className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 z-20">
                            <CircularPlayButton href="/demo" size={100} className="lg:hidden" />
                            <CircularPlayButton href="/demo" size={160} className="hidden lg:block" />
                        </div>
                    </motion.div>
                </div>

                {/* ===== ROW 2 & 3: ORCHESTRATOR + FLOW DIAGRAM ===== */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 mb-8 lg:mb-16">
                    {/* Orchestrator - Left on Desktop */}
                    <motion.div
                        className="flex justify-center shrink-0"
                        initial={{ opacity: 0, x: -30 }} // Fade in from left
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <AIOrchestrator />
                    </motion.div>

                    {/* Arrow between them on desktop (optional visual connection) */}
                    <div className="hidden lg:block text-purple-500/30 animate-pulse">
                        <FaArrowRight className="w-8 h-8" />
                    </div>

                    {/* Flow Diagram - Right on Desktop */}
                    <motion.div
                        className="flex justify-center shrink-0"
                        initial={{ opacity: 0, x: 30 }} // Fade in from right
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <AIFlowDiagram />
                    </motion.div>
                </div>

                {/* Pipeline Legend - Single straight line on mobile */}
                <motion.div
                    className="mt-8 lg:mt-16 flex items-center justify-center gap-1.5 lg:gap-3 opacity-70 w-full overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.7, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                >
                    {['Captura Lead', 'Análise IA', 'Roteamento', 'Conversão'].map((step, idx) => (
                        <div key={step} className="flex items-center gap-1.5 lg:gap-3 shrink-0">
                            <div className="text-[8px] lg:text-[10px] text-gray-400 tracking-wider uppercase font-medium whitespace-nowrap">{step}</div>
                            {idx < 3 && <div className="h-[1px] w-2 lg:w-4 bg-gray-700" />}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
