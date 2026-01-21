import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar } from 'lucide-react';
import { Button } from './Button';
import { H3 } from './Typography';
import { SOCIAL_CONFIG } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'options' | 'form' | 'calendly' | 'success'>('options');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('options'); // Reset to options when modal opens
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
      <div className={`relative bg-ink w-full ${step === 'calendly' ? 'max-w-4xl' : 'max-w-lg'} p-6 md:p-8 animate-[fadeIn_0.2s_ease-out]`} style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 2px rgba(229, 9, 20, 0.3)' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-accent transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'options' ? (
          <>
            <div className="mb-8 text-center">
              <H3 className="mb-2">How Would You Like to <span className="text-accent">Connect?</span></H3>
              <p className="text-muted text-sm">Choose the best option to get started</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setStep('calendly')}
                className="w-full bg-accent hover:bg-accentHover text-white p-6 transition-all duration-300 flex items-center justify-between group shadow-elevated hover:shadow-accent-glow-strong"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8" />
                  <div className="text-left">
                    <div className="font-bold text-lg uppercase font-display tracking-wider">Book a Call</div>
                    <div className="text-sm text-white/80">Schedule a consultation instantly</div>
                  </div>
                </div>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </button>

              <button
                onClick={() => setStep('form')}
                className="w-full bg-ink2 hover:bg-bg text-white p-6 transition-all duration-300 flex items-center justify-between group shadow-subtle hover:shadow-accent-glow"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-muted group-hover:text-accent transition-colors" />
                  <div className="text-left">
                    <div className="font-bold text-lg uppercase font-display tracking-wider">Submit Application</div>
                    <div className="text-sm text-muted">Fill out a quick form</div>
                  </div>
                </div>
                <span className="text-2xl text-muted group-hover:text-accent group-hover:translate-x-2 transition-all">→</span>
              </button>
            </div>
          </>
        ) : step === 'calendly' ? (
          <>
            <div className="mb-6">
              <button
                onClick={() => setStep('options')}
                className="text-muted hover:text-accent text-sm flex items-center gap-2 transition-colors"
              >
                ← Back to options
              </button>
            </div>
            <div className="mb-4 text-center">
              <H3 className="mb-2">Book Your <span className="text-accent">Consultation</span></H3>
              <p className="text-muted text-sm">Select a time that works for you</p>
            </div>

            {/* Calendly Embed */}
            <div className="w-full h-[600px] overflow-hidden">
              <iframe
                src={SOCIAL_CONFIG.calendly.url}
                width="100%"
                height="100%"
                frameBorder="0"
                className="bg-white"
              />
            </div>
          </>
        ) : step === 'form' ? (
          <>
            <div className="mb-6">
              <button
                onClick={() => setStep('options')}
                className="text-muted hover:text-accent text-sm flex items-center gap-2 transition-colors"
              >
                ← Back to options
              </button>
            </div>
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
                  className="w-full bg-bg px-4 py-3 text-text outline-none transition-all shadow-inner-subtle focus:shadow-accent-glow"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Email</label>
                <input
                  required
                  type="email"
                  className="w-full bg-bg px-4 py-3 text-text outline-none transition-all shadow-inner-subtle focus:shadow-accent-glow"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Main Struggle</label>
                <select className="w-full bg-bg px-4 py-3 text-text outline-none transition-all appearance-none shadow-inner-subtle focus:shadow-accent-glow">
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