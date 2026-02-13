import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Modal } from './components/Modal';
import { HomePage } from './HomePage';
import { IMAGES } from './constants';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-white">
      <NavBar onApply={openModal} />
      
      <HomePage onApply={openModal} />

      <footer className="py-12 border-t border-border bg-ink">
        <div className="container mx-auto px-4 md:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="mb-4 flex justify-center md:justify-start">
              <img 
                src={IMAGES.logoWhite} 
                alt="Brother Yusuf Fit" 
                className="h-10 w-auto object-contain" 
              />
            </div>
            <p className="text-xs text-muted font-mono">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-xs font-mono uppercase tracking-widest text-muted">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Email</a>
          </div>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;