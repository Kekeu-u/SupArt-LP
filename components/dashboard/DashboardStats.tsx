'use client';

import { useEffect, useState } from 'react';

interface Stats {
    total: number;
    drafts: number;
    published: number;
}

export function DashboardStats() {
    const [stats, setStats] = useState<Stats>({ total: 0, drafts: 0, published: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/dashboard/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total de Posts', value: stats.total, gradient: 'from-blue-500 to-cyan-500', icon: '📝' },
        { label: 'Rascunhos', value: stats.drafts, gradient: 'from-gray-500 to-slate-500', icon: '✏️' },
        { label: 'Publicados', value: stats.published, gradient: 'from-emerald-500 to-teal-500', icon: '✅' },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((card) => (
                <div
                    key={card.label}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`} />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{card.icon}</span>
                            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${card.gradient} text-white text-xs font-bold`}>
                                {card.value}
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{card.label}</h3>
                        <p className="text-white text-3xl font-bold mt-2">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
