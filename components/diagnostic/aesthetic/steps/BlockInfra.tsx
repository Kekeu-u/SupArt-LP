'use client';

import {
    AGENDA_SYSTEM,
    type TechInfraData,
    techInfraSchema
} from '@/lib/types/diagnostic-clinica';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShinyButton } from '@/components/ui/ShinyButton';

interface StepProps {
    data: Partial<TechInfraData>;
    onNext: (data: TechInfraData) => void;
    onBack: () => void;
}

export function BlockInfra({ data, onNext, onBack }: StepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<TechInfraData>({
        resolver: zodResolver(techInfraSchema) as any,
        defaultValues: data as any
    });

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Infraestrutura</h2>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Sistema de Agenda Principal</label>
                <select
                    {...register('calendar_system')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                    <option value="" className="bg-gray-900 text-gray-500">Selecione...</option>
                    {AGENDA_SYSTEM.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                            {opt.label}
                        </option>
                    ))}
                </select>
                {errors.calendar_system && <span className="text-red-400 text-xs">{errors.calendar_system.message}</span>}
            </div>

            <div className="space-y-3 pt-4">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <input
                        type="checkbox"
                        {...register('tried_chatbot_before')}
                        className="w-5 h-5 rounded border-gray-600 bg-transparent text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-200">Já tentei usar automação/chatbot antes</span>
                </label>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Se sim, por que falhou? (Opcional)</label>
                <textarea
                    {...register('failure_reason')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none h-24 resize-none"
                    placeholder="Ex: Era muito robótico, o suporte era ruim..."
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
