import React, { useEffect, useState } from 'react';

const ITEMS = [
  { id: 'intro', label: '01' },
  { id: 'proof', label: '02' },
  { id: 'about', label: '03' },
  { id: 'method', label: '04' },
  { id: 'pricing', label: '05' },
];

export const SideIndex: React.FC = () => {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const els = ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: '-20% 0px -40% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="side-index" aria-label="Sections">
      {ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={active === item.id ? 'is-active' : ''}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};
