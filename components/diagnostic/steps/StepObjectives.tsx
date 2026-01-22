'use client';

import { useState, useEffect } from 'react';
import { step3Schema, GOAL_OPTIONS, PAIN_POINTS_OPTIONS, BOTTLENECK_OPTIONS } from '@/lib/types/diagnostic';
import type { DiagnosticFormData } from '@/lib/types/diagnostic';
import { ChipMultiSelect } from '../ChipMultiSelect';
import { useI18n } from '@/lib/i18n';

interface StepProps {
    data: Partial<DiagnosticFormData>;
    onNext: (data: Partial<DiagnosticFormData>) => void;
    onBack: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting: boolean;
}

export function StepObjectives({ data, onNext, onBack }: StepProps) {
    const { t, locale } = useI18n();

    const [formState, setFormState] = useState({
        main_goal: data.main_goal || '',
        pain_points: data.pain_points || [],
        biggest_bottleneck: data.biggest_bottleneck || '',
        challenge_description: data.challenge_description || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Sincronizar estado local com prop data quando ela mudar
    useEffect(() => {
        setFormState({
            main_goal: data.main_goal || '',
            pain_points: data.pain_points || [],
            biggest_bottleneck: data.biggest_bottleneck || '',
            challenge_description: data.challenge_description || '',
        });
    }, [data]);

    const handleGoalSelect = (selected: string[]) => {
        // Main goal é single select, pega o último selecionado
        const value = selected[selected.length - 1] || '';
        setFormState(prev => ({ ...prev, main_goal: value }));
        if (errors.main_goal) {
            setErrors(prev => ({ ...prev, main_goal: '' }));
        }
    };

    const handlePainPointsChange = (selected: string[]) => {
        setFormState(prev => ({ ...prev, pain_points: selected }));
        if (errors.pain_points) {
            setErrors(prev => ({ ...prev, pain_points: '' }));
        }
    };

    const handleBottleneckSelect = (selected: string[]) => {
        const value = selected[selected.length - 1] || '';
        setFormState(prev => ({ ...prev, biggest_bottleneck: value }));
        if (errors.biggest_bottleneck) {
            setErrors(prev => ({ ...prev, biggest_bottleneck: '' }));
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

    // Helper para obter label traduzido
    const getLabel = (label: { en: string; pt: string } | string): string => {
        if (typeof label === 'string') return label;
        return locale === 'en' ? label.en : label.pt;
    };

    const labelClasses = 'block text-sm font-medium text-gray-300 mb-3';
    const errorClasses = 'text-red-400 text-xs mt-2';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Objetivo Principal - Single Select via Chips */}
            <div>
                <label className={labelClasses}>
                    {t('Main Goal', 'Objetivo Principal')} <span className="text-pink-500">*</span>
                </label>
                <ChipMultiSelect
                    options={GOAL_OPTIONS}
                    selected={formState.main_goal ? [formState.main_goal] : []}
                    onChange={handleGoalSelect}
                    maxItems={1}
                    columns={1}
                />
                {errors.main_goal && <p className={errorClasses}>{errors.main_goal}</p>}
            </div>

            {/* Dores - Multi Select */}
            <div>
                <label className={labelClasses}>
                    {t('Current Pain Points', 'Dores Atuais')} <span className="text-pink-500">*</span>
                    <span className="text-gray-500 text-xs ml-2">
                        {t('(select all that apply)', '(selecione todas que se aplicam)')}
                    </span>
                </label>
                <ChipMultiSelect
                    options={PAIN_POINTS_OPTIONS}
                    selected={formState.pain_points}
                    onChange={handlePainPointsChange}
                    columns={2}
                />
                {errors.pain_points && <p className={errorClasses}>{errors.pain_points}</p>}
            </div>

            {/* Maior Gargalo - Single Select */}
            <div>
                <label className={labelClasses}>
                    {t("What's your biggest bottleneck?", 'Qual seu maior gargalo operacional?')} <span className="text-pink-500">*</span>
                </label>
                <ChipMultiSelect
                    options={BOTTLENECK_OPTIONS}
                    selected={formState.biggest_bottleneck ? [formState.biggest_bottleneck] : []}
                    onChange={handleBottleneckSelect}
                    maxItems={1}
                    columns={2}
                />
                {errors.biggest_bottleneck && <p className={errorClasses}>{errors.biggest_bottleneck}</p>}
            </div>

            {/* Descrição do desafio */}
            <div>
                <label htmlFor="challenge_description" className={labelClasses}>
                    {t('Describe your challenge in one sentence', 'Descreva seu desafio em 1 frase')}
                    <span className="text-gray-500 text-xs ml-2">
                        {t('(optional)', '(opcional)')}
                    </span>
                </label>
                <textarea
                    id="challenge_description"
                    name="challenge_description"
                    value={formState.challenge_description}
                    onChange={handleChange}
                    placeholder={t(
                        "E.g.: I need to automate my customer service so I don't lose leads while I sleep...",
                        "Ex: Preciso automatizar meu atendimento para não perder leads enquanto durmo..."
                    )}
                    rows={3}
                    className="
                        w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                        text-white placeholder:text-gray-500
                        focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
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
                    ← {t('Back', 'Voltar')}
                </button>
                <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                    {t('Next', 'Próximo')} →
                </button>
            </div>
        </form>
    );
}
