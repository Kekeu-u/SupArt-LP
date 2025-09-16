import React from 'react';

const PortfolioCard: React.FC<{ imgUrl: string; title: string; category: string }> = ({ imgUrl, title, category }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
            <p className="text-violet-400">{category}</p>
        </div>
    </div>
);

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 px-6 bg-white/5">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Resultados que Falam por Si</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
          Confira alguns dos projetos que criamos para clientes de diversos setores.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
            <PortfolioCard imgUrl="https://picsum.photos/seed/tech/800/600" title="TechFlow" category="SaaS / Tecnologia" />
            <PortfolioCard imgUrl="https://picsum.photos/seed/realestate/800/600" title="Imóvel Certo" category="Imobiliário" />
            <PortfolioCard imgUrl="https://picsum.photos/seed/consulting/800/600" title="Foco Consultoria" category="Serviços / Consultoria" />
            <PortfolioCard imgUrl="https://picsum.photos/seed/ecommerce/800/600" title="Bella Moda" category="E-commerce" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
