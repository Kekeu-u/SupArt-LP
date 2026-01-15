'use client';

import { useState } from 'react';
import { step3Schema, GOAL_OPTIONS, PAIN_POINTS_OPTIONS } from '@/lib/types/diagnostic';
import type { DiagnosticFormData } from '@/lib/types/diagnostic';

interface StepProps {
    data: Partial<DiagnosticFormData>;
    onNext: (data: Partial<DiagnosticFormData>) => void;
    onBack: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting: boolean;
}

export function StepObjectives({ data, onNext, onBack }: StepProps) {
    const [formState, setFormState] = useState({
        main_goal: data.main_goal || '',
        pain_points: data.pain_points || [],
        challenge_description: data.challenge_description || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleGoalSelect = (value: string) => {
        setFormState(prev => ({ ...prev, main_goal: value }));
        if (errors.main_goal) {
            setErrors(prev => ({ ...prev, main_goal: '' }));
        }
    };

    const handlePainPointToggle = (value: string) => {
        setFormState(prev => {
            const current = prev.pain_points;
            if (current.includes(value)) {
                return { ...prev, pain_points: current.filter(v => v !== value) };
            } else {
                return { ...prev, pain_points: [...current, value] };
            }
        });
        if (errors.pain_points) {
            setErrors(prev => ({ ...prev, pain_points: '' }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = step3Schema.safeParse(formState);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0] as string;
                fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        onNext(formState);
    };

    const labelClasses = 'block text-sm font-medium text-gray-300 mb-3';
    const errorClasses = 'text-red-400 text-xs mt-2';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Objetivo Principal */}
            <div>
                <label className={labelClasses}>
                    Principal objetivo <span className="text-pink-500">*</span>
                </label>
                <div className="space-y-2">
                    {GOAL_OPTIONS.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleGoalSelect(option.value)}
                            className={`
                w-full text-left px-4 py-3 rounded-xl
                transition-all duration-200
                ${formState.main_goal === option.value
                                    ? 'bg-gradient-to-r from-gray-600/30 to-pink-600/30 border border-gray-500 text-white'
                                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                                }
              `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                {errors.main_goal && <p className={errorClasses}>{errors.main_goal}</p>}
            </div>

            {/* Dores */}
            <div>
                <label className={labelClasses}>
                    Maiores dores atuais <span className="text-pink-500">*</span>
                    <span className="text-gray-500 text-xs ml-2">(selecione todas que se aplicam)</span>
                </label>
                <div className="space-y-2">
                    {PAIN_POINTS_OPTIONS.map(option => (
                        <label
                            key={option.value}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                transition-all duration-200
                ${formState.pain_points.includes(option.value)
                                    ? 'bg-gray-500/20 border border-gray-500'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                }
              `}
                        >
                            <div className={`
                w-5 h-5 rounded flex items-center justify-center
                ${formState.pain_points.includes(option.value)
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-white/10'
                                }
              `}>
                                {formState.pain_points.includes(option.value) && (
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <input
                                type="checkbox"
                                checked={formState.pain_points.includes(option.value)}
                                onChange={() => handlePainPointToggle(option.value)}
                                className="sr-only"
                            />
                            <span className="text-sm text-white">{option.label}</span>
                        </label>
                    ))}
                </div>
                {errors.pain_points && <p className={errorClasses}>{errors.pain_points}</p>}
            </div>

            {/* Descrição do desafio */}
            <div>
                <label htmlFor="challenge_description" className={labelClasses}>
                    Descreva seu desafio em 1 frase
                    <span className="text-gray-500 text-xs ml-2">(opcional)</span>
                </label>
                <textarea
                    id="challenge_description"
                    name="challenge_description"
                    value={formState.challenge_description}
                    onChange={handleChange}
                    placeholder="Ex: Preciso de um site que transmita a qualidade dos meus serviços e gere leads qualificados..."
                    rows={3}
                    className="
            w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
            text-white placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500
            transition-all duration-200 resize-none
          "
                />
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                >
                    ← Voltar
                </button>
                <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-gray-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                    Próximo →
                </button>
            </div>
        </form>
    );
}
