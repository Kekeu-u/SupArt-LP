import React from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white/[.03] backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start space-x-4 transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/10">
        <div className="flex-shrink-0 bg-purple-500/10 p-2 rounded-full border border-purple-500/20">
            <FaCheckCircle className="h-6 w-6 text-purple-400" />
        </div>
        <div>
            <h3 className="font-bold text-xl text-white mb-1">{title}</h3>
            <p className="text-gray-300 text-pretty">{description}</p>
        </div>
    </div>
);

const StatItem: React.FC<{ value: number; label: string; prefix?: string; suffix?: string }> = ({ value, label, prefix, suffix }) => {
    return (
        <div className="text-center bg-white/[.03] backdrop-blur-xl p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                {prefix || ''}{value}{suffix || ''}
            </h3>
            <p className="text-purple-300 mt-2 text-sm md:text-base">{label}</p>
        </div>
    );
};

const About: React.FC = () => {
    return (
        <section id="sobre" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            {/* Star Divider - Repositioned between sections for better flow */}
            <div className="flex justify-center items-center gap-x-1 sm:gap-x-2 -mt-24 sm:-mt-28 md:-mt-32 mb-12 sm:mb-16">
                {Array(5).fill(0).map((_, i) => (
                    <FaStar key={i} className="w-9 h-9 sm:w-12 sm:h-12 text-purple-400" />
                ))}
            </div>

            <div className="container mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-pretty">Por que escolher a Sup<span className="text-glass-art">Art</span>?</h2>
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