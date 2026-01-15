import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { AgentTrigger } from '@/components/dashboard/AgentTrigger';
import { PostsList } from '@/components/dashboard/PostsList';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-black">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-black to-cyan-950/20 pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white">Dashboard de Blog</h1>
                                <p className="text-gray-400 mt-1">Gerencie seus posts e agentes de conteúdo</p>
                            </div>
                            <a
                                href="/blog"
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors"
                            >
                                Ver Blog →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <DashboardStats />
                    <AgentTrigger />
                    <PostsList />
                </div>
            </div>
        </div>
    );
}
