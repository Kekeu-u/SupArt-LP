import React, { useEffect, useRef } from 'react';
import { ShinyButton } from "@/components/ui/ShinyButton";
import { GlassButton } from "@/components/ui/GlassButton";

// Inform TypeScript that GSAP and Typed.js are available globally
declare var gsap: any;
declare var Typed: any;

const Hero: React.FC = () => {
  const typedEl = useRef(null);

  const handleScrollToContact = (e: React.MouseEvent) => {
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
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 pt-28 md:pt-32 pb-16">
      <div className="container mx-auto relative z-10">
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 text-pretty">
          Sua Landing Page de Alta Conversão,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 min-h-[60px] sm:min-h-[80px] md:min-h-[100px] inline-block">
            <span ref={typedEl}></span>
          </span>
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 text-pretty">
          Transformamos suas ideias em uma poderosa ferramenta de vendas. Crie uma presença online impactante por um preço imbatível.
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
          <ShinyButton
            href="#contato"
            onClick={handleScrollToContact}
          >
            Quero Minha Landing Page
          </ShinyButton>

          <GlassButton
            href="/blog"
          >
            Visitar Blog
          </GlassButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;