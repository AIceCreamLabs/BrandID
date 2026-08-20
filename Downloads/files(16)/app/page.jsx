'use client';

import { useEffect } from 'react';
import Hero from '../components/Hero';

export default function Home() {
  useEffect(() => {
    let lenis;

    async function initLenis() {
      const { default: Lenis } = await import('@studio-freight/lenis');
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // Tell ScrollTrigger to use Lenis's scroll value
      lenis.on('scroll', ScrollTrigger.update);

      // Drive GSAP's ticker with Lenis, not requestAnimationFrame directly
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();
    }

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <main style={{ background: '#080808', minHeight: '100vh' }}>
      <Hero />
    </main>
  );
}
