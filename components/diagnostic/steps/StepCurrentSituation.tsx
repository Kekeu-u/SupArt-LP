'use client';

import { useState } from 'react';
import {
    step2Schema,
    WEBSITE_STATUS_OPTIONS,
    SOCIAL_CHANNELS_OPTIONS,
    PAID_TRAFFIC_OPTIONS
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

export function StepCurrentSituation({ data, onNext, onBack }: StepProps) {
    const [formState, setFormState] = useState({
        has_website: data.has_website || '',
        website_url: data.website_url || '',
        social_channels: data.social_channels || [],
        uses_paid_traffic: data.uses_paid_traffic || '',
        instagram_handle: data.instagram_handle || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (value: string) => {
        setFormState(prev => {
            const current = prev.social_channels;
            if (current.includes(value)) {
                return { ...prev, social_channels: current.filter(v => v !== value) };
            } else {
                return { ...prev, social_channels: [...current, value] };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = step2Schema.safeParse(formState);
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

    const inputClasses = `
    w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
    text-white placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500
    transition-all duration-200
  `;

    const labelClasses = 'block text-sm font-medium text-gray-300 mb-3';
    const errorClasses = 'text-red-400 text-xs mt-1';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tem site? - Now using SelectionCards */}
            <div>
                <label className={labelClasses}>
                    Tem um site hoje? <span className="text-pink-500">*</span>
                </label>
                <SelectionCards
                    options={WEBSITE_STATUS_OPTIONS}
                    value={formState.has_website}
                    onChange={(value) => {
                        setFormState(prev => ({ ...prev, has_website: value }));
                        if (errors.has_website) {
                            setErrors(prev => ({ ...prev, has_website: '' }));
                        }
                    }}
                    columns={3}
                />
                {errors.has_website && <p className={errorClasses}>{errors.has_website}</p>}
            </div>

            {/* URL do site */}
            {formState.has_website && formState.has_website !== 'none' && (
                <div>
                    <label htmlFor="website_url" className={labelClasses}>
                        URL do site atual
                    </label>
                    <input
                        type="url"
                        id="website_url"
                        name="website_url"
                        value={formState.website_url}
                        onChange={handleChange}
                        placeholder="https://seusite.com.br"
                        className={inputClasses}
                    />
                </div>
            )}

            {/* Redes Sociais */}
            <div>
                <label className={labelClasses}>
                    Redes sociais ativas
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SOCIAL_CHANNELS_OPTIONS.map(option => (
                        <label
                            key={option.value}
                            className={`
                flex items-center gap-2 p-3 rounded-xl cursor-pointer
                transition-all duration-200
                ${formState.social_channels.includes(option.value)
                                    ? 'bg-gray-500/20 border border-gray-500'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                }
              `}
                        >
                            <input
                                type="checkbox"
                                checked={formState.social_channels.includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                                className="sr-only"
                            />
                            <span className="text-lg">{option.icon}</span>
                            <span className="text-sm text-white">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Instagram handle */}
            {formState.social_channels.includes('instagram') && (
                <div>
                    <label htmlFor="instagram_handle" className={labelClasses}>
                        @ do Instagram
                    </label>
                    <input
                        type="text"
                        id="instagram_handle"
                        name="instagram_handle"
                        value={formState.instagram_handle}
                        onChange={handleChange}
                        placeholder="@seuinstagram"
                        className={inputClasses}
                    />
                </div>
            )}

            {/* Tráfego Pago - Now using SelectionCards */}
            <div>
                <label className={labelClasses}>
                    Já investe em tráfego pago?
                </label>
                <SelectionCards
                    options={PAID_TRAFFIC_OPTIONS}
                    value={formState.uses_paid_traffic}
                    onChange={(value) => setFormState(prev => ({ ...prev, uses_paid_traffic: value }))}
                    columns={3}
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
