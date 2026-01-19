'use client';

interface AIAgentsHeadlineProps {
    className?: string;
}

export const AIAgentsHeadline = ({ className = '' }: AIAgentsHeadlineProps) => {
    const features = ['Memória Contextual', 'Agendamento Inteligente', 'CRM Integrado'];

    return (
        <div className={`space-y-4 lg:space-y-8 ${className}`}>
            {/* Headline */}
            <div className="space-y-2 lg:space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                        Seu Business
                    </span>
                    <br />
                    <span className="text-white drop-shadow-sm">No Piloto</span>
                    <br />
                    <span className="text-white drop-shadow-sm">Automático</span>
                </h2>
                <p className="text-gray-400 text-sm sm:text-base lg:text-2xl font-light tracking-wide">Sistema Multi-Agente com IA</p>
            </div>

            {/* Feature list */}
            <div className="space-y-2 lg:space-y-4">
                {features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 lg:gap-4 text-gray-300">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        <span className="text-sm lg:text-xl tracking-wide">{feat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
