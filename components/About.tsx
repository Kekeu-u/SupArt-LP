import React, { useEffect, useRef } from 'react';

// Inform TypeScript that GSAP, ScrollTrigger, and CountUp are available globally
declare var gsap: any;
declare var ScrollTrigger: any;
declare var CountUp: any;

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
            <p className="text-gray-300">{description}</p>
        </div>
    </div>
);

const StatItem: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix }) => {
    const countRef = useRef(null);

    useEffect(() => {
        if (!countRef.current || typeof CountUp === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const countUp = new CountUp(countRef.current, value, {
            duration: 2.5,
            suffix: suffix || '',
            useEasing: true,
        });

        ScrollTrigger.create({
            trigger: countRef.current,
            start: 'top 90%',
            onEnter: () => {
                countUp.start();
            },
            once: true,
        });
    }, [value, suffix]);

    return (
        <div className="text-center">
            <h3 ref={countRef} className="text-4xl md:text-5xl font-extrabold text-white">0</h3>
            <p className="text-violet-300 mt-2 text-sm md:text-base">{label}</p>
        </div>
    );
};

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Por que escolher a Sup<span className="text-violet-400">Art</span>?</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
          Somos especialistas em criar landing pages que não apenas impressionam visualmente, mas que são projetadas para converter visitantes em clientes. Entregamos qualidade e agilidade para o seu negócio decolar.
        </p>
        
        <div className="my-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatItem value={50} suffix="+" label="Projetos Entregues" />
            <StatItem value={98} suffix="%" label="Clientes Satisfeitos" />
            <StatItem value={7} label="Dias para Entrega" />
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
