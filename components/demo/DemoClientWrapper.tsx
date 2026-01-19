'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false is allowed in Client Components
const InteractiveAgentFlow = dynamic(
    () => import('./InteractiveAgentFlow').then(mod => mod.InteractiveAgentFlow),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Carregando demo...</p>
                </div>
            </div>
        )
    }
);

export const DemoClientWrapper = () => {
    return <InteractiveAgentFlow />;
};
