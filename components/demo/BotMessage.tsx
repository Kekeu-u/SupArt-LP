'use client';

import { motion } from 'framer-motion';

interface BotMessageProps {
    text: string;
    isVisible: boolean;
    delay?: number;
}

export const BotMessage = ({ text, isVisible, delay = 0 }: BotMessageProps) => {
    return (
        <motion.div
            className="bot-message flex items-start gap-3 max-w-md ml-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay }}
        >
            {/* Message Bubble */}
            <div className="flex flex-col gap-1 items-end">
                <div className="bg-gradient-to-br from-purple-600/90 to-indigo-600/90 border border-purple-400/20 rounded-2xl rounded-tr-none p-4 backdrop-blur-xl shadow-xl shadow-purple-500/20">
                    {/* Bot indicator */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-300 text-[10px] font-medium uppercase tracking-wider">Assistente IA</span>
                    </div>

                    {/* Message text */}
                    <p className="text-white text-sm leading-relaxed">{text}</p>
                </div>
            </div>

            {/* Bot Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/30">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
            </div>
        </motion.div>
    );
};
