import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Pricing: React.FC = () => {
  return (
    <section id="precos" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-pretty">Um Investimento Inteligente para o seu Negócio</h2>
        <p className="text-lg text-gray-300 mb-10 text-pretty">
          Chega de orçamentos complicados e taxas escondidas. Oferecemos um pacote completo por um preço único e transparente.
        </p>
        <div className="bg-white/[.03] backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/50 shadow-2xl shadow-purple-400/20 transition-all duration-300 hover:border-purple-400/80 hover:-translate-y-2">
          <div className="md:flex justify-between items-center">
            <div className="text-left mb-8 md:mb-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-white text-pretty">Landing Page de Alta Performance</h3>
              <p className="text-purple-300 mt-1">Design, desenvolvimento e lançamento inclusos.</p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <div className="text-left md:text-right">
                <p className="text-gray-300 text-lg">Desenvolvimento (pagamento único)</p>
                <p className="text-4xl sm:text-5xl font-extrabold text-white">R$1.890,00</p>
              </div>
              <div className="text-left md:text-right mt-4">
                <p className="text-gray-300 text-lg">Hospedagem Profissional</p>
                <p className="text-3xl font-extrabold text-white">
                  R$133,00
                  <span className="text-base font-medium text-gray-300">/mês</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 my-8"></div>
          <div className="md:flex justify-between items-center text-white">
            <ul className="space-y-2 text-left mb-8 md:mb-0">
                <li className="flex items-center"><FaCheckCircle className="w-5 h-5 mr-2 text-green-400" />Até 10 seções</li>
                <li className="flex items-center"><FaCheckCircle className="w-5 h-5 mr-2 text-green-400" />Design Responsivo</li>
                <li className="flex items-center"><FaCheckCircle className="w-5 h-5 mr-2 text-green-400" />Formulário de Contato</li>
                <li className="flex items-center"><FaCheckCircle className="w-5 h-5 mr-2 text-green-400" />1 Ano de Domínio .com Grátis</li>
            </ul>
             <a 
              href="#contato"
              onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block md:inline-block w-full md:w-auto text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Iniciar Projeto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;