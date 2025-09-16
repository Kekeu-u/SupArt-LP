import React, { useState, useEffect } from 'react';

// Icons
import AboutIcon from './icons/AboutIcon';
import ServicesIcon from './icons/ServicesIcon';
import PortfolioIcon from './icons/PortfolioIcon';
import PricingIcon from './icons/PricingIcon';
import FaqIcon from './icons/FaqIcon';
import HomeIcon from './icons/HomeIcon';
import ContactIcon from './icons/ContactIcon';

// Nav Links Data
const desktopNavLinks = [
  { href: '#sobre', label: 'Sobre', icon: <AboutIcon /> },
  { href: '#servicos', label: 'Serviços', icon: <ServicesIcon /> },
  { href: '#portfolio', label: 'Portfolio', icon: <PortfolioIcon /> },
  { href: '#precos', label: 'Preços', icon: <PricingIcon /> },
  { href: '#faq', label: 'FAQ', icon: <FaqIcon /> },
];

const mobileNavLinks = [
  { href: '#home', label: 'Início', icon: <HomeIcon className="h-6 w-6" /> },
  { href: '#servicos', label: 'Serviços', icon: <ServicesIcon className="h-6 w-6" /> },
  { href: '#portfolio', label: 'Portfolio', icon: <PortfolioIcon className="h-6 w-6" /> },
  { href: '#precos', label: 'Preços', icon: <PricingIcon className="h-6 w-6" /> },
  { href: '#contato', label: 'Contato', icon: <ContactIcon className="h-6 w-6" /> },
];

const allSectionIds = ['home', 'sobre', 'servicos', 'portfolio', 'depoimentos', 'precos', 'faq', 'contato'];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const checkDeviceSize = () => setIsMobile(window.innerWidth < 768);
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy logic for mobile
  useEffect(() => {
    if (!isMobile) return;
    const handleScrollSpy = () => {
      let currentSection = 'home';
      for (const id of allSectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const offset = window.innerHeight * 0.5; // 50% of viewport height
          if (window.scrollY >= sectionTop - offset && window.scrollY < sectionTop + sectionHeight - offset) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isMobile]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    setActiveSection(targetId);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Mobile: Top logo + Bottom Navigation
  if (isMobile) {
    return (
        <>
            <div className={`fixed top-0 left-0 w-full z-40 flex justify-center p-4 transition-all duration-500 ease-in-out ${isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                 <a 
                  href="#home" 
                  onClick={(e) => handleLinkClick(e, '#home')} 
                  className="text-3xl font-bold text-white transition-transform duration-300 hover:scale-105"
                  aria-label="Voltar para o topo"
                >
                  Sup<span className="text-glass-art">Art</span>
                </a>
            </div>
            <nav className="fixed bottom-4 left-0 w-full z-50 flex justify-center px-4">
                <ul className="flex justify-around items-center gap-x-1 p-1.5 bg-black/20 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl shadow-purple-500/10">
                    {mobileNavLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`flex flex-col items-center justify-center text-center w-14 h-14 p-1 rounded-full transition-all duration-300 transform hover:scale-105 ${activeSection === link.href.substring(1) ? 'text-purple-400 bg-white/10 scale-105' : 'text-gray-400 hover:text-white'}`}
                                aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                                aria-label={link.label}
                            >
                                {link.icon}
                                <span className="text-xs mt-1 truncate">{link.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
  }

  // Desktop: Top logo + Centered Navigation
  const isIconOnly = isScrolled;
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-y-3">
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')} 
              className={`text-3xl font-bold text-white transition-all duration-500 ease-in-out hover:scale-105 ${isScrolled ? 'opacity-0 scale-95 h-0 invisible' : 'opacity-100 scale-100 h-auto visible'}`}
              aria-label="Voltar para o topo"
            >
              Sup<span className="text-glass-art">Art</span>
            </a>
          
            <div className={`flex justify-center items-center bg-black/20 backdrop-blur-lg rounded-full border border-white/10 shadow-lg px-4 transition-all duration-300 ${isIconOnly ? 'py-2' : 'py-4'}`}>
                <nav className={`flex items-center justify-center transition-all duration-300 ${isIconOnly ? 'gap-x-2' : 'gap-x-4'}`}>
                    {desktopNavLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="flex items-center gap-x-2 text-gray-300 hover:text-white transition-all duration-300 rounded-full px-3 py-2 hover:bg-white/10"
                        title={link.label}
                        aria-label={link.label}
                      >
                        {link.icon}
                        <span className={`origin-left transition-all duration-300 ${!isIconOnly ? 'max-w-xs scale-x-100 opacity-100' : 'max-w-0 scale-x-0 opacity-0'} overflow-hidden whitespace-nowrap`}>
                          {link.label}
                        </span>
                      </a>
                    ))}
                </nav>

                <a 
                    href="#contato" 
                    onClick={(e) => handleLinkClick(e, '#contato')} 
                    className={`bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap ml-4 ${isIconOnly ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-base'}`}
                >
                    Orçamento
                </a>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;