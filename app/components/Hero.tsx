'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  useEffect(() => {
    // Hero title animation
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#200A24] to-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="hero-title font-serif text-6xl md:text-8xl font-bold text-brown-primary mb-8">
          CLEF Music
        </h1>
        
      </div>
    </section>
  );
}
