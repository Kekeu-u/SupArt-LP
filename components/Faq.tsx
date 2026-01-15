import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

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
}> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onClick}
      className="w-full text-left py-6 flex justify-between items-center transition-colors duration-300 hover:text-gray-600"
      aria-expanded={isOpen}
    >
      <span className="text-lg font-semibold text-gray-900">{question}</span>
      <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <FaChevronDown className="w-5 h-5 text-gray-400" />
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
      <p className="text-gray-600 pb-6 pr-6">{answer}</p>
    </div>
  </div>
);

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Dúvidas Frequentes</h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Respondemos algumas das perguntas mais comuns para te ajudar a decidir.
        </p>
        <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              {...item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;