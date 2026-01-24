import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Display: React.FC<TextProps> = ({ children, className = '' }) => (
  <h1 className={`font-display text-5xl md:text-8xl lg:text-[9rem] font-bold uppercase tracking-tighter leading-[0.85] ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<TextProps> = ({ children, className = '' }) => (
  <h2 className={`font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1] mb-6 ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<TextProps> = ({ children, className = '' }) => (
  <h3 className={`font-display text-2xl md:text-3xl font-bold uppercase tracking-tight leading-none mb-4 ${className}`}>
    {children}
  </h3>
);

export const Label: React.FC<TextProps> = ({ children, className = '' }) => (
  <span className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-muted ${className}`}>
    {children}
  </span>
);

export const Lead: React.FC<TextProps> = ({ children, className = '' }) => (
  <p className={`font-sans text-lg md:text-2xl text-muted leading-relaxed tracking-tight ${className}`}>
    {children}
  </p>
);

export const Body: React.FC<TextProps> = ({ children, className = '' }) => (
  <p className={`font-sans text-base md:text-lg text-muted leading-relaxed ${className}`}>
    {children}
  </p>
);

export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-accent">{children}</span>
);
