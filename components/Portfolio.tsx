import React, { useEffect } from 'react';

// Inform TypeScript that GSAP is available globally
declare var gsap: any;

const PortfolioCard: React.FC<{ imgUrl: string; title: string; category: string }> = ({ imgUrl, title, category }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
        <div className="overflow-hidden">
            <img 
                src={imgUrl} 
                alt={title} 
                className="portfolio-card-img w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                width="800"
                height="600"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
            <p className="text-purple-400">{category}</p>
        </div>
    </div>
);

const portfolioItems = [
    { imgUrl: "https://picsum.photos/seed/tech/800/600", title: "TechFlow", category: "SaaS / Tecnologia" },
    { imgUrl: "https://picsum.photos/seed/realestate/800/600", title: "Imóvel Certo", category: "Imobiliário" },
    { imgUrl: "https://picsum.photos/seed/consulting/800/600", title: "Foco Consultoria", category: "Serviços / Consultoria" },
    { imgUrl: "https://picsum.photos/seed/ecommerce/800/600", title: "Bella Moda", category: "E-commerce" },
    { imgUrl: "https://picsum.photos/seed/fitness/800/600", title: "Corpo em Foco", category: "Fitness / Saúde" },
    { imgUrl: "https://picsum.photos/seed/food/800/600", title: "Sabor Divino", category: "Restaurante / Gourmet" },
];


const Portfolio: React.FC = () => {
  useEffect(() => {
    gsap.utils.toArray('.portfolio-card-img').forEach((img: any) => {
        gsap.to(img, {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
                trigger: img.closest('.group'),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            },
        });
    });
  }, []);
  
  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto text-center px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-pretty">Resultados que Falam por Si</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 text-pretty">
          Confira alguns dos projetos que criamos para clientes de diversos setores.
        </p>
      </div>
      
      <div className="flex flex-col gap-y-8 -rotate-2 scale-105">
        
        {/* Row 1 */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex whitespace-nowrap will-change-transform">
            {[...portfolioItems, ...portfolioItems].map((item, index) => (
              <div key={index} className="w-[300px] sm:w-[400px] mx-4 flex-shrink-0">
                <PortfolioCard {...item} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - reverse */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee-reverse flex whitespace-nowrap will-change-transform">
            {[...portfolioItems.slice().reverse(), ...portfolioItems.slice().reverse()].map((item, index) => (
              <div key={index} className="w-[300px] sm:w-[400px] mx-4 flex-shrink-0">
                <PortfolioCard {...item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;