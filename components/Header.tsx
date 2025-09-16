import React, { useState, useEffect } from 'react';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#precos', label: 'Preços' },
  { href: '#faq', label: 'FAQ' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          className="text-gray-300 hover:text-white transition-colors duration-300 text-lg md:text-base py-2"
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-slate-950/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-3xl font-bold text-white">
          Sup<span className="text-violet-400">Art</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <NavItems />
        </nav>
        
        <a href="#contato" onClick={(e) => handleLinkClick(e, '#contato')} className="hidden md:inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
          Peça um Orçamento
        </a>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-slate-950/95 backdrop-blur-xl absolute top-full left-0 w-full`}>
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <NavItems />
          <a href="#contato" onClick={(e) => handleLinkClick(e, '#contato')} className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Peça um Orçamento
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;