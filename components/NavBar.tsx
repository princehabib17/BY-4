import React, { useState, useEffect } from 'react';
import { IMAGES } from '../constants';
import { Button } from './Button';

interface NavBarProps {
  onApply: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onApply }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-bg/95 backdrop-blur-md border-border py-2' : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <img 
            src={IMAGES.logoWhite} 
            alt="Brother Yusuf Fit" 
            className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" 
          />
        </a>

        {/* Sticky CTA - No Menu */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={onApply} 
            size="md"
            variant="primary"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </nav>
  );
};