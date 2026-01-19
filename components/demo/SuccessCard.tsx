'use client';

import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface SuccessCardProps {
    isVisible: boolean;
    nicheType?: 'clinic' | 'automotive' | 'dental' | 'realestate';
    data: {
        procedure: string;
        doctor: string;
        date: string;
        time: string;
        patientName: string;
    };
}

export const SuccessCard = ({ isVisible, data, nicheType = 'clinic' }: SuccessCardProps) => {
    // Dynamic labels based on niche
    const labels = {
        clinic: { title: 'Consulta Agendada!', person: 'Paciente', professional: 'Médico', recipient: 'paciente' },
        automotive: { title: 'Serviço Agendado!', person: 'Cliente', professional: 'Técnico', recipient: 'cliente' },
        dental: { title: 'Consulta Agendada!', person: 'Paciente', professional: 'Dentista', recipient: 'paciente' },
        realestate: { title: 'Visita Agendada!', person: 'Cliente', professional: 'Corretor', recipient: 'cliente' },
    };
    const l = labels[nicheType];

    useEffect(() => {
        if (isVisible) {
            // Trigger confetti
            const duration = 2000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors: ['#6B46C1', '#00d9ff', '#00ff88', '#ff6b9d']
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors: ['#6B46C1', '#00d9ff', '#00ff88', '#ff6b9d']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [isVisible]);

    return (
        <motion.div
            className="success-card w-full max-w-sm mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-[#0d0d0d] border border-emerald-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,136,0.2)] overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />

                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                    <motion.div
                        className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    >
                        <motion.svg
                            className="w-8 h-8 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            initial={{ pathLength: 0 }}
                            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </motion.svg>
                    </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-center text-xl font-bold text-white mb-1">
                    {l.title}
                </h3>
                <p className="text-center text-gray-400 text-sm mb-6">
                    Confirmação enviada por WhatsApp
                </p>

                {/* Details */}
                <div className="space-y-3 bg-black/30 rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">{l.person}</span>
                        <span className="text-white text-sm font-medium">{data.patientName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Procedimento</span>
                        <span className="text-purple-400 text-sm font-medium">{data.procedure}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">{l.professional}</span>
                        <span className="text-white text-sm font-medium">{data.doctor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Data</span>
                        <span className="text-emerald-400 text-sm font-medium">{data.date}, {data.time}</span>
                    </div>
                </div>

                {/* Calendar Integration */}
                <motion.div
                    className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-blue-400 text-xs font-medium">📅 Google Calendar</p>
                        <p className="text-gray-500 text-[10px]">Evento criado e sincronizado</p>
                    </div>
                    <span className="text-emerald-400 text-[10px]">✓</span>
                </motion.div>

                {/* CRM Dashboard Integration */}
                <motion.div
                    className="mt-2 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm0 6h10v4H7v-4zm6-6h4v4h-4V7z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-orange-400 text-xs font-medium">📊 CRM Dashboard</p>
                        <p className="text-gray-500 text-[10px]">Lead criado no seu painel</p>
                    </div>
                    <span className="text-emerald-400 text-[10px]">✓</span>
                </motion.div>

                {/* Email Notification */}
                <motion.div
                    className="mt-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-purple-400 text-xs font-medium">📧 Email de Confirmação</p>
                        <p className="text-gray-500 text-[10px]">Enviado para empresa e {l.recipient}</p>
                    </div>
                    <span className="text-emerald-400 text-[10px]">✓</span>
                </motion.div>
            </div>
        </motion.div>
    );
};
