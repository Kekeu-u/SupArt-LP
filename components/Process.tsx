import React from 'react';

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="relative pl-16">
    <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold text-xl">
      {number}
    </div>
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 transition-all duration-300 hover:border-gray-400 hover:shadow-md">
      <h3 className="font-bold text-xl text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Process: React.FC = () => (
  <section id="processo" className="py-16 md:py-20 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Nosso Processo é Simples e Transparente</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
        Em apenas 4 passos, tiramos sua ideia do papel e a colocamos no ar.
      </p>
      <div className="relative max-w-2xl mx-auto text-left">
        <div className="hidden sm:block absolute top-6 left-6 w-0.5 h-[calc(100%-3rem)] bg-gray-300 -translate-x-1/2" />
        <div className="space-y-12">
          <StepCard number="1" title="Reunião de Briefing" description="Entendemos seus objetivos, público-alvo e identidade visual." />
          <StepCard number="2" title="Criação e Desenvolvimento" description="Nossa equipe desenvolve o design e codifica sua landing page." />
          <StepCard number="3" title="Revisão e Ajustes" description="Você recebe uma prévia para revisar e solicitar ajustes." />
          <StepCard number="4" title="Lançamento e Suporte" description="Publicamos sua página e oferecemos suporte." />
        </div>
      </div>
    </div>
  </section>
);

export default Process;