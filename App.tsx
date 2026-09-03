import React, { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { NavBar } from './components/NavBar';
import { Modal } from './components/Modal';
import { HomePage } from './HomePage';
import { Grain } from './components/Grain';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { SideIndex } from './components/SideIndex';
import { IMAGES } from './constants';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const onLoaded = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ready]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-white">
      <Grain />
      <Cursor />
      {!ready && <Loader onDone={onLoaded} />}
      <div className={ready ? 'is-ready' : 'opacity-0 pointer-events-none'}>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <SideIndex />

      <NavBar onApply={openModal} />
      <HomePage onApply={openModal} />

      <footer className="relative py-16 border-t border-border bg-ink overflow-hidden">
        <div className="absolute -bottom-10 -right-4 font-display text-[22vw] leading-none text-white/[0.03] pointer-events-none select-none">
          BARAKAH
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <img
              src={IMAGES.logoWhite}
              alt="Brother Yusuf Fit"
              className="h-10 w-auto object-contain mb-6 mix-blend-screen"
            />
            <p className="text-[11px] text-muted font-mono tracking-[0.18em] uppercase">
              © {new Date().getFullYear()} Brother Yusuf Fit
            </p>
          </div>
          <a
            href="mailto:brotheryusuf.fit@gmail.com"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted hover:text-white transition-colors"
          >
            brotheryusuf.fit@gmail.com
          </a>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default App;
