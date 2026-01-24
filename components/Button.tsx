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
  // Base styles: Unified to the "Hero" aesthetic
  // Added shadow-accent/20 and hover effects to everything by default
  const baseStyles = "inline-flex items-center justify-center uppercase font-bold tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    // Primary is now the "Hero" style
    primary: "bg-accent text-white hover:bg-accentHover shadow-[0_4px_14px_0_rgba(229,9,20,0.39)] hover:shadow-[0_6px_20px_rgba(229,9,20,0.23)] hover:-translate-y-0.5 animate-[pulse_4s_infinite]",
    // Ghost variant updated to be more aggressive but transparent
    ghost: "bg-transparent text-white border-2 border-accent/50 hover:bg-accent hover:border-accent shadow-[0_0_15px_rgba(229,9,20,0.1)] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)]",
    // Outline kept simple for secondary actions if needed, but styling closer to primary
    outline: "bg-transparent text-white border-2 border-white/20 hover:border-white hover:bg-white/5"
  };

  const sizes = {
    sm: "h-10 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-10 text-base md:text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {withIcon && <ArrowRight className="ml-2 w-5 h-5" />}
    </button>
  );
};