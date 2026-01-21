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
  const baseStyles = "inline-flex items-center justify-center uppercase font-bold tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-accent text-white hover:bg-accentHover shadow-elevated hover:shadow-accent-glow-strong",
    ghost: "bg-transparent text-text shadow-subtle hover:shadow-accent-glow hover:text-accent",
    outline: "bg-transparent text-text shadow-subtle hover:bg-ink2 hover:shadow-elevated"
  };

  const sizes = {
    sm: "h-10 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
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