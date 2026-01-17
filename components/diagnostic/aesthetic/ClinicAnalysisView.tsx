'use client';

import { ClinicAnalysisResult } from '@/lib/types/diagnostic-clinica';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/ShinyButton';

interface Props {
    analysis: ClinicAnalysisResult;
}

export function ClinicAnalysisView({ analysis }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Header: Score */}
            <div className="text-center mb-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-4"
                >
                    Análise Concluída
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Diagnóstico <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">S.O.T.A.</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    {analysis.summary}
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prejuízo Estimado */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">-R$</div>
                    <h3 className="text-red-400 font-medium mb-1">Prejuízo Mensal Estimado</h3>
                    <div className="text-4xl font-bold text-white mb-2">
                        R$ {analysis.financial_loss_estimate.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-sm text-gray-400">Dinheiro deixado na mesa com No-Shows e demora no atendimento.</p>
                </div>

                {/* Ganho de Eficiência */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/40 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-green-500">Time</div>
                    <h3 className="text-green-400 font-medium mb-1">Eficiência Operacional</h3>
                    <div className="text-4xl font-bold text-white mb-2">
                        {analysis.efficiency_gain_potential}
                    </div>
                    <p className="text-sm text-gray-400">Tempo que sua equipe pode focar em vendas em vez de tarefas repetitivas.</p>
                </div>
            </div>

            {/* Plano Recomendado */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50" />
                <h3 className="text-gray-400 font-medium mb-4 relative z-10">Plano Recomendado</h3>
                <div className="text-5xl md:text-6xl font-black text-white mb-6 relative z-10 tracking-tight">
                    {analysis.recommended_plan}
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-10">
                    {analysis.key_automation_opportunities.map((opp, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/5">
                            {opp}
                        </span>
                    ))}
                </div>

                <div className="flex justify-center relative z-10">
                    <ShinyButton href="https://wa.me/5511999999999?text=Quero+implementar+o+plano+recomendado+no+diagnostico" className="px-10 py-4 text-lg">
                        Falar com Especialista
                    </ShinyButton>
                </div>
                <p className="mt-4 text-xs text-gray-500 relative z-10">Tempo de implementação estimado: {analysis.implementation_time_estimate}</p>
            </div>
        </div>
    );
}
