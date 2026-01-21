import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  label?: string;
  darker?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = '', label, darker = false }) => {
  return (
    <section id={id} className={`relative py-16 md:py-24 lg:py-32 border-b-2 border-border ${darker ? 'bg-ink' : 'bg-bg'} ${className}`}>
      {label && (
        <div className="absolute top-0 left-4 md:left-8 -translate-y-1/2 bg-bg px-2 border-2 border-border text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted">
          {label}
        </div>
      )}
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        {children}
      </div>
    </section>
  );
};