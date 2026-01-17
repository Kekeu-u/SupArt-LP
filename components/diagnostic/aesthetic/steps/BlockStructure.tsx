'use client';

import {
    CLINIC_PROCEDURES,
    type BusinessStructureData,
    businessStructureSchema
} from '@/lib/types/diagnostic-clinica';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShinyButton } from '@/components/ui/ShinyButton';

interface StepProps {
    data: Partial<BusinessStructureData>;
    onNext: (data: BusinessStructureData) => void;
    onBack?: () => void;
    isSubmitting?: boolean;
}

export function BlockStructure({ data, onNext }: StepProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<BusinessStructureData>({
        resolver: zodResolver(businessStructureSchema) as any,
        defaultValues: data as any
    });

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Sobre sua Clínica</h2>

            {/* Nome da Clínica */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nome da Clínica</label>
                <input
                    {...register('clinic_name')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    placeholder="Ex: Clínica Bella Vita"
                />
                {errors.clinic_name && <span className="text-red-400 text-xs">{errors.clinic_name.message}</span>}
            </div>

            {/* Número de Profissionais */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Profissionais</label>
                    <input
                        type="number"
                        {...register('professionals_count', { valueAsNumber: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    {errors.professionals_count && <span className="text-red-400 text-xs">{errors.professionals_count.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Atendimentos/dia</label>
                    <input
                        type="number"
                        {...register('daily_appointments', { valueAsNumber: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    {errors.daily_appointments && <span className="text-red-400 text-xs">{errors.daily_appointments.message}</span>}
                </div>
            </div>

            {/* Ticket Médio */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Ticket Médio (R$)</label>
                <input
                    type="number"
                    {...register('average_ticket', { valueAsNumber: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="0.00"
                />
                {errors.average_ticket && <span className="text-red-400 text-xs">{errors.average_ticket.message}</span>}
            </div>

            <div className="pt-4">
                <ShinyButton type="submit" className="w-full">
                    Próximo Passo
                </ShinyButton>
            </div>
        </form>
    );
}
