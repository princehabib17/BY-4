import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  darker?: boolean;
}

// Removed 'label' prop from interface and rendering logic
export const Section: React.FC<SectionProps> = ({ children, id, className = '', darker = false }) => {
  return (
    <section id={id} className={`relative py-16 md:py-24 lg:py-32 border-b-2 border-border ${darker ? 'bg-ink' : 'bg-bg'} ${className}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        {children}
      </div>
    </section>
  );
};