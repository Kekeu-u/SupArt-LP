import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section id="precos" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-4">Um Investimento Inteligente para o seu Negócio</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Chega de orçamentos complicados e taxas escondidas. Oferecemos um pacote completo por um preço único e transparente.
        </p>
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-violet-400/50 shadow-2xl shadow-violet-400/20 transition-all duration-300 hover:border-violet-400/80 hover:-translate-y-2">
          <div className="md:flex justify-between items-center">
            <div className="text-left mb-8 md:mb-0">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Landing Page de Alta Performance</h3>
              <p className="text-violet-600 dark:text-violet-300 mt-1">Design, desenvolvimento e lançamento inclusos.</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-gray-600 dark:text-gray-300 text-lg">Investimento único de</p>
              <p className="text-5xl font-extrabold text-slate-900 dark:text-white">R$1.890,00</p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-white/10 my-8"></div>
          <div className="md:flex justify-between items-center text-slate-800 dark:text-white">
            <ul className="space-y-2 text-left mb-8 md:mb-0">
                <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Até 10 seções</li>
                <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Design Responsivo</li>
                <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Formulário de Contato</li>
            </ul>
             <a 
              href="#contato"
              onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block md:inline-block w-full md:w-auto text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
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