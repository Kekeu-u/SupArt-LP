import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative py-8 px-6 overflow-hidden">
      <div className="container mx-auto text-center text-gray-400">
        <a href="#home" className="text-2xl font-bold text-white mb-4 inline-block">
          Sup<span className="text-glass-art">Art</span>
        </a>
        <p className="mt-4 text-sm">&copy; 2026 SupArt. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;