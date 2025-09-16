

import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Offer from './components/Offer';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Inform TypeScript that new global libraries are available
declare var gsap: any;
declare var ScrollTrigger: any;
declare var particlesJS: any;

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Particles.js background
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: '#4f46e5' },
          shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 }, image: { src: 'img/github.svg', width: 100, height: 100 } },
          opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
          size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
          line_linked: { enable: true, distance: 150, color: '#3730a3', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    }

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
    <div className="relative min-h-screen w-full text-white overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <About />
          <Offer />
          <Process />
          <Portfolio />
          <Testimonials />
          <Pricing />
          <Faq />
          <Contact />
        </main>
        <Footer />
    </div>
  );
};

export default App;
