'use client';

import {
    EXPECTATIVA_PRAZO,
    BUDGET_RANGES,
    type ExpectationsData,
    expectationsSchema
} from '@/lib/types/diagnostic-clinica';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShinyButton } from '@/components/ui/ShinyButton';

interface StepProps {
    data: Partial<ExpectationsData>;
    onNext: (data: ExpectationsData) => void;
    onBack: () => void;
    isSubmitting?: boolean;
}

export function BlockExpectations({ data, onNext, onBack, isSubmitting }: StepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ExpectationsData>({
        resolver: zodResolver(expectationsSchema) as any,
        defaultValues: data as any
    });

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Próximos Passos</h2>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Qual o ÚNICO problema que você resolveria hoje?</label>
                <input
                    {...register('main_pain_point')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ex: No-shows, atendimento lento..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Prazo para Solução</label>
                    <select
                        {...register('desired_timeline')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                        <option value="" className="bg-gray-900 text-gray-500">Selecione...</option>
                        {EXPECTATIVA_PRAZO.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.desired_timeline && <span className="text-red-400 text-xs">{errors.desired_timeline.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Investimento Mensal</label>
                    <select
                        {...register('monthly_budget')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                        <option value="" className="bg-gray-900 text-gray-500">Selecione...</option>
                        {BUDGET_RANGES.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.monthly_budget && <span className="text-red-400 text-xs">{errors.monthly_budget.message}</span>}
                </div>
            </div>

            <div className="flex gap-3 pt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transaction-colors"
                    disabled={isSubmitting}
                >
                    Voltar
                </button>
                <ShinyButton type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Gerando Análise IA...' : 'Ver Diagnóstico Completo'}
                </ShinyButton>
            </div>
        </form>
    );
}
