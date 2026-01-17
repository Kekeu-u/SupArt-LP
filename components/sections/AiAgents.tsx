'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { ShinyButton } from '@/components/ui/ShinyButton';

export const AiAgents = () => {
    const { t } = useI18n();

    return (
        <section id="ai-agents" className="py-24 px-8 md:px-16 lg:px-24 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                            {t("SupArt Agents", "Agentes SupArt")}
                        </span>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                            {t("Your Business,", "Seu Negócio,")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                {t("Running on Autopilot.", "No Piloto Automático.")}
                            </span>
                        </h2>

                        <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                            {t(
                                "Stop losing clients to delay. Our AI Agents respond instantly, qualify leads, and schedule meetings 24/7.",
                                "Pare de perder clientes pela demora. Nossos Agentes de IA respondem na hora, qualificam leads e agendam reuniões 24h por dia."
                            )}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <ShinyButton href="/diagnostico" className="w-full sm:w-auto text-center justify-center">
                                {t("Get Free Diagnosis", "Receber Diagnóstico Gratuito")}
                            </ShinyButton>

                            <a href="#contact" className="px-6 py-3 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-center">
                                {t("See Examples", "Ver Exemplos")}
                            </a>
                        </div>
                    </motion.div>

                    {/* Visual / Abstract Representation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group"
                    >
                        {/* Simulation UI */}
                        <div className="w-[80%] max-w-sm glass-panel p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                                    <span className="text-white text-lg">✦</span>
                                </div>
                                <div>
                                    <div className="text-white font-medium text-sm">Agente SupArt</div>
                                    <div className="text-green-400 text-xs">Online agora</div>
                                </div>
                            </div>

                            {/* Chat Bubbles */}
                            <div className="space-y-4">
                                <div className="bg-white/10 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl text-gray-200 text-sm max-w-[90%]">
                                    Olá! Vi que você baixou nosso material. Posso agendar uma call para falar sobre seu projeto?
                                </div>
                                <div className="ml-auto bg-purple-600/20 border border-purple-600/30 p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-white text-sm max-w-[80%] text-right">
                                    Sim, quais horários tem para amanhã?
                                </div>
                                <div className="bg-white/10 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl text-gray-200 text-sm max-w-[90%]">
                                    Tenho 14:00 e 16:30. Qual prefere? 📅
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="mt-6 flex justify-between items-center text-xs text-gray-500">
                                <span>Tempo de resposta: 0.2s</span>
                                <span className="text-purple-400">Automatizado por IA</span>
                            </div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
