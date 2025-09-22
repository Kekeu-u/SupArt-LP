import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submission, setSubmission] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmission({ loading: true, success: false, error: false, message: '' });

    const formData = { name, email, message };

    try {
      const response = await fetch('https://formspree.io/f/mvgbnnqa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmission({ loading: false, success: true, error: false, message: 'Mensagem enviada com sucesso!' });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json();
        const errorMessage = data.errors ? data.errors.map((error: any) => error.message).join(', ') : 'Ocorreu um erro ao enviar a mensagem.';
        setSubmission({ loading: false, success: false, error: true, message: errorMessage });
      }
    } catch (error) {
      setSubmission({ loading: false, success: false, error: true, message: 'Erro de rede. Por favor, verifique sua conexão e tente novamente.' });
    }
  };

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-pretty">Vamos Começar seu Projeto?</h2>
        <p className="text-lg text-gray-300 mb-10 text-pretty">
          Preencha o formulário abaixo ou entre em contato pelo WhatsApp. Estamos prontos para transformar sua ideia em realidade.
        </p>
        <div className="bg-white/[.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 text-left">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2">Sua Mensagem</label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={submission.loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submission.loading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>
             {submission.message && (
                <p className={`text-center mt-4 ${submission.success ? 'text-green-400' : 'text-red-400'}`}>
                    {submission.message}
                </p>
            )}
          </form>

          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="flex-shrink mx-4 text-gray-400">ou</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>
          
          <div className="text-center">
            <a
              href="https://wa.link/r35utl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
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