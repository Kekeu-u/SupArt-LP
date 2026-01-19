'use client';

import { motion } from 'framer-motion';

interface TimeSlot {
    time: string;
    available: boolean;
}

interface CalendarModalProps {
    isOpen: boolean;
    onSelect: (time: string) => void;
    timeSlots: TimeSlot[];
    professionalName: string;
}

export const CalendarModal = ({ isOpen, onSelect, timeSlots, professionalName }: CalendarModalProps) => {
    if (!isOpen) return null;

    const today = new Date();
    const dateStr = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
    });

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
                className="relative w-full max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Agenda_{professionalName.replace(/\s+/g, '')}</h3>
                        <p className="text-gray-500 text-xs">Google Calendar Integration</p>
                    </div>
                </div>

                {/* Date */}
                <div className="px-6 pt-4">
                    <p className="text-gray-400 text-sm capitalize">{dateStr}</p>
                </div>

                {/* Time Slots Grid */}
                <div className="p-6">
                    <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">Horários Disponíveis</p>
                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((slot, idx) => (
                            <motion.button
                                key={slot.time}
                                onClick={() => slot.available && onSelect(slot.time)}
                                disabled={!slot.available}
                                className={`
                  relative p-3 rounded-xl text-center font-medium text-sm transition-all duration-200
                  ${slot.available
                                        ? 'bg-white/5 border border-white/10 text-white hover:bg-purple-500/20 hover:border-purple-500/40 hover:scale-105 cursor-pointer'
                                        : 'bg-red-500/10 border border-red-500/20 text-red-400/60 cursor-not-allowed line-through'
                                    }
                `}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={slot.available ? { y: -2 } : {}}
                                whileTap={slot.available ? { scale: 0.95 } : {}}
                            >
                                {slot.time}
                                {!slot.available && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500/80 rounded-full flex items-center justify-center">
                                        <span className="text-[10px] text-white">✕</span>
                                    </span>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Footer hint */}
                <div className="px-6 pb-6">
                    <p className="text-gray-500 text-xs text-center">
                        Clique em um horário para agendar
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};
