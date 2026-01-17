'use client';

import {
    type CurrentProblemsData,
    currentProblemsSchema
} from '@/lib/types/diagnostic-clinica';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShinyButton } from '@/components/ui/ShinyButton';

interface StepProps {
    data: Partial<CurrentProblemsData>;
    onNext: (data: CurrentProblemsData) => void;
    onBack: () => void;
}

export function BlockProblems({ data, onNext, onBack }: StepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<CurrentProblemsData>({
        resolver: zodResolver(currentProblemsSchema) as any,
        defaultValues: data as any
    });

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Dores & Problemas</h2>

            {/* No Show Rate - Range Slider */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-300 flex justify-between">
                    <span>Taxa de Faltas (No-Show) Estimada %</span>
                    {/* Placeholder for value display if needed via standard React state, keeping simple for zod only for now */}
                </label>
                <input
                    type="number"
                    {...register('noshow_rate', { valueAsNumber: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ex: 20"
                />
                {errors.noshow_rate && <span className="text-red-400 text-xs">{errors.noshow_rate.message}</span>}
                <p className="text-xs text-gray-500">Estimativa: Se de 10 agendamentos, 2 faltam, sua taxa é 20%.</p>
            </div>

            {/* Perde Clientes Demora */}
            <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <input
                        type="checkbox"
                        {...register('loses_clients_delay')}
                        className="w-5 h-5 rounded border-gray-600 bg-transparent text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-200">Acredito que perco clientes pela demora no WhatsApp</span>
                </label>
            </div>

            {/* Estimativa de Perda (condicional visualmente, mas sempre registrado) */}
            <div className="space-y-2 pl-8 border-l-2 border-white/10">
                <label className="text-sm font-medium text-gray-300">Quantos clientes perdidos/mês (estimativa)?</label>
                <input
                    type="number"
                    {...register('lost_clients_estimate', { valueAsNumber: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="0"
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transaction-colors"
                >
                    Voltar
                </button>
                <ShinyButton type="submit" className="flex-1">
                    Próximo Passo
                </ShinyButton>
            </div>
        </form>
    );
}
