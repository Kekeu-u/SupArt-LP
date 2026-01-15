'use client';

import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { step5Schema, PRIORITY_OPTIONS } from '@/lib/types/diagnostic';
import type { DiagnosticFormData } from '@/lib/types/diagnostic';

interface StepProps {
    data: Partial<DiagnosticFormData>;
    onNext: (data: Partial<DiagnosticFormData>) => void;
    onBack: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting: boolean;
}

export function StepPriorities({ data, onNext, onBack, isSubmitting }: StepProps) {
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>(
        data.priorities || []
    );
    const [errors, setErrors] = useState<string>('');

    const handleToggle = (value: string) => {
        setSelectedPriorities(prev => {
            if (prev.includes(value)) {
                return prev.filter(v => v !== value);
            } else if (prev.length < 3) {
                return [...prev, value];
            }
            return prev;
        });
        setErrors('');
    };

    const handleReorder = (newOrder: string[]) => {
        setSelectedPriorities(newOrder);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = step5Schema.safeParse({ priorities: selectedPriorities });
        if (!result.success) {
            setErrors(result.error.issues[0]?.message || 'Selecione pelo menos 1 prioridade');
            return;
        }

        onNext({ priorities: selectedPriorities });
    };

    const getPriorityLabel = (value: string) => {
        return PRIORITY_OPTIONS.find(opt => opt.value === value)?.label || value;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Instructions */}
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-300">
                    Selecione até <span className="text-gray-400 font-semibold">3 prioridades</span> e arraste para ordenar
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Selecionadas: {selectedPriorities.length}/3
                </p>
            </div>

            {/* Priority Options */}
            <div className="space-y-2">
                {PRIORITY_OPTIONS.map(option => {
                    const isSelected = selectedPriorities.includes(option.value);
                    const isDisabled = !isSelected && selectedPriorities.length >= 3;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => !isDisabled && handleToggle(option.value)}
                            disabled={isDisabled}
                            className={`
                w-full text-left px-4 py-3 rounded-xl
                transition-all duration-200
                ${isSelected
                                    ? 'bg-gradient-to-r from-gray-600/30 to-pink-600/30 border border-gray-500 text-white'
                                    : isDisabled
                                        ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                                }
              `}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`
                  w-5 h-5 rounded flex items-center justify-center shrink-0
                  ${isSelected ? 'bg-gray-500 text-white' : 'bg-white/10'}
                `}>
                                    {isSelected && (
                                        <span className="text-xs font-bold">
                                            {selectedPriorities.indexOf(option.value) + 1}
                                        </span>
                                    )}
                                </div>
                                <span>{option.label}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected Priorities (Reorderable) */}
            {selectedPriorities.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm text-gray-400">🔄 Arraste para reordenar:</p>
                    <Reorder.Group
                        axis="y"
                        values={selectedPriorities}
                        onReorder={handleReorder}
                        className="space-y-2"
                    >
                        {selectedPriorities.map((value, index) => (
                            <Reorder.Item
                                key={value}
                                value={value}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <motion.div
                                    layout
                                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-600/20 to-pink-600/20 border border-gray-500/50 rounded-xl"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                        {index + 1}
                                    </div>
                                    <span className="text-white">{getPriorityLabel(value)}</span>
                                    <span className="ml-auto text-gray-500">⋮⋮</span>
                                </motion.div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>
            )}

            {errors && (
                <p className="text-red-400 text-sm text-center">{errors}</p>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                    ← Voltar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting || selectedPriorities.length === 0}
                    className="px-8 py-3 bg-gradient-to-r from-gray-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Analisando...
                        </>
                    ) : (
                        'Enviar Diagnóstico 🚀'
                    )}
                </button>
            </div>
        </form>
    );
}
