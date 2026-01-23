import React, { useState } from 'react';
import { H2, H3, Accent } from './Typography';
import { Activity, Target, Zap, TrendingDown, Minus, TrendingUp } from 'lucide-react';

const MacroCalculator = () => {
  const [form, setForm] = useState({
    gender: 'male',
    weight: 80,
    height: 175,
    age: 30,
    activity: 1.375,
    goal: 'cut'
  });
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activityLevels = [
    { value: 1.2, label: 'Sedentary', desc: 'Desk job, little exercise' },
    { value: 1.375, label: 'Light', desc: '1-3 days/week' },
    { value: 1.55, label: 'Moderate', desc: '3-5 days/week' },
    { value: 1.725, label: 'Active', desc: '6-7 days/week' },
    { value: 1.9, label: 'Athlete', desc: 'Twice daily training' }
  ];

  const calculate = () => {
    const goalMultipliers = {
      cut: 0.80,
      maintain: 1.0,
      bulk: 1.10
    };

    // BMR (Mifflin-St Jeor)
    let bmr = (10 * form.weight) + (6.25 * form.height) - (5 * form.age);
    bmr += form.gender === 'male' ? 5 : -161;

    // TDEE & Target
    const tdee = Math.round(bmr * form.activity);
    const targetCals = Math.round(tdee * goalMultipliers[form.goal]);

    // Macros (Protein Priority)
    const proteinG = Math.round(form.weight * 2.2);
    const fatG = Math.round(form.weight * 0.9);
    const proteinCals = proteinG * 4;
    const fatCals = fatG * 9;
    const carbG = Math.round((targetCals - proteinCals - fatCals) / 4);

    setResult({
      tdee,
      targetCals,
      protein: proteinG,
      fat: fatG,
      carbs: Math.max(0, carbG)
    });
    setShowResults(true);
  };

  return (
    <section className="bg-ink2 py-32 md:py-40 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">TOOLS</span>
            </div>
            <H2 className="mb-6">
              Calculate Your <Accent>Protocol</Accent>
            </H2>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Get your personalized macro targets based on the Barakah Body Framework.
            </p>
          </div>

          <div className="bg-bg shadow-deep rounded-sm overflow-hidden border-t-2 border-accent">
            {/* Form */}
            <div className="p-8 md:p-12">
              {/* Gender Selection */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-white mb-4 uppercase tracking-wider">Gender</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setForm({...form, gender: 'male'})}
                    className={`p-4 rounded-sm border-2 transition-all duration-300 ${
                      form.gender === 'male'
                        ? 'border-accent bg-accent/10 shadow-accent-glow'
                        : 'border-border hover:border-accent/50 shadow-subtle'
                    }`}
                  >
                    <span className={`font-bold uppercase tracking-wider ${form.gender === 'male' ? 'text-accent' : 'text-muted'}`}>
                      Male
                    </span>
                  </button>
                  <button
                    onClick={() => setForm({...form, gender: 'female'})}
                    className={`p-4 rounded-sm border-2 transition-all duration-300 ${
                      form.gender === 'female'
                        ? 'border-accent bg-accent/10 shadow-accent-glow'
                        : 'border-border hover:border-accent/50 shadow-subtle'
                    }`}
                  >
                    <span className={`font-bold uppercase tracking-wider ${form.gender === 'female' ? 'text-accent' : 'text-muted'}`}>
                      Female
                    </span>
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Age</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => setForm({...form, age: Number(e.target.value)})}
                      className="w-full bg-ink border-2 border-border focus:border-accent text-white text-2xl font-bold p-4 rounded-sm transition-all duration-300 focus:outline-none focus:shadow-accent-glow"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm font-bold">YRS</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Weight</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.weight}
                      onChange={(e) => setForm({...form, weight: Number(e.target.value)})}
                      className="w-full bg-ink border-2 border-border focus:border-accent text-white text-2xl font-bold p-4 rounded-sm transition-all duration-300 focus:outline-none focus:shadow-accent-glow"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm font-bold">KG</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Height</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.height}
                      onChange={(e) => setForm({...form, height: Number(e.target.value)})}
                      className="w-full bg-ink border-2 border-border focus:border-accent text-white text-2xl font-bold p-4 rounded-sm transition-all duration-300 focus:outline-none focus:shadow-accent-glow"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm font-bold">CM</span>
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-white mb-4 uppercase tracking-wider">Activity Level</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {activityLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setForm({...form, activity: level.value})}
                      className={`p-4 rounded-sm border-2 transition-all duration-300 text-left ${
                        form.activity === level.value
                          ? 'border-accent bg-accent/10 shadow-accent-glow'
                          : 'border-border hover:border-accent/50 shadow-subtle'
                      }`}
                    >
                      <div className={`text-xs font-bold uppercase mb-1 ${form.activity === level.value ? 'text-accent' : 'text-muted'}`}>
                        {level.label}
                      </div>
                      <div className="text-[10px] text-muted leading-tight">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Selection */}
              <div className="mb-10">
                <label className="block text-sm font-bold text-white mb-4 uppercase tracking-wider">Goal</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setForm({...form, goal: 'cut'})}
                    className={`p-6 rounded-sm border-2 transition-all duration-300 ${
                      form.goal === 'cut'
                        ? 'border-accent bg-accent/10 shadow-accent-glow'
                        : 'border-border hover:border-accent/50 shadow-subtle'
                    }`}
                  >
                    <TrendingDown className={`w-6 h-6 mx-auto mb-2 ${form.goal === 'cut' ? 'text-accent' : 'text-muted'}`} />
                    <div className={`text-sm font-bold uppercase tracking-wider ${form.goal === 'cut' ? 'text-accent' : 'text-muted'}`}>
                      Cut
                    </div>
                    <div className="text-xs text-muted mt-1">Lose Fat</div>
                  </button>

                  <button
                    onClick={() => setForm({...form, goal: 'maintain'})}
                    className={`p-6 rounded-sm border-2 transition-all duration-300 ${
                      form.goal === 'maintain'
                        ? 'border-accent bg-accent/10 shadow-accent-glow'
                        : 'border-border hover:border-accent/50 shadow-subtle'
                    }`}
                  >
                    <Minus className={`w-6 h-6 mx-auto mb-2 ${form.goal === 'maintain' ? 'text-accent' : 'text-muted'}`} />
                    <div className={`text-sm font-bold uppercase tracking-wider ${form.goal === 'maintain' ? 'text-accent' : 'text-muted'}`}>
                      Maintain
                    </div>
                    <div className="text-xs text-muted mt-1">Stay Lean</div>
                  </button>

                  <button
                    onClick={() => setForm({...form, goal: 'bulk'})}
                    className={`p-6 rounded-sm border-2 transition-all duration-300 ${
                      form.goal === 'bulk'
                        ? 'border-accent bg-accent/10 shadow-accent-glow'
                        : 'border-border hover:border-accent/50 shadow-subtle'
                    }`}
                  >
                    <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${form.goal === 'bulk' ? 'text-accent' : 'text-muted'}`} />
                    <div className={`text-sm font-bold uppercase tracking-wider ${form.goal === 'bulk' ? 'text-accent' : 'text-muted'}`}>
                      Bulk
                    </div>
                    <div className="text-xs text-muted mt-1">Build Mass</div>
                  </button>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="w-full bg-accent hover:bg-accentHover text-white font-display text-xl uppercase tracking-wider py-5 rounded-sm shadow-elevated hover:shadow-accent-glow-strong transition-all duration-300 active:scale-[0.98]"
              >
                Calculate Protocol
              </button>
            </div>

            {/* Results */}
            {showResults && result && (
              <div className="border-t-2 border-border bg-ink p-8 md:p-12 animate-fade-in">
                {/* Main Calorie Target */}
                <div className="text-center mb-12 pb-12 border-b border-border">
                  <div className="mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted">Daily Target</span>
                  </div>
                  <div className="font-display text-6xl md:text-8xl text-white mb-2 tracking-tight">
                    {result.targetCals.toLocaleString()}
                  </div>
                  <div className="text-accent text-xl font-bold uppercase tracking-wider">Calories</div>
                  <div className="mt-4 text-sm text-muted">
                    TDEE: {result.tdee.toLocaleString()} cal
                  </div>
                </div>

                {/* Macro Breakdown */}
                <div className="space-y-6">
                  {/* Protein */}
                  <div className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-accent" />
                        <span className="font-bold text-white uppercase tracking-wider">Protein</span>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-3xl text-white">{result.protein}</div>
                        <div className="text-xs text-muted uppercase">grams</div>
                      </div>
                    </div>
                    <div className="h-3 bg-bg rounded-full overflow-hidden shadow-inner-subtle">
                      <div className="h-full bg-accent shadow-accent-glow transition-all duration-700" style={{width: '100%'}} />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-white" />
                        <span className="font-bold text-white uppercase tracking-wider">Carbs</span>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-3xl text-white">{result.carbs}</div>
                        <div className="text-xs text-muted uppercase">grams</div>
                      </div>
                    </div>
                    <div className="h-3 bg-bg rounded-full overflow-hidden shadow-inner-subtle">
                      <div className="h-full bg-white shadow-elevated transition-all duration-700" style={{width: `${Math.min((result.carbs / result.protein) * 100, 100)}%`}} />
                    </div>
                  </div>

                  {/* Fats */}
                  <div className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-muted" />
                        <span className="font-bold text-white uppercase tracking-wider">Fats</span>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-3xl text-white">{result.fat}</div>
                        <div className="text-xs text-muted uppercase">grams</div>
                      </div>
                    </div>
                    <div className="h-3 bg-bg rounded-full overflow-hidden shadow-inner-subtle">
                      <div className="h-full bg-muted shadow-subtle transition-all duration-700" style={{width: `${(result.fat / result.protein) * 100}%`}} />
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-10 p-6 bg-bg border-2 border-accent/20 rounded-sm">
                  <p className="text-sm text-muted text-center leading-relaxed">
                    <span className="text-accent font-bold">Protein priority approach:</span> 2.2g per kg body weight to preserve muscle during fat loss or support growth during bulking.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default MacroCalculator;
