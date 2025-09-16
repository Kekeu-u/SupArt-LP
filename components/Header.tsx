import React, { useState, useEffect } from 'react';
import AboutIcon from './icons/AboutIcon';
import ServicesIcon from './icons/ServicesIcon';
import PortfolioIcon from './icons/PortfolioIcon';
import PricingIcon from './icons/PricingIcon';
import FaqIcon from './icons/FaqIcon';

const navLinks = [
  { href: '#sobre', label: 'Sobre', icon: <AboutIcon /> },
  { href: '#servicos', label: 'Serviços', icon: <ServicesIcon /> },
  { href: '#portfolio', label: 'Portfolio', icon: <PortfolioIcon /> },
  { href: '#precos', label: 'Preços', icon: <PricingIcon /> },
  { href: '#faq', label: 'FAQ', icon: <FaqIcon /> },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 flex justify-center">
      <div className="inline-flex justify-between items-center bg-slate-900/40 backdrop-blur-xl rounded-full border border-white/10 shadow-lg px-4 sm:px-6 transition-all duration-300"
        style={{
            paddingTop: isScrolled ? '0.5rem' : '1rem',
            paddingBottom: isScrolled ? '0.5rem' : '1rem'
        }}
      >
          
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-3xl font-bold text-white transition-transform duration-300 hover:scale-105 mr-4 sm:mr-6">
          Sup<span className="text-violet-400">Art</span>
        </a>
        
        <nav className="flex items-center justify-center gap-x-2 sm:gap-x-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="flex items-center gap-x-2 text-gray-300 hover:text-white transition-all duration-300 rounded-full px-3 py-2 hover:bg-white/10"
              title={link.label}
            >
              {link.icon}
              <span className={`origin-left transition-all duration-300 hidden md:inline ${isScrolled ? 'max-w-0 scale-x-0 opacity-0' : 'max-w-xs scale-x-100 opacity-100'} overflow-hidden whitespace-nowrap`}>
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <a 
          href="#contato" 
          onClick={(e) => handleLinkClick(e, '#contato')} 
          className={`bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap ml-4 sm:ml-6 ${isScrolled ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}`}
        >
          Orçamento
        </a>
      </div>
    </header>
  );
};

export default Header;