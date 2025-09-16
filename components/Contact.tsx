import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send to an API
    console.log({ name, email, message });
    setStatus('Mensagem enviada com sucesso! (Simulação)');
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section id="contato" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-4">Vamos Começar seu Projeto?</h2>
        <p className="text-lg text-gray-300 mb-10">
          Preencha o formulário abaixo ou entre em contato pelo WhatsApp. Estamos prontos para transformar sua ideia em realidade.
        </p>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 text-left">
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
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
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                Enviar Mensagem
              </button>
            </div>
            {status && <p className="text-center mt-4 text-green-400">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;