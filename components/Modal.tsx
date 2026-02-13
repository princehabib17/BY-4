import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Square, CheckSquare } from 'lucide-react';
import { Button } from './Button';
import { H3 } from './Typography';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STRUGGLE_OPTIONS = [
  "Low Energy / Fog",
  "Belly Fat",
  "Inconsistent Salah & Gym",
  "Addiction Recovery",
  "All of the above"
];

const INVESTMENT_OPTIONS = [
  "0-500$",
  "500-1000$",
  "1000-5000$"
];

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    struggles: [] as string[],
    investment: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleStruggle = (option: string) => {
    setFormData(prev => {
      const isSelected = prev.struggles.includes(option);
      let newStruggles;

      if (option === 'All of the above') {
        newStruggles = isSelected ? [] : ['All of the above'];
      } else {
        const temp = prev.struggles.filter(s => s !== 'All of the above');
        if (isSelected) {
          newStruggles = temp.filter(s => s !== option);
        } else {
          newStruggles = [...temp, option];
        }
      }
      return { ...prev, struggles: newStruggles };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Construct the email content
    const subject = `New Barakah Body Application: ${formData.name}`;
    const body = `
NEW APPLICATION DETAILS:
------------------------
Name: ${formData.name}
Age: ${formData.age}
Email: ${formData.email}

Investment Level: ${formData.investment}

Main Struggles:
${formData.struggles.map(s => `- ${s}`).join('\n')}

------------------------
Sent from Barakah Body Website
    `.trim();

    // 2. Open User's Email Client
    window.location.href = `mailto:brotheryusuf.fit@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 3. Show Success State in UI
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-ink border-2 border-border w-full max-w-lg p-6 md:p-8 shadow-2xl animate-[fadeIn_0.2s_ease-out] max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-accent transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'form' ? (
          <>
            <div className="mb-8">
              <H3 className="mb-2">Enter The <span className="text-accent">Barakah Era</span></H3>
              <p className="text-muted text-sm">Fill this out. It will open your email client to send the application directly to me.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Age Row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Name</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full bg-bg border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-neutral-700"
                    placeholder="FULL NAME"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Age</label>
                  <input 
                    required
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    type="number" 
                    min="16"
                    max="99"
                    className="w-full bg-bg border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-neutral-700 text-center"
                    placeholder="AGE"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Email</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email" 
                  className="w-full bg-bg border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-neutral-700"
                  placeholder="EMAIL ADDRESS"
                />
              </div>

              {/* Main Struggle - Multi Select */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-3">Main Struggle (Select all that apply)</label>
                <div className="grid grid-cols-1 gap-2">
                  {STRUGGLE_OPTIONS.map((option) => {
                    const isSelected = formData.struggles.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleStruggle(option)}
                        className={`flex items-center gap-3 w-full px-4 py-3 border transition-all text-left group ${
                          isSelected 
                            ? 'bg-accent/10 border-accent text-white' 
                            : 'bg-bg border-border text-muted hover:border-neutral-600'
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-accent shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 shrink-0" />
                        )}
                        <span className="text-sm font-medium uppercase tracking-wide">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Investment */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                  How much are you willing to invest into coaching?
                </label>
                <select 
                  required
                  name="investment"
                  value={formData.investment}
                  onChange={handleInputChange}
                  className="w-full bg-bg border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none uppercase tracking-wide"
                >
                  <option value="" disabled className="text-neutral-500">Select Budget Range</option>
                  {INVESTMENT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
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
            <p className="text-muted mt-4 mb-8">
              Your email client should have opened with your application. 
              <br/>Please hit <strong>Send</strong> to complete the process.
            </p>
            <Button onClick={onClose} variant="ghost" className="w-full">Close</Button>
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};