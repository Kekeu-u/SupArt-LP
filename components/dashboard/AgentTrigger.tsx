'use client';

import { useState } from 'react';

export function AgentTrigger() {
    const [loading, setLoading] = useState<string | null>(null);
    const [result, setResult] = useState<{ agent: string; message: string } | null>(null);

    const triggerAgent = async (agent: 'reddit' | 'news') => {
        setLoading(agent);
        setResult(null);

        try {
            const response = await fetch('/api/dashboard/trigger', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agent })
            });

            const data = await response.json();

            if (data.error) {
                setResult({ agent, message: `❌ Erro: ${data.error}` });
            } else if (data.generatedPost) {
                setResult({ agent, message: `✅ Post gerado com sucesso!` });
            } else if (data.success) {
                setResult({ agent, message: `✅ Agente executado (${data.toolsFound || data.storiesChecked || 0} itens encontrados)` });
            } else {
                setResult({ agent, message: '⚠️ Nenhum conteúdo novo encontrado' });
            }
        } catch (error) {
            setResult({ agent, message: `❌ Erro: ${error}` });
        } finally {
            setLoading(null);
        }
    };

    const agents = [
        {
            id: 'reddit' as const,
            name: 'Reddit Hunter',
            icon: '🎯',
            description: 'Busca ferramentas virais no Reddit',
            gradient: 'from-orange-500 to-red-500'
        },
        {
            id: 'news' as const,
            name: 'News Watcher',
            icon: '📰',
            description: 'Monitora notícias de IA no Hacker News',
            gradient: 'from-blue-500 to-cyan-500'
        },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Gerar Conteúdo Manualmente</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {agents.map((agent) => (
                    <button
                        key={agent.id}
                        onClick={() => triggerAgent(agent.id)}
                        disabled={loading !== null}
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`} />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                                    {loading === agent.id ? '⏳' : agent.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg">{agent.name}</h3>
                                    <p className="text-gray-400 text-sm">{agent.description}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${agent.gradient} text-white font-bold text-sm`}>
                                    {loading === agent.id ? 'Gerando...' : 'Executar'}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {result && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <p className="text-white text-sm">{result.message}</p>
                </div>
            )}
        </div>
    );
}
