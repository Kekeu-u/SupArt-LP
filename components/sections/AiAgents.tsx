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

// ... (imports remain)

export const AiAgents = () => {
    const { t } = useI18n();

    const features = [
        { icon: FaClock, label: t('24h Auto-Response', 'Auto-Resposta 24h') },
        { icon: FaCalendarAlt, label: t('Multi-Calendar', 'Multi-Calendário') },
        { icon: FaDatabase, label: t('Smart CRM', 'CRM Inteligente') },
        { icon: FaBrain, label: t('Context Memory', 'Memória de Contexto') },
        { icon: FaClock, label: t('<3s response time', '<3s tempo de resposta') },
    ];

    const pipelineSteps = [
        t('Lead Capture', 'Captura Lead'),
        t('AI Analysis', 'Análise IA'),
        t('Routing', 'Roteamento'),
        t('Conversion', 'Conversão')
    ];

    return (
        <section id="ai-agents" className="py-12 lg:py-24 px-4 md:px-8 lg:px-12 bg-black relative overflow-hidden">
            {/* ... (background effects remain) */}

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

                {/* ... (middle content remains) */}

                {/* Pipeline Legend - Single straight line on mobile */}
                <motion.div
                    className="mt-8 lg:mt-16 flex items-center justify-center gap-1.5 lg:gap-3 opacity-70 w-full overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.7, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                >
                    {pipelineSteps.map((step, idx) => (
                        <div key={step} className="flex items-center gap-1.5 lg:gap-3 shrink-0">
                            <div className="text-[8px] lg:text-[10px] text-gray-400 tracking-wider uppercase font-medium whitespace-nowrap">{step}</div>
                            {idx < 3 && <div className="h-[1px] w-2 lg:w-4 bg-gray-700" />}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section >
    );
};
