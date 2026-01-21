import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, IMAGES } from '../constants';
import { Button } from './Button';

interface NavBarProps {
  onApply: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onApply }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-bg/90 backdrop-blur-md border-b border-border h-16 md:h-20 flex items-center">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img 
              src={IMAGES.logoWhite} 
              alt="Brother Yusuf Fit" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-sm font-bold uppercase tracking-widest text-muted hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="ghost" size="sm" onClick={onApply}>
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-bg pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-8 text-center">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-2xl font-display font-bold uppercase text-text hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full" onClick={() => {
              setIsOpen(false);
              onApply();
            }}>
              Start Your Reset
            </Button>
          </div>
        </div>
      )}
    </>
  );
};