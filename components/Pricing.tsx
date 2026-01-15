import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Pricing: React.FC = () => (
  <section id="precos" className="py-16 md:py-20 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Um Investimento Inteligente para o seu Negócio</h2>
      <p className="text-lg text-gray-600 mb-10">
        Chega de orçamentos complicados e taxas escondidas. Oferecemos um pacote completo por um preço único e transparente.
      </p>
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="md:flex justify-between items-center">
          <div className="text-left mb-8 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Landing Page de Alta Performance</h3>
            <p className="text-gray-500 mt-1">Design, desenvolvimento e lançamento inclusos.</p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="text-left md:text-right">
              <p className="text-gray-500 text-lg">Desenvolvimento (pagamento único)</p>
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900">R$1.890,00</p>
            </div>
            <div className="text-left md:text-right mt-4">
              <p className="text-gray-500 text-lg">Hospedagem Profissional</p>
              <p className="text-3xl font-extrabold text-gray-900">
                R$133,00<span className="text-base font-medium text-gray-500">/mês</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 my-8" />
        <div className="md:flex justify-between items-center text-gray-900">
          <ul className="space-y-2 text-left mb-8 md:mb-0">
            {['Até 10 seções', 'Design Responsivo', 'Formulário de Contato', '1 Ano de Domínio .com Grátis'].map((item, i) => (
              <li key={i} className="flex items-center"><FaCheckCircle className="w-5 h-5 mr-2 text-green-500" />{item}</li>
            ))}
          </ul>
          <a href="#contato" onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="block md:inline-block w-full md:w-auto text-center bg-black hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:scale-105">
            Iniciar Projeto
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;