import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

const items = [
  'Design Personalizado e Moderno',
  'Até 10 Seções de Conteúdo',
  'Totalmente Responsivo',
  'Formulário de Contato Integrado',
  'Otimização SEO Básica',
  'Integração com Redes Sociais',
  '1 Ano de Domínio .com Grátis'
];

const Offer: React.FC = () => (
  <section id="servicos" className="py-16 md:py-20 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-gray-100 rounded-full border-2 border-gray-200">
          <FiPackage className="h-10 w-10 md:h-12 md:w-12 text-gray-600" />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">O que está incluso no seu projeto?</h2>
      <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
        Nosso pacote foi desenhado para ser completo e direto ao ponto.
      </p>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 text-left max-w-5xl mx-auto">
        {items.map((item, i) => (
          <li key={i} className="flex items-center text-lg text-gray-900">
            <FaCheckCircle className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Offer;