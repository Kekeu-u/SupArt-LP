import React, { useState } from 'react';

const faqData = [
  {
    question: "Qual é o prazo de entrega da landing page?",
    answer: "Nosso processo é otimizado para agilidade. Em média, entregamos o projeto completo para revisão em 5 a 7 dias úteis após o recebimento de todo o material (textos, imagens, etc.)."
  },
  {
    question: "O que eu preciso fornecer para iniciar o projeto?",
    answer: "Você precisará fornecer os textos para cada seção, seu logotipo, e quaisquer imagens ou vídeos que queira incluir. Caso não tenha, podemos auxiliar com bancos de imagens."
  },
  {
    question: "Hospedagem e domínio estão inclusos?",
    answer: "Não, o serviço de hospedagem e o registro do domínio são de responsabilidade do cliente. Nós realizamos toda a configuração e publicação da landing page na sua hospedagem sem custo adicional."
  },
  {
    question: "Posso solicitar alterações após a entrega?",
    answer: "Sim! O pacote inclui uma rodada de ajustes finos após a primeira entrega para garantir que tudo esteja perfeito. Alterações estruturais maiores podem ter um custo adicional."
  },
];

const FaqItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full text-left py-6 flex justify-between items-center"
      >
        <span className="text-lg font-semibold text-white text-pretty">{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="text-gray-300 pb-6 pr-6 text-pretty">{answer}</p>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-pretty">Dúvidas Frequentes</h2>
        <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12 text-pretty">
          Respondemos algumas das perguntas mais comuns para te ajudar a decidir.
        </p>
        <div className="bg-white/5 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-white/10">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;