'use client';

import { useState } from 'react';
import { step1Schema, ROLE_OPTIONS, REFERRAL_OPTIONS } from '@/lib/types/diagnostic';
import type { DiagnosticFormData } from '@/lib/types/diagnostic';

interface StepProps {
    data: Partial<DiagnosticFormData>;
    onNext: (data: Partial<DiagnosticFormData>) => void;
    onBack: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting: boolean;
}

export function StepIdentification({ data, onNext, isFirst }: StepProps) {
    const [formState, setFormState] = useState({
        full_name: data.full_name || '',
        email: data.email || '',
        phone: data.phone || '',
        company_name: data.company_name || '',
        role: data.role || '',
        referral_source: data.referral_source || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = step1Schema.safeParse(formState);
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

    const labelClasses = 'block text-sm font-medium text-gray-300 mb-2';
    const errorClasses = 'text-red-400 text-xs mt-1';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
                <label htmlFor="full_name" className={labelClasses}>
                    Nome Completo <span className="text-pink-500">*</span>
                </label>
                <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formState.full_name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={inputClasses}
                />
                {errors.full_name && <p className={errorClasses}>{errors.full_name}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className={labelClasses}>
                    Email <span className="text-pink-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={inputClasses}
                />
                {errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>

            {/* WhatsApp */}
            <div>
                <label htmlFor="phone" className={labelClasses}>
                    WhatsApp <span className="text-pink-500">*</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className={inputClasses}
                />
                {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
            </div>

            {/* Empresa */}
            <div>
                <label htmlFor="company_name" className={labelClasses}>
                    Nome da Empresa
                </label>
                <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formState.company_name}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa (opcional)"
                    className={inputClasses}
                />
            </div>

            {/* Cargo */}
            <div>
                <label htmlFor="role" className={labelClasses}>
                    Cargo/Função
                </label>
                <select
                    id="role"
                    name="role"
                    value={formState.role}
                    onChange={handleChange}
                    className={inputClasses}
                >
                    <option value="">Selecione seu cargo</option>
                    {ROLE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Como nos conheceu */}
            <div>
                <label htmlFor="referral_source" className={labelClasses}>
                    Como nos conheceu?
                </label>
                <select
                    id="referral_source"
                    name="referral_source"
                    value={formState.referral_source}
                    onChange={handleChange}
                    className={inputClasses}
                >
                    <option value="">Selecione uma opção</option>
                    {REFERRAL_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Navigation */}
            <div className="flex justify-end pt-4">
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
