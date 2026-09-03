import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CompareSliderProps {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(54);
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    update(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    update(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={ref}
      className={`compare ${className}`}
      data-cursor="hover"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <img src={after} alt={afterAlt} />
      <div className="compare-before" style={{ width: `${pos}%` }}>
        <img src={before} alt={beforeAlt} style={{ width: width ? `${width}px` : '100%', maxWidth: 'none' }} />
      </div>
      <div className="compare-handle" style={{ left: `${pos}%` }} />
      <span className="compare-tag before">Before</span>
      <span className="compare-tag after">After</span>
    </div>
  );
};
