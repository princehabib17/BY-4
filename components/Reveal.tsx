import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, className = '' }) => {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
};
