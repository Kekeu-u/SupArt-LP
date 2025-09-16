import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative py-8 px-6 overflow-hidden">
      <div className="container mx-auto text-center text-gray-400">
        <a href="#home" className="text-2xl font-bold text-white mb-4 inline-block">
          Sup<span className="text-purple-400">Art</span>
        </a>
        <p>Criando landing pages que convertem.</p>
        <p className="mt-4 text-sm">&copy; {currentYear} SupArt. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;