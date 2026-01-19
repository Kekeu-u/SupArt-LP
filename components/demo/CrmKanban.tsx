'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CrmKanbanProps {
    isVisible: boolean;
    onComplete: () => void;
    leadData: {
        name: string;
        phone?: string;
        professional: string;
        time: string;
        procedure: string;
    };
    nicheType?: 'clinic' | 'automotive' | 'dental' | 'realestate';
}

export const CrmKanban = ({ isVisible, onComplete, leadData, nicheType = 'clinic' }: CrmKanbanProps) => {
    const [cardLanded, setCardLanded] = useState(false);

    const columns = [
        { id: 'novo', label: 'Novo Lead', color: 'from-blue-500/20 to-blue-600/20', borderColor: 'border-blue-500/30' },
        { id: 'agendado', label: 'Agendado', color: 'from-emerald-500/20 to-emerald-600/20', borderColor: 'border-emerald-500/30' },
        { id: 'confirmado', label: 'Confirmado', color: 'from-purple-500/20 to-purple-600/20', borderColor: 'border-purple-500/30' },
    ];

    useEffect(() => {
        if (isVisible) {
            // Card lands after animation
            const landTimer = setTimeout(() => setCardLanded(true), 1200);
            // Complete after user sees result
            const completeTimer = setTimeout(() => onComplete(), 2500);
            return () => {
                clearTimeout(landTimer);
                clearTimeout(completeTimer);
            };
        }
    }, [isVisible, onComplete]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Bot message introducing CRM */}
            <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-purple-400/30">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                </div>
                <div className="bg-gradient-to-br from-purple-600/90 to-indigo-600/90 border border-purple-400/20 rounded-2xl rounded-tl-none px-4 py-3 backdrop-blur-xl">
                    <p className="text-white text-sm">
                        Perfeito! Registrando no seu CRM...
                    </p>
                </div>
            </div>

            {/* Kanban Board */}
            <motion.div
                className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h4v4H7V7zm6 0h4v2h-4V7zm0 4h4v2h-4v-2zm-6 4h10v2H7v-2z" />
                        </svg>
                    </div>
                    <span className="text-white font-medium text-sm">CRM Dashboard</span>
                    <span className="ml-auto text-emerald-400 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Ao vivo
                    </span>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-3 gap-3">
                    {columns.map((col, idx) => (
                        <div
                            key={col.id}
                            className={`bg-gradient-to-b ${col.color} rounded-xl border ${col.borderColor} p-2 min-h-[120px]`}
                        >
                            <p className="text-[10px] md:text-xs font-medium text-gray-300 mb-2 text-center">{col.label}</p>

                            {/* Lead card lands in "Agendado" column */}
                            {col.id === 'agendado' && (
                                <motion.div
                                    className="relative bg-black/60 rounded-lg p-2 md:p-3 border border-white/10 shadow-lg"
                                    initial={{ x: -300, y: -50, rotate: -5, opacity: 0 }}
                                    animate={cardLanded
                                        ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                                        : { x: -300, y: -50, rotate: -5, opacity: 0 }
                                    }
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                        delay: 0.8
                                    }}
                                >
                                    {/* Lead content */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                                            {leadData.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-[10px] md:text-xs font-medium truncate">{leadData.name}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-[8px] md:text-[10px]">
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <span>📅</span>
                                            <span className="truncate">Hoje, {leadData.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <span>👤</span>
                                            <span className="truncate">{leadData.professional}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-purple-400">
                                            <span>💼</span>
                                            <span className="truncate">{leadData.procedure}</span>
                                        </div>
                                    </div>

                                    {/* Landed checkmark */}
                                    {cardLanded && (
                                        <motion.div
                                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3, type: "spring" }}
                                        >
                                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {/* Placeholder cards in other columns */}
                            {col.id === 'novo' && (
                                <div className="space-y-2">
                                    <div className="h-8 rounded-lg bg-white/5 border border-white/5" />
                                    <div className="h-8 rounded-lg bg-white/5 border border-white/5" />
                                </div>
                            )}
                            {col.id === 'confirmado' && (
                                <div className="h-8 rounded-lg bg-white/5 border border-white/5" />
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};
