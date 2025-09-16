import React, { useState, useEffect, useRef } from 'react';
import HomeIcon from './icons/HomeIcon';
import AboutIcon from './icons/AboutIcon';
import ServicesIcon from './icons/ServicesIcon';
import PortfolioIcon from './icons/PortfolioIcon';
import TestimonialsIcon from './icons/TestimonialsIcon';
import PricingIcon from './icons/PricingIcon';
import FaqIcon from './icons/FaqIcon';
import ContactIcon from './icons/ContactIcon';

const navItems = [
  { id: 'home', label: 'Início', icon: <HomeIcon /> },
  { id: 'sobre', label: 'Sobre', icon: <AboutIcon /> },
  { id: 'servicos', label: 'Serviços', icon: <ServicesIcon /> },
  { id: 'portfolio', label: 'Portfolio', icon: <PortfolioIcon /> },
  { id: 'depoimentos', label: 'Depoimentos', icon: <TestimonialsIcon /> },
  { id: 'precos', label: 'Preços', icon: <PricingIcon /> },
  { id: 'faq', label: 'FAQ', icon: <FaqIcon /> },
  { id: 'contato', label: 'Contato', icon: <ContactIcon /> },
];

const ScrollspyNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, navItems.length);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          const offset = window.innerHeight * 0.4;

          if (scrollPosition >= sectionTop - offset && scrollPosition < sectionTop + sectionHeight - offset) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for the "magnet scroll"
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const activeItemIndex = navItems.findIndex(item => item.id === activeSection);
    const activeItemEl = itemRefs.current[activeItemIndex];

    if (activeItemEl) {
      const container = scrollContainerRef.current;
      const targetScrollTop = 
        activeItemEl.offsetTop - 
        container.offsetHeight / 2 + 
        activeItemEl.offsetHeight / 2;
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-50">
      <ul 
        ref={scrollContainerRef} 
        className="flex flex-col items-center justify-start gap-y-1 bg-black/20 backdrop-blur-lg p-2 rounded-full border border-white/10 max-h-[50vh] sm:max-h-[60vh] overflow-y-scroll no-scrollbar"
      >
        {navItems.map((item, index) => (
          // FIX: The ref callback should not return a value. Enclosed assignment in braces to prevent implicit return.
          <li key={item.id} ref={el => { itemRefs.current[index] = el; }} className="group relative">
            <a
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                activeSection === item.id ? 'text-purple-400 scale-110 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label={`Ir para a seção ${item.label}`}
            >
              {item.icon}
            </a>
             <span className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1 bg-black text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ScrollspyNav;