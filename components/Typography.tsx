import React from 'react';

export const Display: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h1 className={`font-display text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9] ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h2 className={`font-display text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h3 className={`font-sans text-xl md:text-2xl font-bold tracking-tight uppercase mb-3 ${className}`}>
    {children}
  </h3>
);

export const Lead: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <p className={`font-sans text-lg md:text-xl text-muted leading-relaxed tracking-wide ${className}`}>
    {children}
  </p>
);

export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-accent">{children}</span>
);