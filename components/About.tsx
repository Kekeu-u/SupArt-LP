import React from 'react';
import StarIcon from './icons/StarIcon';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-start space-x-4 transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/10">
        <div className="flex-shrink-0 bg-violet-500/20 p-2 rounded-full">
            <CheckIcon />
        </div>
        <div>
            <h3 className="font-bold text-xl text-white mb-1">{title}</h3>
            <p className="text-gray-300 text-pretty">{description}</p>
        </div>
    </div>
);

const StatItem: React.FC<{ value: number; label: string; prefix?: string; suffix?: string }> = ({ value, label, prefix, suffix }) => {
    return (
        <div className="text-center bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10">
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">
                {prefix || ''}{value}{suffix || ''}
            </h3>
            <p className="text-violet-300 mt-2 text-sm md:text-base">{label}</p>
            <div className="flex justify-center mt-2 space-x-1">
                {Array(5).fill(0).map((_, i) => <StarIcon key={i} className="w-5 h-5 text-violet-400" />)}
            </div>
        </div>
    );
};

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-pretty">Por que escolher a Sup<span className="text-violet-400">Art</span>?</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 text-pretty">
          Somos especialistas em criar landing pages que não apenas impressionam visualmente, mas que são projetadas para converter visitantes em clientes. Entregamos qualidade e agilidade para o seu negócio decolar.
        </p>
        
        <div className="my-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <StatItem value={55} prefix="+" label="Projetos Entregues" />
            <StatItem value={55} prefix="+" label="Clientes Satisfeitos" />
            <StatItem value={5} label="Dias para Entrega" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <FeatureCard title="Entrega Expressa" description="Sua página no ar em tempo recorde, sem comprometer a qualidade." />
            <FeatureCard title="Design Moderno" description="Layouts fluidos e responsivos que encantam em qualquer dispositivo." />
            <FeatureCard title="Foco em Conversão" description="Estrutura e CTAs pensados para maximizar seus resultados." />
            <FeatureCard title="Preço Acessível" description="Qualidade de agência premium por um valor que cabe no seu bolso." />
            <FeatureCard title="Até 10 Seções" description="Flexibilidade para incluir todo o conteúdo que sua marca precisa." />
            <FeatureCard title="Suporte Dedicado" description="Acompanhamos você em cada etapa do processo de criação." />
        </div>
      </div>
    </section>
  );
};

export default About;