import React from 'react';

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
    <div className="relative pl-12">
        <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-violet-600 text-white font-bold text-xl border-4 border-slate-700">
           {number}
        </div>
        <div className="ml-4">
            <h3 className="font-bold text-xl text-white mb-1 text-pretty">{title}</h3>
            <p className="text-gray-300 text-pretty">{description}</p>
        </div>
    </div>
);

const Process: React.FC = () => {
  return (
    <section id="processo" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-pretty">Nosso Processo é Simples e Transparente</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16 text-pretty">
          Em apenas 4 passos, tiramos sua ideia do papel e a colocamos no ar, pronta para gerar resultados.
        </p>
        <div className="relative max-w-2xl mx-auto">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-6 left-6 w-1 h-full bg-slate-700 -translate-x-1/2"></div>
            
            <div className="space-y-12">
                <StepCard number="1" title="Reunião de Briefing" description="Entendemos seus objetivos, público-alvo e identidade visual para alinhar o projeto." />
                <StepCard number="2" title="Criação e Desenvolvimento" description="Nossa equipe de especialistas desenvolve o design e codifica sua landing page com as melhores práticas." />
                <StepCard number="3" title="Revisão e Ajustes" description="Você recebe uma prévia para revisar e solicitar os ajustes finos necessários." />
                <StepCard number="4" title="Lançamento e Suporte" description="Publicamos sua página no seu domínio e oferecemos suporte para qualquer dúvida." />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;