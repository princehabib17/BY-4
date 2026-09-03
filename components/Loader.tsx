import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onDone: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onDone();
      return;
    }

    const start = performance.now();
    const duration = 2000;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setPct(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setOut(true);
        window.setTimeout(onDone, 780);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`loader ${out ? 'is-out' : ''}`} aria-hidden={out}>
      <div className="loader-index">00 — ENTER</div>
      <div className="loader-mark">
        <span>Barakah</span>
        <span>Body</span>
      </div>
      <div className="loader-bar"><i /></div>
      <div className="loader-meta">
        <span>Brother Yusuf Fit</span>
        <span>{String(pct).padStart(2, '0')}</span>
      </div>
    </div>
  );
};
