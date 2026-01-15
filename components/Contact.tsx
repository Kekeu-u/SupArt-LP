import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submission, setSubmission] = useState({ loading: false, success: false, error: false, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmission({ loading: true, success: false, error: false, message: '' });

    try {
      const response = await fetch('https://formspree.io/f/mvgbnnqa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmission({ loading: false, success: true, error: false, message: 'Mensagem enviada com sucesso!' });
        setName(''); setEmail(''); setMessage('');
      } else {
        setSubmission({ loading: false, success: false, error: true, message: 'Erro ao enviar mensagem.' });
      }
    } catch {
      setSubmission({ loading: false, success: false, error: true, message: 'Erro de rede.' });
    }
  };

  return (
    <section id="contato" className="py-16 md:py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Vamos Começar seu Projeto?</h2>
        <p className="text-lg text-gray-600 mb-10">
          Preencha o formulário abaixo ou entre em contato pelo WhatsApp.
        </p>
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12 text-left shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Nome</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">Sua Mensagem</label>
              <textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400" />
            </div>
            <div className="text-center">
              <button type="submit" disabled={submission.loading}
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-10 rounded-full text-lg transition-all hover:scale-105 disabled:opacity-50">
                {submission.loading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>
            {submission.message && (
              <p className={`text-center mt-4 ${submission.success ? 'text-green-600' : 'text-red-600'}`}>
                {submission.message}
              </p>
            )}
          </form>

          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="flex-shrink mx-4 text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <div className="text-center">
            <a href="https://wa.link/r35utl" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-10 rounded-full text-lg transition-all hover:scale-105">
              <FaWhatsapp className="w-6 h-6 mr-3" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;