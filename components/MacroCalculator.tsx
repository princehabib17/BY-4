import React, { useState } from 'react';

// ICONS (Using basic SVGs for this example - replace with your premium icon set)
const Icons = {
  Male: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Female: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7a4 4 0 110-8 4 4 0 010 8zm0 0a4 4 0 010 8c0 0 0 1-2-4 2 4 0 10-4 2 4 0 010-4zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Activity: [
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>, // Sedentary
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>, // Light
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>, // Moderate
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>  // Athlete
  ]
};

const MacroCalculator = () => {
  // --- STATE ---
  const [form, setForm] = useState({
    gender: 'male', weight: 80, height: 175, age: 30, activityIndex: 1, goal: 'cut'
  });
  const [result, setResult] = useState(null);

  // --- THE CUTTING EDGE LOGIC ---
  const calculate = () => {
    // Multipliers for the slider positions [Sedentary, Light, Mod, Heavy]
    const activityMults = [1.2, 1.375, 1.55, 1.75];
    const goalMults = { cut: 0.80, maintain: 1.0, bulk: 1.10 };

    // 1. BMR (Mifflin-St Jeor)
    let bmr = (10 * form.weight) + (6.25 * form.height) - (5 * form.age);
    bmr += form.gender === 'male' ? 5 : -161;

    // 2. TDEE & Target Calories
    const tdee = bmr * activityMults[form.activityIndex];
    const targetCals = Math.round(tdee * goalMults[form.goal]);

    // 3. The Protocol Split (Protein Priority)
    const proteinG = Math.round(form.weight * 2.0); // 2g per kg anchor
    const fatG = Math.round(form.weight * 0.9);     // 0.9g per kg floor

    const proteinCals = proteinG * 4;
    const fatCals = fatG * 9;
    const remainingCals = Math.max(0, targetCals - (proteinCals + fatCals));
    const carbG = Math.round(remainingCals / 4);

    setResult({ cals: targetCals, p: proteinG, f: fatG, c: carbG });
  };

  // --- HELPER COMPONENTS ---
  const InputField = ({ label, value, onChange, type = "number", suffix }) => (
    <div className="flex-1 min-w-[80px]">
      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">{label}</label>
      <div className="relative bg-[#111111] border border-gray-800 focus-within:border-red-600 transition-colors rounded-md overflow-hidden">
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent text-white p-3 text-lg font-bold focus:outline-none"
        />
        {suffix && <span className="absolute right-3 top-3 text-gray-500 text-sm font-bold">{suffix}</span>}
      </div>
    </div>
  );

  const ToggleBtn = ({ options, active, onToggle }) => (
    <div className="flex bg-[#111111] p-1 rounded-md border border-gray-800">
      {options.map(opt => (
        <button
          key={opt.val} onClick={() => onToggle(opt.val)}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-all ${active === opt.val ? 'bg-[#E60000] text-white' : 'text-gray-500 hover:text-white'}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <section className="bg-black py-12 px-4 md:px-0">
      <div className="max-w-md mx-auto bg-[#0A0A0A] border-t-4 border-[#E60000] shadow-2xl shadow-red-900/20 rounded-xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 pb-2">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            PROTOCOL <span className="text-[#E60000]">CALCULATOR</span>
          </h2>
        </div>

        {/* INPUTS */}
        <div className="p-6 space-y-6">
          {/* Gender Toggle */}
          <ToggleBtn
            active={form.gender} onToggle={v => setForm({...form, gender: v})}
            options={[{val:'male', label:'MALE'}, {val:'female', label:'FEMALE'}]}
          />

          {/* Vitals Row */}
          <div className="flex space-x-4">
            <InputField label="Age" value={form.age} onChange={v => setForm({...form, age: Number(v)})} />
            <InputField label="Height" suffix="CM" value={form.height} onChange={v => setForm({...form, height: Number(v)})} />
            <InputField label="Weight" suffix="KG" value={form.weight} onChange={v => setForm({...form, weight: Number(v)})} />
          </div>

          {/* Activity Engine Slider */}
          <div>
            <label className="block text-xs text-gray-400 mb-3 uppercase tracking-wider">Daily Engine Load</label>
            <input
              type="range" min="0" max="3" step="1" value={form.activityIndex}
              onChange={e => setForm({...form, activityIndex: Number(e.target.value)})}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#E60000]"
            />
             <div className="flex justify-between mt-2 text-[#E60000]">
                {Icons.Activity.map((icon, i) => (
                  <div key={i} className={`transition-all ${form.activityIndex === i ? 'opacity-100 scale-110' : 'opacity-40'}`}>{icon}</div>
                ))}
            </div>
          </div>

          {/* Goal Toggle */}
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Mission Objective</label>
            <ToggleBtn
              active={form.goal} onToggle={v => setForm({...form, goal: v})}
              options={[{val:'cut', label:'CUT'}, {val:'maintain', label:'MAINTAIN'}, {val:'bulk', label:'BULK'}]}
            />
          </div>

           {/* ACTION BUTTON */}
          <button
            onClick={calculate}
            className="w-full bg-[#E60000] hover:bg-red-700 text-white text-xl font-black uppercase py-4 rounded-md transition-transform active:scale-95 tracking-widest italic"
          >
            CALCULATE PROTOCOL
          </button>
        </div>

        {/* RESULTS SECTION (Reveals on calculation) */}
        {result && (
          <div className="bg-[#111111] p-6 border-t border-gray-800 animate-pulse-once">
            <div className="text-center mb-6">
               <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">DAILY FUEL TARGET</h3>
               <div className="text-5xl font-black text-white italic">{result.cals.toLocaleString()} <span className="text-[#E60000] text-2xl">KCAL</span></div>
            </div>

            <div className="space-y-4">
              {/* Protein Bar */}
              <div>
                <div className="flex justify-between text-sm font-bold text-white mb-1"><span>PROTEIN</span> <span>{result.p}g</span></div>
                <div className="h-4 bg-gray-800 rounded-sm overflow-hidden"><div className="h-full bg-[#E60000] w-full"></div></div>
              </div>
               {/* Fat Bar */}
               <div>
                <div className="flex justify-between text-sm font-bold text-white mb-1"><span>FATS</span> <span>{result.f}g</span></div>
                <div className="h-4 bg-gray-800 rounded-sm overflow-hidden"><div className="h-full bg-white w-[30%]"></div></div>
              </div>
               {/* Carbs Bar */}
               <div>
                <div className="flex justify-between text-sm font-bold text-white mb-1"><span>CARBS</span> <span>{result.c}g</span></div>
                <div className="h-4 bg-gray-800 rounded-sm overflow-hidden relative">
                   <div className="absolute inset-0 border-2 border-[#E60000] rounded-sm"></div>
                   <div className="h-full bg-[#E60000] opacity-20 w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MacroCalculator;
