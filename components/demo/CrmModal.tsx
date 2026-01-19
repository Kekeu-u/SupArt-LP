'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CrmField {
    label: string;
    value: string;
}

interface CrmModalProps {
    isOpen: boolean;
    onComplete: () => void;
    fields: CrmField[];
    professionalName: string;
}

export const CrmModal = ({ isOpen, onComplete, fields, professionalName }: CrmModalProps) => {
    const [visibleFields, setVisibleFields] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisibleFields(0);
            setIsComplete(false);

            // Animate fields appearing one by one
            const interval = setInterval(() => {
                setVisibleFields(prev => {
                    if (prev >= fields.length) {
                        clearInterval(interval);
                        setTimeout(() => setIsComplete(true), 500);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 400);

            return () => clearInterval(interval);
        }
    }, [isOpen, fields.length]);

    if (!isOpen) return null;

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
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm0 6h10v4H7v-4zm6-6h4v4h-4V7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">CRM_{professionalName.replace(/\s+/g, '')}</h3>
                        <p className="text-gray-500 text-xs">Airtable Integration</p>
                    </div>
                </div>

                {/* Fields */}
                <div className="p-6 space-y-4">
                    {fields.map((field, idx) => (
                        <motion.div
                            key={field.label}
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={idx < visibleFields ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-gray-500 text-sm w-28 flex-shrink-0">{field.label}:</span>
                            <div className="flex-1 relative">
                                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm">
                                    {idx < visibleFields && (
                                        <TypewriterText text={field.value} />
                                    )}
                                </div>
                                {idx === visibleFields - 1 && !isComplete && (
                                    <motion.div
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-purple-400"
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    className="p-6 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-400 text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Registro salvo com sucesso
                        </div>
                        <button
                            onClick={onComplete}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Continuar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// Helper component for typewriter effect
const TypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let idx = 0;
        const interval = setInterval(() => {
            if (idx <= text.length) {
                setDisplayText(text.slice(0, idx));
                idx++;
            } else {
                clearInterval(interval);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayText}</span>;
};
