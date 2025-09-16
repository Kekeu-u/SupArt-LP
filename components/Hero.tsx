import React, { useEffect, useRef } from 'react';

// Inform TypeScript that GSAP and Typed.js are available globally
declare var gsap: any;
declare var Typed: any;

const HeroShapes: React.FC = () => {
    useEffect(() => {
        gsap.to(".hero-shape", {
            duration: 4,
            y: "-=20",
            x: "+=15",
            rotation: "+=30",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.5,
                from: "random"
            }
        });
    }, []);

    return (
        <div className="absolute inset-0 z-0 opacity-50 dark:opacity-100 overflow-hidden">
            <div className="hero-shape absolute top-[10%] left-[10%] w-24 h-24 bg-violet-400/30 dark:bg-violet-500/20 rounded-full blur-xl"></div>
            <div className="hero-shape absolute top-[20%] right-[15%] w-32 h-32 bg-purple-400/30 dark:bg-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="hero-shape absolute bottom-[15%] left-[25%] w-20 h-20 bg-violet-400/30 dark:bg-violet-500/20 transform rotate-45 blur-xl"></div>
            <div className="hero-shape absolute bottom-[20%] right-[20%] w-28 h-28 bg-purple-400/30 dark:bg-purple-500/20 rounded-full blur-xl"></div>
        </div>
    );
}

const Hero: React.FC = () => {
  const typedEl = useRef(null);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-title', { opacity: 0, y: 50, duration: 1 })
      .from('.hero-subtitle', { opacity: 0, y: 40, duration: 0.8 }, '-=0.6')
      .from('.hero-buttons', { opacity: 0, y: 30, duration: 0.6 }, '-=0.5');

    // Typed.js initialization
    if (typedEl.current && typeof Typed !== 'undefined') {
      const typed = new Typed(typedEl.current, {
        strings: ["Pronta em Tempo Recorde."],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true,
        backDelay: 2500,
        startDelay: 1200,
      });
      return () => {
        typed.destroy();
      };
    }
  }, []);


  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 overflow-hidden">
      <HeroShapes />
      <div className="container mx-auto relative z-10">
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-loose mb-4">
          Sua Landing Page de Alta Conversão,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500 min-h-[80px] md:min-h-[100px] inline-block">
            <span ref={typedEl}></span>
          </span>
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Transformamos suas ideias em uma poderosa ferramenta de vendas. Crie uma presença online impactante por um preço imbatível.
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#contato" 
            onClick={handleScrollToContact}
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-500/40 hover:shadow-violet-400/60"
          >
            Quero Minha Landing Page
          </a>
          <a 
            href="#servicos"
            onClick={(e) => {
                e.preventDefault();
                document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 backdrop-blur-sm border border-slate-800/20 dark:border-white/20"
          >
            Ver Detalhes
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
