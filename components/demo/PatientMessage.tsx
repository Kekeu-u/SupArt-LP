'use client';

import { motion } from 'framer-motion';

interface PatientMessageProps {
    text: string;
    sender: string;
    time: string;
    isVisible: boolean;
}

export const PatientMessage = ({ text, sender, time, isVisible }: PatientMessageProps) => {
    return (
        <motion.div
            className="patient-message flex items-start gap-3 max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-lg">{sender.charAt(0)}</span>
            </div>

            {/* Message Bubble */}
            <div className="flex flex-col gap-1">
                <div className="bg-[#1f1f1f] border border-white/10 rounded-2xl rounded-tl-none p-4 backdrop-blur-xl shadow-xl">
                    {/* Sender name */}
                    <span className="text-purple-400 text-xs font-medium block mb-1">{sender}</span>

                    {/* Message text */}
                    <p className="text-gray-200 text-sm leading-relaxed">{text}</p>

                    {/* Time */}
                    <span className="text-gray-500 text-[10px] block mt-2 text-right">{time}</span>
                </div>

                {/* Typing indicator */}
                <motion.div
                    className="typing-indicator flex items-center gap-1 px-4 py-2 bg-[#1a1a1a] rounded-full w-fit border border-white/5"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.span
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                    <span className="text-gray-500 text-xs ml-2">Processando...</span>
                </motion.div>
            </div>
        </motion.div>
    );
};
