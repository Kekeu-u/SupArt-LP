'use client';

import { motion } from 'framer-motion';
import { FaArrowRight, FaDatabase, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

interface AIFlowDiagramProps {
    className?: string;
}

export const AIFlowDiagram = ({ className = '' }: AIFlowDiagramProps) => {
    return (
        <div className={`flex flex-row items-center gap-3 lg:gap-8 ${className}`}>
            {/* Flow items container - aligned to center */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-10">
                {/* Specialists Column */}
                <div className="flex flex-col gap-1.5 lg:gap-6 flex-shrink-0">
                    {/* Specialist 1 - Dr. Francisco */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg lg:rounded-2xl p-1.5 lg:p-5 w-[90px] lg:w-52 shadow-lg shadow-purple-500/20 border border-white/10"
                    >
                        <div className="flex items-center gap-1 lg:gap-3 mb-1 lg:mb-3">
                            <div className="w-4 h-4 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center text-[8px] lg:text-lg shadow-inner shrink-0 leading-none">👨‍⚕️</div>
                            <div className="min-w-0">
                                <p className="text-white text-[8px] lg:text-base font-bold truncate">Dr. Francisco</p>
                                <p className="text-pink-100 text-[6px] lg:text-xs font-light truncate">Cirurgia Plástica</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-0.5 lg:gap-2">
                            {['Lipo HD', 'Silicone'].map(t => (
                                <span key={t} className="text-[5px] lg:text-xs bg-black/20 text-white px-1 lg:px-3 py-0.5 lg:py-1 rounded-full backdrop-blur-sm whitespace-nowrap">{t}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Specialist 2 - Dr. Roberto */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg lg:rounded-2xl p-1.5 lg:p-5 w-[90px] lg:w-52 shadow-lg shadow-emerald-500/20 border border-white/10"
                    >
                        <div className="flex items-center gap-1 lg:gap-3 mb-1 lg:mb-3">
                            <div className="w-4 h-4 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center text-[8px] lg:text-lg shadow-inner shrink-0 leading-none">👨‍⚕️</div>
                            <div className="min-w-0">
                                <p className="text-white text-[8px] lg:text-base font-bold truncate">Dr. Roberto</p>
                                <p className="text-emerald-100 text-[6px] lg:text-xs font-light truncate">Bariátrica</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-0.5 lg:gap-2">
                            {['Bypass', 'Consulta'].map(t => (
                                <span key={t} className="text-[5px] lg:text-xs bg-black/20 text-white px-1 lg:px-3 py-0.5 lg:py-1 rounded-full backdrop-blur-sm whitespace-nowrap">{t}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Specialist 3 - Dra. Janaína */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg lg:rounded-2xl p-1.5 lg:p-5 w-[90px] lg:w-52 shadow-lg shadow-blue-500/20 border border-white/10"
                    >
                        <div className="flex items-center gap-1 lg:gap-3 mb-1 lg:mb-3">
                            <div className="w-4 h-4 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center text-[8px] lg:text-lg shadow-inner shrink-0 leading-none">👩‍⚕️</div>
                            <div className="min-w-0">
                                <p className="text-white text-[8px] lg:text-base font-bold truncate">Dra. Janaína</p>
                                <p className="text-blue-100 text-[6px] lg:text-xs font-light truncate">Ginecologia</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-0.5 lg:gap-2">
                            {['Preventivo', 'Exame'].map(t => (
                                <span key={t} className="text-[5px] lg:text-xs bg-black/20 text-white px-1 lg:px-3 py-0.5 lg:py-1 rounded-full backdrop-blur-sm whitespace-nowrap">{t}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Connecting arrow */}
                <div className="flex-shrink-0 text-emerald-400 animate-pulse px-0.5">
                    <FaArrowRight className="w-2.5 h-2.5 lg:w-6 lg:h-6" />
                </div>

                {/* CRM Cards Column - Shrunken 15% (w-[70px]) */}
                <div className="flex flex-col gap-2 lg:gap-8 flex-shrink-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#111111]/80 backdrop-blur-xl rounded-lg lg:rounded-2xl p-1.5 lg:p-4 border border-white/10 w-[70px] lg:w-48 shadow-xl relative group hover:border-emerald-500/50 transition-colors">
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 lg:w-1.5 h-5 lg:h-10 bg-emerald-500 rounded-r-full" />
                            <div className="flex items-center gap-1 lg:gap-3 mb-1 lg:mb-3">
                                <div className="w-3 h-3 lg:w-6 lg:h-6 rounded bg-orange-500/20 flex items-center justify-center shrink-0">
                                    <FaDatabase className="w-1.5 h-1.5 lg:w-3 lg:h-3 text-orange-400" />
                                </div>
                                <span className="text-gray-300 text-[6px] lg:text-xs font-semibold tracking-wide whitespace-nowrap">CRM SYNC</span>
                            </div>
                            <div className="space-y-0.5 lg:space-y-1.5 text-[5px] lg:text-[10px] text-gray-500 font-mono bg-black/30 p-1 lg:p-2.5 rounded">
                                <div className="flex justify-between"><span>Nome</span> <span className="text-gray-700">***</span></div>
                                <div className="flex justify-between"><span>Tel</span> <span className="text-gray-700">***</span></div>
                            </div>
                            <p className="text-emerald-400 text-[5px] lg:text-[10px] mt-1 lg:mt-3 flex items-center justify-end gap-0.5 lg:gap-1.5">
                                <span className="w-1 h-1 lg:w-2 lg:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                                Ativo
                            </p>
                        </div>
                    ))}
                </div>

                {/* Connecting arrow - NEW */}
                <div className="flex-shrink-0 text-emerald-400 animate-pulse px-0.5">
                    <FaArrowRight className="w-2.5 h-2.5 lg:w-6 lg:h-6" />
                </div>

                {/* Final flow: Calendar + Success - Balanced with Specialists (w-[90px]) */}
                <div className="flex flex-shrink-0 flex-col gap-2 lg:gap-6">
                    {/* Google Calendar */}
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="bg-blue-600/10 backdrop-blur-xl rounded-lg lg:rounded-2xl p-1.5 lg:p-4 border border-blue-400/20 w-[90px] lg:w-48 shadow-lg shadow-blue-900/20"
                    >
                        <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-3">
                            <FaCalendarAlt className="w-2.5 h-2.5 lg:w-4 lg:h-4 text-blue-400" />
                            <span className="text-blue-300 text-[7px] lg:text-xs font-semibold whitespace-nowrap">Calendar</span>
                        </div>
                        <div className="space-y-1 lg:space-y-2">
                            <div className="bg-blue-500 rounded-sm lg:rounded-md px-1.5 lg:px-3 py-0.5 lg:py-1.5 text-[6px] lg:text-[10px] text-white font-medium flex justify-between shadow-sm">
                                <span>Hoje</span>
                                <span className="opacity-80">14h</span>
                            </div>
                            <div className="bg-white/5 rounded-sm lg:rounded-md px-1.5 lg:px-3 py-0.5 lg:py-1.5 text-[6px] lg:text-[10px] text-gray-400 flex justify-between">
                                <span>Amanhã</span>
                                <span>09h</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Success */}
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="bg-emerald-600/10 backdrop-blur-xl rounded-lg lg:rounded-2xl p-1.5 lg:p-4 border border-emerald-400/20 w-[90px] lg:w-48 shadow-lg shadow-emerald-900/20 group"
                    >
                        <div className="w-5 h-5 lg:w-10 lg:h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-1 lg:mb-3 group-hover:scale-110 transition-transform">
                            <FaCheckCircle className="w-2.5 h-2.5 lg:w-5 lg:h-5 text-emerald-400" />
                        </div>
                        <p className="text-emerald-300 text-[8px] lg:text-sm font-bold text-center">Agendado!</p>
                        <p className="text-emerald-400/60 text-[6px] lg:text-[10px] text-center mt-0.5 whitespace-nowrap">Enviado</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
