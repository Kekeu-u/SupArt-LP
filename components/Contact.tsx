import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [submission, setSubmission] = useState({ loading: false, success: false, error: false, message: '' });

  /**
   * Envia os dados do formulário para a API centralizada do Dashboard CRM
   */
  const enviarLeadParaDashboard = async () => {
    const endpoint = 'https://dash.supart.com.br/api/external/lead-ingest';
    const apiKey = process.env.NEXT_PUBLIC_LEAD_API_KEY;

    if (!apiKey) {
      console.error('API Key não configurada no .env do site');
      throw new Error('Erro interno de configuração. Tente novamente mais tarde.');
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        nome,
        email,
        telefone,
        mensagem,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao processar envio.');
    }

    console.log('Lead integrado com sucesso:', data.lead_id);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmission({ loading: true, success: false, error: false, message: '' });

    try {
      await enviarLeadParaDashboard();
      setSubmission({
        loading: false,
        success: true,
        error: false,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      });
      // Limpa o formulário após sucesso
      setNome('');
      setEmail('');
      setTelefone('');
      setMensagem('');
    } catch (error) {
      console.error('Falha na integração com Dashboard:', error);
      setSubmission({
        loading: false,
        success: false,
        error: true,
        message: error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente.'
      });
    }
  };

  return (
    <section id="contato" className="py-16 md:py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Vamos Começar seu Projeto?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Preencha o formulário abaixo ou entre em contato pelo WhatsApp.
        </p>
        <div className="bg-gray-50 dark:bg-white/5 dark:backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-8 md:p-12 text-left shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nome" className="block text-gray-700 dark:text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Seu nome completo"
                  className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="telefone" className="block text-gray-700 dark:text-gray-300 mb-2">Telefone</label>
              <input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-purple-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="mensagem" className="block text-gray-700 dark:text-gray-300 mb-2">Sua Mensagem</label>
              <textarea
                id="mensagem"
                rows={5}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
                placeholder="Conte-nos sobre seu projeto..."
                className="w-full bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-purple-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={submission.loading}
                className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3 px-10 rounded-full text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submission.loading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>
            {submission.message && (
              <p className={`text-center mt-4 font-medium ${submission.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {submission.message}
              </p>
            )}
          </form>

          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-white/20" />
            <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-500">ou</span>
            <div className="flex-grow border-t border-gray-300 dark:border-white/20" />
          </div>

          <div className="text-center">
            <a
              href="https://wa.link/r35utl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-10 rounded-full text-lg transition-all hover:scale-105"
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