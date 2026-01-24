import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { H3 } from './Typography';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-ink border-2 border-border w-full max-w-lg p-6 md:p-8 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-accent transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'form' ? (
          <>
            <div className="mb-8">
              <H3 className="mb-2">Enter The <span className="text-accent">Barakah Era</span></H3>
              <p className="text-muted text-sm">Fill this out. If you're serious, I'll be in touch.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-bg border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-bg border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Main Struggle</label>
                <select className="w-full bg-bg border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none">
                  <option>Low Energy / Fog</option>
                  <option>Belly Fat</option>
                  <option>Inconsistent Salah & Gym</option>
                  <option>Addiction Recovery</option>
                </select>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-[#2ECC71] mx-auto mb-6" />
            <H3>JazakAllahu Khayran</H3>
            <p className="text-muted mt-4 mb-8">Your application has been received. If you are a fit, my team will reach out within 24 hours.</p>
            <Button onClick={onClose} variant="ghost" className="w-full">Close</Button>
          </div>
        )}
      </div>
    </div>
  );
};