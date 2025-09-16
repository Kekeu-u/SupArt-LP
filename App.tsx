import React, { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

// Inform TypeScript that new global libraries are available
declare var gsap: any;
declare var ScrollTrigger: any;

// Lazy-load components for better performance
const About = lazy(() => import('./components/About'));
const Offer = lazy(() => import('./components/Offer'));
const Process = lazy(() => import('./components/Process'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Pricing = lazy(() => import('./components/Pricing'));
const Faq = lazy(() => import('./components/Faq'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const Loader: React.FC = () => (
    <div className="w-full py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400"></div>
    </div>
);

const App: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections with a staggered effect on their inner elements
    const sections = gsap.utils.toArray('main > section') as HTMLElement[];

    sections.forEach((section) => {
      if (section.id === 'home') return;

      // Select key elements inside the section for a more granular animation
      const headline = section.querySelector('h2');
      const paragraph = section.querySelector('p');
      const content = section.querySelectorAll('.grid, .relative, form, ul');

      const elementsToAnimate = [headline, paragraph, ...Array.from(content)].filter(Boolean);

      gsap.from(elementsToAnimate, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2, // Stagger the animation of each element
      });
    });

  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<Loader />}>
            <About />
            <Offer />
            <Process />
            <Portfolio />
            <Testimonials />
            <Pricing />
            <Faq />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
    </div>
  );
};

export default App;