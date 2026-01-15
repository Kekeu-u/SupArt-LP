import React from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex items-start space-x-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex-shrink-0 bg-gray-200 p-2 rounded-full">
            <FaCheckCircle className="h-6 w-6 text-gray-600" />
        </div>
        <div>
            <h3 className="font-bold text-xl text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const StatItem: React.FC<{ value: number; label: string; prefix?: string; suffix?: string }> = ({ value, label, prefix, suffix }) => (
    <div className="text-center bg-gray-50 p-6 rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            {prefix || ''}{value}{suffix || ''}
        </h3>
        <p className="text-gray-500 mt-2">{label}</p>
    </div>
);

const About: React.FC = () => (
    <section id="sobre" className="py-16 md:py-20 px-6">
        <div className="flex justify-center items-center gap-x-2 -mt-24 md:-mt-32 mb-16">
            {Array(5).fill(0).map((_, i) => (
                <FaStar key={i} className="w-9 h-9 md:w-12 md:h-12 text-gray-400" />
            ))}
        </div>

        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Por que escolher a SupArt?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                Somos especialistas em criar landing pages que não apenas impressionam visualmente, mas que são projetadas para converter visitantes em clientes.
            </p>

            <div className="my-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <StatItem value={55} prefix="+" label="Projetos Entregues" />
                <StatItem value={55} prefix="+" label="Clientes Satisfeitos" />
                <StatItem value={5} label="Dias para Entrega" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
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

export default About;