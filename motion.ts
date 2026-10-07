import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => undefined;

  const lenis = new Lenis({
    lerp: 0.075,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  const ticker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  const heroImg = document.querySelector('#intro .hero-media img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: '#intro',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  document.querySelectorAll('.origin-frame img').forEach((img) => {
    const frame = img.closest('.origin-frame');
    if (!frame) return;
    gsap.fromTo(
      img,
      { yPercent: -14, scale: 1.12 },
      {
        yPercent: 12,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 56,
      opacity: 0,
      duration: 1.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  document.querySelectorAll('.origin-frame .origin-copy').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.closest('.origin-frame'),
        start: 'top 55%',
        once: true,
      },
    });
  });

  return () => {
    gsap.ticker.remove(ticker);
    lenis.destroy();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
