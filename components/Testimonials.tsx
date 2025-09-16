import React, { useEffect, useRef } from 'react';

// Inform TypeScript that Swiper is available globally
declare var Swiper: any;

const testimonialsData = [
  {
    quote: "A velocidade de entrega da SupArt é surreal. Nossa landing page ficou pronta em 3 dias e o resultado superou todas as expectativas. As vendas aumentaram 30%!",
    name: "João Silva",
    company: "CEO, TechInova",
    avatarUrl: "https://picsum.photos/seed/person1/200"
  },
  {
    quote: "Estava com um orçamento apertado e precisava de um resultado profissional. A SupArt foi a escolha perfeita. Design incrível e um ótimo custo-benefício.",
    name: "Maria Oliveira",
    company: "Fundadora, Doce Encanto",
    avatarUrl: "https://picsum.photos/seed/person2/200"
  },
  {
    quote: "O processo foi muito simples e a equipe é extremamente atenciosa. Eles realmente entendem de conversão. Recomendo fortemente a todos que precisam de uma LP de qualidade.",
    name: "Carlos Pereira",
    company: "Diretor de Marketing, Veloce Log",
    avatarUrl: "https://picsum.photos/seed/person3/200"
  },
   {
    quote: "Fiquei impressionado com a qualidade do código e a performance da página. Além de bonita, é extremamente rápida. Um trabalho de primeira linha!",
    name: "Ana Costa",
    company: "CTO, Digital Solutions",
    avatarUrl: "https://picsum.photos/seed/person4/200"
  }
];

const TestimonialCard: React.FC<{ quote: string; name: string; company: string; avatarUrl: string }> = ({ quote, name, company, avatarUrl }) => (
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center h-full flex flex-col justify-between">
        <p className="text-gray-300 italic mb-6 text-pretty">"{quote}"</p>
        <div>
            <img 
                src={avatarUrl} 
                alt={name} 
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-violet-400"
                loading="lazy"
                width="200"
                height="200"
            />
            <h4 className="font-bold text-lg text-white">{name}</h4>
            <p className="text-violet-400">{company}</p>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (!swiperRef.current || typeof Swiper === 'undefined') return;

        const swiper = new Swiper(swiperRef.current, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 50 },
            },
        });

        return () => {
            swiper.destroy(true, true);
        };
    }, []);

  return (
    <section id="depoimentos" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-pretty">O que Nossos Clientes Dizem</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 text-pretty">
          A satisfação de quem confia em nosso trabalho é a nossa maior recompensa.
        </p>
        <div className="swiper" ref={swiperRef}>
            <div className="swiper-wrapper py-12">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="swiper-slide">
                        <TestimonialCard {...testimonial} />
                    </div>
                ))}
            </div>
            <div className="swiper-pagination !relative mt-8"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;