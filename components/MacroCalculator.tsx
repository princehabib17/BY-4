import React, { useMemo, useState } from 'react';
import { Flame, Target, Dumbbell, Zap, Check, Lock } from 'lucide-react';
import { Button } from './Button';
import { H2, H3, Label, Body } from './Typography';
import { Reveal } from './Reveal';

interface MacroForm {
  goal: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  activityIndex: number;
}

interface MacroResult {
  calories: number;
  protein: { g: number; pct: number };
  fat: { g: number; pct: number };
  carbs: { g: number; pct: number };
}

interface SliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  unit: string;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange, min, max, unit }) => (
  <div className="w-full">
    <div className="flex items-end justify-between mb-2">
      <Label>{label}</Label>
      <div className="font-display text-2xl text-white leading-none">
        {value}<span className="text-accent text-sm ml-1 font-mono">{unit}</span>
      </div>
    </div>

    <div className="relative h-6 flex items-center group">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
      />
      <div className="w-full h-1 bg-ink2 border border-border relative">
         <div
            className="absolute left-0 top-0 bottom-0 bg-accent transition-all duration-100"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
         />
      </div>
      <div
        className="absolute h-4 w-4 bg-white border-2 border-accent z-10 pointer-events-none transition-all duration-100 group-hover:scale-125"
        style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 8px)` }}
      />
    </div>
  </div>
);

export const MacroCalculator: React.FC = () => {
  const [form, setForm] = useState<MacroForm>({
    goal: 'cut',
    gender: 'male',
    age: 30,
    height: 175,
    weight: 80,
    activityIndex: 1
  });

  const [email, setEmail] = useState('');
  const [showGate, setShowGate] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const result: MacroResult = useMemo(() => {
    const goalMults: Record<string, number> = { cut: 0.80, maintain: 1.0, bulk: 1.10 };
    const activityMults = [1.2, 1.375, 1.55, 1.725];

    let bmr = (10 * form.weight) + (6.25 * form.height) - (5 * form.age);
    bmr += form.gender === 'male' ? 5 : -161;

    const tdee = bmr * activityMults[form.activityIndex];
    const targetCals = Math.round(tdee * goalMults[form.goal]);

    const proteinG = Math.round(form.weight * 2.2);
    const fatG = Math.round(form.weight * 0.9);
    const proteinCals = proteinG * 4;
    const fatCals = fatG * 9;
    const remainingCals = Math.max(0, targetCals - (proteinCals + fatCals));
    const carbG = Math.round(remainingCals / 4);

    return {
      calories: targetCals,
      protein: { g: proteinG, pct: Math.round((proteinCals / targetCals) * 100) },
      fat: { g: fatG, pct: Math.round((fatCals / targetCals) * 100) },
      carbs: { g: carbG, pct: Math.round(((carbG * 4) / targetCals) * 100) }
    };
  }, [form]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const subject = "Macro Calculator Lead";
    const body = `
NEW MACRO LEAD:
---------------
Email: ${email}
Goal: ${form.goal}
Gender: ${form.gender}
Stats: ${form.age}yo, ${form.height}cm, ${form.weight}kg
Activity Level: ${form.activityIndex}

CALCULATED RESULTS:
Calories: ${result.calories}
Protein: ${result.protein.g}g
Fat: ${result.fat.g}g
Carbs: ${result.carbs.g}g
---------------
    `.trim();

    window.location.href = `mailto:brotheryusuf.fit@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setUnlocked(true);
    setShowGate(false);
  };

  return (
    <section id="calc" className="py-24 bg-ink border-t border-border relative overflow-hidden">
      {showGate && !unlocked && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-ink/90 backdrop-blur-sm">
          <div className="bg-bg border border-border p-8 w-full max-w-md shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <div className="text-center mb-6">
              <Lock className="w-8 h-8 text-accent mx-auto mb-4" />
              <H3>Unlock Results</H3>
              <Body className="text-sm">Email unlocks your split. It opens a mail draft to me.</Body>
            </div>
            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-ink border border-border px-4 py-3 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none font-sans placeholder:text-neutral-700"
              />
              <Button type="submit" className="w-full">Reveal</Button>
            </form>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        <Reveal className="text-center mb-16">
          <H2>Macro <span className="text-accent">Calculator</span></H2>
          <Body className="max-w-xl mx-auto">Enter your email to unlock your split.</Body>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

           <div className="space-y-10">

              <div>
                <Label className="mb-4 block">1. Select Goal</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cut', label: 'Fat Loss', icon: Flame },
                    { id: 'maintain', label: 'Maintain', icon: Target },
                    { id: 'bulk', label: 'Muscle', icon: Dumbbell }
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setForm({...form, goal: g.id})}
                      className={`flex flex-col items-center justify-center p-4 border transition-all duration-300 ${
                        form.goal === g.id
                          ? 'bg-accent border-accent text-white'
                          : 'bg-bg border-border text-muted hover:border-neutral-600'
                      }`}
                    >
                      <g.icon className="w-6 h-6 mb-2" />
                      <span className="font-display uppercase text-sm">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                 <Label className="mb-4 block">2. Gender</Label>
                 <div className="flex border border-border">
                    {['male', 'female'].map(g => (
                       <button
                         key={g}
                         onClick={() => setForm({...form, gender: g})}
                         className={`flex-1 py-3 font-display uppercase text-sm tracking-wider transition-all ${
                            form.gender === g
                             ? 'bg-white text-black'
                             : 'bg-bg text-muted hover:text-white'
                         }`}
                       >
                         {g}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-6 bg-bg p-6 border border-border">
                 <Slider
                  label="Age"
                  value={form.age}
                  onChange={(v) => setForm({...form, age: v})}
                  min={16}
                  max={80}
                  unit="yr"
                />
                <Slider
                  label="Height"
                  value={form.height}
                  onChange={(v) => setForm({...form, height: v})}
                  min={140}
                  max={220}
                  unit="cm"
                />
                <Slider
                  label="Weight"
                  value={form.weight}
                  onChange={(v) => setForm({...form, weight: v})}
                  min={40}
                  max={180}
                  unit="kg"
                />
              </div>

              <div>
                <Label className="mb-4 block">3. Activity Level</Label>
                <div className="space-y-2">
                  {[
                    { label: 'Sedentary', sublabel: 'Desk job, minimal movement' },
                    { label: 'Light Active', sublabel: 'Exercise 1-3x / week' },
                    { label: 'Active', sublabel: 'Exercise 3-5x / week' },
                    { label: 'Very Active', sublabel: 'Exercise 6-7x / week' }
                  ].map((level, idx) => (
                    <button
                      key={idx}
                      onClick={() => setForm({...form, activityIndex: idx})}
                      className={`w-full text-left p-4 border transition-all flex items-center justify-between group ${
                        form.activityIndex === idx
                          ? 'border-accent bg-accent/5'
                          : 'border-border bg-bg hover:border-neutral-600'
                      }`}
                    >
                       <div>
                          <div className={`font-display uppercase text-sm ${form.activityIndex === idx ? 'text-accent' : 'text-white'}`}>
                            {level.label}
                          </div>
                          <div className="text-xs text-muted font-sans">{level.sublabel}</div>
                       </div>
                       {form.activityIndex === idx && <Check className="w-5 h-5 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>

              {!unlocked && (
                <Button onClick={() => setShowGate(true)} className="w-full" size="lg" withIcon>
                  Unlock Macros
                </Button>
              )}
           </div>

           <div className="relative lg:sticky lg:top-24 self-start">
              <div className={`h-full border border-border bg-bg p-8 flex flex-col justify-center ${!unlocked ? 'blur-sm opacity-50 pointer-events-none select-none' : ''}`}>
                    <div>
                       <div className="text-center mb-10 pb-10 border-b border-border">
                          <Label className="mb-2 block">Daily Target</Label>
                          <div className="font-display text-8xl font-bold text-white leading-none tabular-nums">
                             {unlocked ? result.calories : '— — —'}
                          </div>
                          <div className="font-mono text-accent text-xl mt-2">KCAL</div>
                       </div>

                       <div className="space-y-6">
                          {[
                            { label: 'Protein', val: result.protein, icon: Dumbbell },
                            { label: 'Carbs', val: result.carbs, icon: Zap },
                            { label: 'Fats', val: result.fat, icon: Flame }
                          ].map((m, i) => (
                             <div key={i} className="group">
                                <div className="flex justify-between items-end mb-2">
                                   <div className="flex items-center gap-3">
                                      <m.icon className="w-5 h-5 text-accent" />
                                      <span className="font-display uppercase text-xl">{m.label}</span>
                                   </div>
                                   <div className="text-right">
                                      <span className="font-display text-2xl tabular-nums">{unlocked ? `${m.val.g}g` : '— g'}</span>
                                      <span className="font-mono text-muted text-xs ml-2">({unlocked ? `${m.val.pct}%` : '—'})</span>
                                   </div>
                                </div>
                                <div className="h-px w-full bg-ink2 relative overflow-hidden">
                                   <i
                                      className="absolute top-0 left-0 bottom-0 h-full bg-accent"
                                      style={{ width: unlocked ? `${m.val.pct}%` : '0%' }}
                                   />
                                </div>
                             </div>
                          ))}
                       </div>

                       <div className="mt-10 pt-6 border-t border-border text-center">
                          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
                             Mifflin-St Jeor · {unlocked ? 'unlocked' : 'locked'}
                          </p>
                       </div>
                    </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};
