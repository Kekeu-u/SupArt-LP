import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'home', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'precos', label: 'Preços' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contato', label: 'Contato' },
];

const ScrollspyNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          // A bit of offset makes the active state trigger more naturally
          const offset = window.innerHeight * 0.4;

          if (scrollPosition >= sectionTop - offset && scrollPosition < sectionTop + sectionHeight - offset) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active section on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-50">
      <ul className="flex flex-col items-center justify-center gap-y-2 bg-slate-900/20 backdrop-blur-lg p-2 rounded-full border border-white/10">
        {navItems.map(item => (
          <li key={item.id} className="group relative">
            <a
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item.id ? 'bg-violet-400 scale-125' : 'bg-gray-500 hover:bg-white'
              }`}
              aria-label={`Ir para a seção ${item.label}`}
            >
            </a>
             <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 bg-slate-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ScrollspyNav;
