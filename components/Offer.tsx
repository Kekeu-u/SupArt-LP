import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

const Offer: React.FC = () => {
  return (
    <section id="servicos" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto text-center">

        <div className="flex justify-center mb-6">
          <div className="p-3 sm:p-4 bg-purple-500/10 rounded-full border-2 border-purple-500/20">
            <FiPackage className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white text-pretty">O que está incluso no seu projeto?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto text-pretty">
          Nosso pacote foi desenhado para ser completo e direto ao ponto. Por um valor fixo, você recebe uma landing page profissional com tudo que precisa para lançar sua campanha e começar a vender.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 text-left max-w-5xl mx-auto">
          {['Design Personalizado e Moderno', 'Até 10 Seções de Conteúdo', 'Totalmente Responsivo', 'Formulário de Contato Integrado', 'Otimização SEO Básica', 'Integração com Redes Sociais', '1 Ano de Domínio .com Grátis'].map((item, index) => (
            <li key={index} className="flex items-center text-lg text-gray-900 dark:text-white">
              <FaCheckCircle className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Offer;