'use client';

import { useState, useEffect } from 'react';
import {
    step4Schema,
    BUDGET_OPTIONS,
    TIMELINE_OPTIONS
} from '@/lib/types/diagnostic';
import type { DiagnosticFormData } from '@/lib/types/diagnostic';
import { SelectionCards } from '../SelectionCards';

interface StepProps {
    data: Partial<DiagnosticFormData>;
    onNext: (data: Partial<DiagnosticFormData>) => void;
    onBack: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting: boolean;
}

export function StepBudget({ data, onNext, onBack }: StepProps) {
    const [formState, setFormState] = useState({
        budget_range: data.budget_range || '',
        timeline: data.timeline || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 🐛 FIX: Sincronizar estado local com prop data quando ela mudar
    useEffect(() => {
        setFormState({
            budget_range: data.budget_range || '',
            timeline: data.timeline || '',
        });
    }, [data]);

    const handleSelect = (field: string, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = step4Schema.safeParse(formState);
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
            {/* Orçamento - Using SelectionCards */}
            <div>
                <label className={labelClasses}>
                    Faixa de investimento mensal disponível <span className="text-pink-500">*</span>
                </label>
                <SelectionCards
                    options={BUDGET_OPTIONS.map(o => ({ ...o }))}
                    value={formState.budget_range}
                    onChange={(value) => handleSelect('budget_range', value)}
                    columns={2}
                />
                {errors.budget_range && <p className={errorClasses}>{errors.budget_range}</p>}
            </div>

            {/* Timeline - Using SelectionCards */}
            <div>
                <label className={labelClasses}>
                    Quando pretende começar? <span className="text-pink-500">*</span>
                </label>
                <SelectionCards
                    options={TIMELINE_OPTIONS.map(o => ({ ...o }))}
                    value={formState.timeline}
                    onChange={(value) => handleSelect('timeline', value)}
                    columns={2}
                />
                {errors.timeline && <p className={errorClasses}>{errors.timeline}</p>}
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
