'use client';

import {
    WHATSAPP_VOLUME,
    RESPONSAVEL_WHATSAPP,
    type DigitalVolumeData,
    digitalVolumeSchema
} from '@/lib/types/diagnostic-clinica';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShinyButton } from '@/components/ui/ShinyButton';

interface StepProps {
    data: Partial<DigitalVolumeData>;
    onNext: (data: DigitalVolumeData) => void;
    onBack: () => void;
}

export function BlockVolume({ data, onNext, onBack }: StepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<DigitalVolumeData>({
        resolver: zodResolver(digitalVolumeSchema) as any,
        defaultValues: data as any
    });

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Volume Digital</h2>

            {/* Daily Messages (Select Card) */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Mensagens/Dia no WhatsApp</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {WHATSAPP_VOLUME.map((opt) => (
                        <label key={opt.value} className="cursor-pointer">
                            <input
                                type="radio"
                                value={opt.value}
                                {...register('daily_messages')}
                                className="peer sr-only"
                            />
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 peer-checked:bg-purple-500/20 peer-checked:border-purple-500 transition-all text-sm text-gray-200 peer-checked:text-white">
                                {opt.label}
                            </div>
                        </label>
                    ))}
                </div>
                {errors.daily_messages && <span className="text-red-400 text-xs">{errors.daily_messages.message}</span>}
            </div>

            {/* Responsável */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Quem responde hoje?</label>
                <select
                    {...register('whatsapp_responsible')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                    <option value="" className="bg-gray-900 text-gray-500">Selecione...</option>
                    {RESPONSAVEL_WHATSAPP.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                            {opt.label}
                        </option>
                    ))}
                </select>
                {errors.whatsapp_responsible && <span className="text-red-400 text-xs">{errors.whatsapp_responsible.message}</span>}
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
