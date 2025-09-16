import React from 'react';

const Offer: React.FC = () => {
  return (
    <section id="servicos" className="py-20 px-6 bg-slate-100 dark:bg-white/5">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4">O que está incluso no seu projeto?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Nosso pacote foi desenhado para ser completo e direto ao ponto. Por um valor fixo, você recebe uma landing page profissional com tudo que precisa para lançar sua campanha e começar a vender.
          </p>
          <ul className="space-y-4 text-left">
            {['Design Personalizado e Moderno', 'Até 10 Seções de Conteúdo', 'Totalmente Responsivo (Desktop, Tablet e Mobile)', 'Formulário de Contato Integrado', 'Otimização SEO Básica', 'Integração com Redes Sociais'].map((item, index) => (
              <li key={index} className="flex items-center text-lg text-slate-800 dark:text-white">
                <svg className="w-6 h-6 mr-3 text-violet-500 dark:text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md bg-white dark:bg-slate-900/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-2xl shadow-violet-500/10 transform transition-transform duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Landing Page Profissional</h3>
            <p className="text-center text-violet-500 dark:text-violet-400 text-lg font-semibold mb-6">Plano Único</p>
            <div className="text-center my-8">
              <span className="text-5xl font-extrabold text-slate-900 dark:text-white">R$1.890</span>
              <span className="text-gray-600 dark:text-gray-300">,00</span>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Pagamento único. Sem mensalidades.</p>
            <a 
              href="#contato"
              onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300"
            >
              Contratar Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
