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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };

    checkDeviceSize(); // Check on initial render

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkDeviceSize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Determine the shrunken state for UI elements
  const isShrunken = isScrolled || isMobile;

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-2 sm:p-4 transition-all duration-300">
      <div className="container mx-auto flex justify-end md:justify-center">
        <div className="flex justify-between items-center bg-slate-900/20 backdrop-blur-lg rounded-full border border-white/10 shadow-lg px-2 sm:px-4 transition-all duration-300"
          style={{
              paddingTop: isShrunken ? '0.5rem' : '1rem',
              paddingBottom: isShrunken ? '0.5rem' : '1rem'
          }}
        >
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-2xl sm:text-3xl font-bold text-white transition-transform duration-300 hover:scale-105 mr-2 sm:mr-4">
            Sup<span className="text-violet-400">Art</span>
          </a>
          
          <nav className={`flex items-center justify-center transition-all duration-300 ${isShrunken ? 'gap-x-1 sm:gap-x-2' : 'gap-x-2 md:gap-x-4'}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center gap-x-2 text-gray-300 hover:text-white transition-all duration-300 rounded-full px-2 py-1 sm:px-3 sm:py-2 hover:bg-white/10"
                title={link.label}
              >
                {link.icon}
                <span className={`origin-left transition-all duration-300 ${!isShrunken ? 'max-w-xs scale-x-100 opacity-100' : 'max-w-0 scale-x-0 opacity-0'} overflow-hidden whitespace-nowrap`}>
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <a 
            href="#contato" 
            onClick={(e) => handleLinkClick(e, '#contato')} 
            className={`bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap ml-2 sm:ml-4 ${isShrunken ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}`}
          >
            Orçamento
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;