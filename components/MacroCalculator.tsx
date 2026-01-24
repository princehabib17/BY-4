import React, { useState } from 'react';
import { Flame, Target, Dumbbell, Activity, TrendingDown, Zap } from 'lucide-react';
import { H2, Body } from './Typography';

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
  <div className="relative group">
    <div className="flex items-baseline justify-between mb-5">
      <span className="text-base font-bold text-white uppercase tracking-wide">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-black text-white tracking-tight">{value}</span>
        <span className="text-xl font-black text-accent uppercase tracking-wide">{unit}</span>
      </div>
    </div>
    
    <div className="relative h-4 mb-3">
      {/* Track Background */}
      <div className="absolute inset-0 bg-neutral-900 rounded-full overflow-hidden">
        {/* Active Track */}
        <div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-accent to-accentHover rounded-full transition-all duration-200"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"/>
        </div>
      </div>
      
      {/* Slider Input */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
      />
      
      {/* Thumb */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-[0_0_30px_rgba(220,38,38,0.8)] border-4 border-accent pointer-events-none transition-all duration-200 group-hover:scale-125"
        style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 14px)` }}
      />
    </div>
    
    {/* Min/Max Labels */}
    <div className="flex justify-between text-xs font-bold text-neutral-500">
      <span>{min}</span>
      <span>{max}</span>
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
  
  const [result, setResult] = useState<MacroResult | null>(null);

  const calculate = () => {
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

    setResult({
      calories: targetCals,
      protein: { g: proteinG, pct: Math.round((proteinCals / targetCals) * 100) },
      fat: { g: fatG, pct: Math.round((fatCals / targetCals) * 100) },
      carbs: { g: carbG, pct: Math.round(((carbG * 4) / targetCals) * 100) }
    });
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-black via-ink to-black text-white py-16 md:py-24 lg:py-32 px-4 flex items-center justify-center relative overflow-hidden border-t border-border">
      
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse"/>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}/>
      
      <div className="w-full max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-[0.3em]">Precision Nutrition</span>
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <H2 className="mb-3 text-white">
            MACRO CALCULATOR
          </H2>
          <Body className="text-neutral-400 font-medium">Advanced macronutrient optimization</Body>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT: INPUT PANEL */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-[32px] blur-xl"/>
            <div className="relative bg-ink/80 backdrop-blur-2xl border border-border/50 rounded-[32px] p-8 shadow-2xl">
              
              {/* Goal Cards */}
              <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-wide mb-5">Choose Your Goal</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'cut', label: 'Fat Loss', icon: Flame },
                    { id: 'maintain', label: 'Maintain', icon: Target },
                    { id: 'bulk', label: 'Muscle', icon: Dumbbell }
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setForm({...form, goal: g.id})}
                      className={`relative group overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
                        form.goal === g.id
                          ? 'bg-gradient-to-br from-accent to-accentHover shadow-[0_0_40px_rgba(229,9,20,0.3)] scale-[1.02]'
                          : 'bg-neutral-900/50 hover:bg-neutral-900 border border-border'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                      <div className="relative flex items-center gap-6">
                        <g.icon className={`w-8 h-8 ${
                          form.goal === g.id ? 'text-white' : 'text-neutral-600'
                        }`} />
                        <div className={`text-lg font-bold uppercase tracking-wide ${
                          form.goal === g.id ? 'text-white' : 'text-neutral-500'
                        }`}>
                          {g.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-8"/>

              {/* Gender Toggle */}
              <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-wide mb-5">Gender</h3>
                <div className="relative bg-neutral-900/50 p-1.5 rounded-2xl border border-border">
                  <div 
                    className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-accent to-accentHover rounded-xl transition-all duration-500 shadow-lg"
                    style={{ left: form.gender === 'male' ? '6px' : 'calc(50% + 2px)' }}
                  />
                  {['male', 'female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setForm({...form, gender: g})}
                      className={`relative z-10 w-1/2 py-4 text-base font-black uppercase tracking-wider rounded-xl transition-colors ${
                        form.gender === g ? 'text-white' : 'text-neutral-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-8"/>

              {/* Sliders */}
              <div className="space-y-8 mb-8">
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

              <div className="h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-8"/>

              {/* Activity Selector */}
              <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-wide mb-5">Activity Level</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Sedentary', sublabel: 'Desk job, minimal movement' },
                    { label: 'Light', sublabel: 'Exercise 1-3 times per week' },
                    { label: 'Moderate', sublabel: 'Exercise 3-5 times per week' },
                    { label: 'Very Active', sublabel: 'Exercise 6-7 times per week' }
                  ].map((level, idx) => (
                    <button
                      key={idx}
                      onClick={() => setForm({...form, activityIndex: idx})}
                      className={`relative w-full group overflow-hidden rounded-xl p-5 text-left transition-all duration-300 ${
                        form.activityIndex === idx
                          ? 'bg-gradient-to-r from-accent to-accentHover shadow-[0_0_20px_rgba(229,9,20,0.2)]'
                          : 'bg-neutral-900/50 hover:bg-neutral-900 border border-border'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                      <div className="relative flex items-center justify-between">
                        <div>
                          <div className={`text-base font-bold tracking-wide mb-1 ${
                            form.activityIndex === idx ? 'text-white' : 'text-neutral-300'
                          }`}>
                            {level.label}
                          </div>
                          <div className={`text-xs font-medium ${
                            form.activityIndex === idx ? 'text-red-200' : 'text-neutral-600'
                          }`}>
                            {level.sublabel}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(idx + 1)].map((_, i) => (
                            <div key={i} className={`w-2 h-6 rounded-full ${
                              form.activityIndex === idx ? 'bg-white/50' : 'bg-neutral-700'
                            }`}/>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accentHover hover:from-accentHover hover:to-red-700 py-6 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-accent/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>
                <span className="relative text-lg font-black uppercase tracking-[0.15em] text-white flex items-center justify-center gap-3">
                  Calculate Macros
                  <Activity className="w-5 h-5" />
                </span>
              </button>

            </div>
          </div>

          {/* RIGHT: RESULTS PANEL */}
          <div className={`relative transition-all duration-700 ${result ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            {result && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-[32px] blur-xl"/>
                <div className="relative bg-ink/80 backdrop-blur-2xl border border-border/50 rounded-[32px] p-8 shadow-2xl">
                  
                  {/* Calorie Hero */}
                  <div className="text-center mb-10 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 bg-accent/20 rounded-full blur-[80px] animate-pulse"/>
                    </div>
                    <div className="relative">
                      <div className="text-sm font-bold text-neutral-400 uppercase tracking-[0.3em] mb-3">
                        Daily Target
                      </div>
                      <div className="inline-flex items-baseline gap-3 mb-2">
                        <span className="text-7xl md:text-8xl font-black tracking-[-0.04em] text-white">
                          {result.calories.toLocaleString()}
                        </span>
                        <span className="text-2xl font-black text-accent tracking-wider mb-4">KCAL</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/50 border border-neutral-800/50">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"/>
                        <span className="text-sm font-bold text-neutral-300">
                          {form.goal === 'cut' ? 'Fat Loss' : form.goal === 'bulk' ? 'Muscle Gain' : 'Maintenance'} Protocol
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-8"/>

                  {/* Macro Breakdown */}
                  <div className="space-y-5">
                    {[
                      { label: 'PROTEIN', data: result.protein, color: 'from-accent to-accentHover', icon: TrendingDown },
                      { label: 'CARBS', data: result.carbs, color: 'from-neutral-700 to-neutral-800', icon: Zap },
                      { label: 'FATS', data: result.fat, color: 'from-neutral-600 to-neutral-700', icon: Flame }
                    ].map((macro, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"/>
                        <div className="relative bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-6 transition-all duration-300 group-hover:border-neutral-700/50">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <macro.icon className="w-8 h-8 text-accent" />
                              <div>
                                <div className="text-2xl font-black text-white tracking-tight">{macro.label}</div>
                                <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider">
                                  {macro.data.pct}% of intake
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-5xl font-black text-white tracking-tight">
                                {macro.data.g}
                              </div>
                              <div className="text-base font-bold text-neutral-500 uppercase">grams</div>
                            </div>
                          </div>
                          
                          <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${macro.color} rounded-full transition-all duration-1000 ease-out`}
                              style={{ 
                                width: `${macro.data.pct}%`,
                                animationDelay: `${idx * 150}ms`
                              }}
                            />
                            {idx === 0 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"/>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-neutral-900/50">
                    <p className="text-xs text-neutral-500 text-center leading-relaxed tracking-wide">
                      Based on Mifflin-St Jeor BMR • 2.2g protein/kg • Optimized for your goals
                    </p>
                  </div>

                </div>
              </>
            )}
          </div>

        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};