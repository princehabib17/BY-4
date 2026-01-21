import React from 'react';

export const Display: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h1 className={`font-display text-5xl md:text-7xl font-bold uppercase tracking-wider leading-[1.1] ${className}`} style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>
    {children}
  </h1>
);

export const H2: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h2 className={`font-display text-3xl md:text-5xl font-bold uppercase tracking-wider mb-6 leading-[1.2] ${className}`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
    {children}
  </h2>
);

export const H3: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h3 className={`font-sans text-xl md:text-2xl font-bold tracking-wide uppercase mb-3 leading-[1.3] ${className}`} style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
    {children}
  </h3>
);

export const Lead: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <p className={`font-sans text-lg md:text-xl text-muted leading-[1.8] tracking-wide ${className}`}>
    {children}
  </p>
);

export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-accent bg-gradient-to-r from-accent to-red-600 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(229, 9, 20, 0.5)' }}>
    {children}
  </span>
);