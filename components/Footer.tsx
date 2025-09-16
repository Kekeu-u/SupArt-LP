import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 dark:bg-slate-950/50 border-t border-slate-300 dark:border-white/10 py-8 px-6">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <a href="#home" className="text-2xl font-bold text-slate-900 dark:text-white mb-4 inline-block">
          Sup<span className="text-violet-500 dark:text-violet-400">Art</span>
        </a>
        <p>Criando landing pages que convertem.</p>
        <p className="mt-4 text-sm">&copy; {currentYear} SupArt. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
