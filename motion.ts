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

  const heroPanel = document.querySelector('#intro .hero-media');
  if (heroPanel) {
    gsap.fromTo(
      heroPanel,
      { clipPath: 'inset(0 0 0 100%)' },
      { clipPath: 'inset(0 0 0 0%)', duration: 1.45, ease: 'power4.inOut', delay: 0.04 }
    );
    const img = heroPanel.querySelector('img');
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 10,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#intro',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  }

  const tickerEl = document.querySelector('.ticker-track');
  if (tickerEl) {
    gsap.to(tickerEl, {
      xPercent: -33.333,
      ease: 'none',
      duration: 28,
      repeat: -1,
    });
  }

  const stage = document.querySelector('.origin-stage');
  const stills = gsap.utils.toArray<HTMLElement>('.origin-still');
  const copies = gsap.utils.toArray<HTMLElement>('.origin-copy');
  const dots = gsap.utils.toArray<HTMLElement>('.origin-dot');

  if (stage && stills.length > 1) {
    stills.forEach((el, i) => {
      if (i === 0) {
        gsap.set(el, { clipPath: 'inset(0 0 0 0%)' });
      } else {
        gsap.set(el, { clipPath: 'inset(0 0 0 100%)' });
      }
    });
    copies.forEach((el, i) => {
      gsap.set(el, {
        autoAlpha: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 28,
        pointerEvents: i === 0 ? 'auto' : 'none',
      });
    });
    dots.forEach((el, i) => {
      gsap.set(el, { backgroundColor: i === 0 ? '#e50914' : 'rgba(255,255,255,0.2)', width: i === 0 ? 56 : 40 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
      },
    });

    stills.forEach((el, i) => {
      if (i === 0) return;
      tl.to(el, { clipPath: 'inset(0 0 0 0%)', duration: 1.2, ease: 'none' });
      tl.to(
        copies[i - 1],
        { autoAlpha: 0, y: -18, pointerEvents: 'none', duration: 0.22, ease: 'none' },
        '<'
      );
      tl.to(
        copies[i],
        { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.28, ease: 'none' },
        '>'
      );
      if (dots[i - 1]) {
        tl.to(dots[i - 1], { backgroundColor: 'rgba(255,255,255,0.2)', width: 40, duration: 0.3 }, '<');
      }
      if (dots[i]) {
        tl.to(dots[i], { backgroundColor: '#e50914', width: 56, duration: 0.3 }, '<');
      }
    });
    tl.to({}, { duration: 0.45 });
  }

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 72,
      opacity: 0,
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
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
