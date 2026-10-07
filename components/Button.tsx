import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  withIcon = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center uppercase font-bold tracking-[0.16em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    primary:
      "btn-primary bg-accent text-white hover:bg-accentHover shadow-[0_8px_28px_-8px_rgba(229,9,20,0.7)] hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-white border border-accent/50 hover:bg-accent hover:border-accent",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5",
  };

  const sizes = {
    sm: "h-10 px-4 text-[11px]",
    md: "h-12 px-6 text-xs",
    lg: "h-14 px-10 text-sm md:text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {withIcon && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};
