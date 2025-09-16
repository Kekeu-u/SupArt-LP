import React, { useState, useEffect } from 'react';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#precos', label: 'Preços' },
  { href: '#faq', label: 'FAQ' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleLinkClick(e, link.href)}
          className="text-gray-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 text-lg md:text-base py-2"
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4">
      <div className="relative w-full max-w-5xl mx-auto">
        {/* The glass menu container */}
        <div className="flex justify-between items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/10 shadow-lg px-4 sm:px-6 py-2">
          
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-3xl font-bold text-slate-900 dark:text-white">
            Sup<span className="text-violet-500 dark:text-violet-400">Art</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            <NavItems />
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <button onClick={handleThemeToggle} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="#contato" onClick={(e) => handleLinkClick(e, '#contato')} className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
              Peça um Orçamento
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
             <button onClick={handleThemeToggle} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-white focus:outline-none p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800/60">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      
        {/* Mobile Menu Dropdown */}
        <div 
           className={`
            md:hidden absolute top-full left-0 w-full mt-3 transition-all duration-300 ease-in-out transform
            ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}
          `}
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <NavItems />
              <a href="#contato" onClick={(e) => handleLinkClick(e, '#contato')} className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Peça um Orçamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;