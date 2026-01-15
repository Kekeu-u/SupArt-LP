'use client';

import { motion } from 'framer-motion';

interface DiagnosticSuccessProps {
    result: {
        urgency_score: number;
        recommended_products: string[];
        ai_analysis?: {
            summary?: string;
            recommendation?: string;
        };
    };
}

export function DiagnosticSuccess({ result }: DiagnosticSuccessProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto px-4"
        >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 text-center">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                >
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    🎉 Diagnóstico Enviado!
                </h2>
                <p className="text-gray-400 mb-8">
                    Em breve você receberá um email com sua análise personalizada
                </p>

                {/* Score Badge */}
                <div className="inline-block mb-8">
                    <div className="bg-white/10 rounded-xl px-6 py-4">
                        <p className="text-sm text-gray-400 mb-1">Seu Score de Prioridade</p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-pink-400 bg-clip-text text-transparent">
                            {result.urgency_score}/10
                        </p>
                    </div>
                </div>

                {/* Recommended Products */}
                {result.recommended_products.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            🎯 Produtos Recomendados para Você
                        </h3>
                        <ul className="space-y-2">
                            {result.recommended_products.map((product, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 text-gray-300"
                                >
                                    <span className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center text-sm text-gray-400">
                                        {index + 1}
                                    </span>
                                    {product}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* AI Summary */}
                {result.ai_analysis?.summary && (
                    <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            🤖 Análise da IA
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {result.ai_analysis.summary}
                        </p>
                    </div>
                )}

                {/* CTA */}
                <div className="space-y-4">
                    <a
                        href="https://wa.me/5511999999999?text=Olá! Acabei de fazer o diagnóstico no site e gostaria de agendar uma consultoria."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-gray-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                    >
                        📅 Agendar Consultoria Gratuita
                    </a>

                    <p className="text-xs text-gray-500">
                        Responderemos em até 24 horas úteis
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
