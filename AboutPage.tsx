import React, { useState, useEffect, useRef } from 'react';
import { Button } from './components/Button';
import { Display, H2, Accent } from './components/Typography';
import { IMAGES } from './constants';
import { Activity, Moon, Shield } from 'lucide-react';

const CHAPTERS = [
  {
    id: 1,
    title: "The Abyss",
    subtitle: "Ex-Addict",
    text: "I was buried under layers of vice. My body was soft, my mind was clouded, and my soul was starving. I chased temporary highs to escape the permanent low of my reality. I looked in the mirror and saw a stranger.",
    image: IMAGES.action2, // Gritty gym shot representing the struggle
    icon: Activity,
    color: "from-gray-900 to-black"
  },
  {
    id: 2,
    title: "The Awakening",
    subtitle: "Finding Islam",
    text: "The dunya broke me so the Deen could build me. I fell into Sujood not out of piety, but out of desperation. In that silence, I found the noise stopped. I realized my body wasn't mine to trash—it was an Amanah to protect.",
    image: IMAGES.prayer, // Prayer image
    icon: Moon,
    color: "from-emerald-900/40 to-black"
  },
  {
    id: 3,
    title: "The Vessel",
    subtitle: "The Weapon",
    text: "Fitness became my form of gratitude. Every rep became a tasbih. I didn't just build muscle; I built a vessel capable of serving my family, my community, and my Creator. Now, I forge other men in this same fire.",
    image: IMAGES.hero, // Hero physique
    icon: Shield,
    color: "from-accent/20 to-black"
  }
];

interface AboutPageProps {
  onApply: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onApply }) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveChapter(index);
          }
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" } 
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  return (
     <main className="bg-bg">
        {/* Intro Header */}
        <section className="pt-32 pb-12 px-6 container mx-auto text-center border-b border-border/50">
            <Display className="mb-4">The <Accent>Origin</Accent></Display>
            <p className="text-muted font-mono uppercase tracking-widest text-xs md:text-sm">
              Darkness to Light. Weakness to Strength.
            </p>
        </section>

        {/* DESKTOP LAYOUT: Sticky Split Screen */}
        <div className="hidden lg:block relative border-b border-border">
           <div className="container mx-auto max-w-7xl grid grid-cols-2 gap-16 px-8">
              {/* Sticky Left Side (Images) */}
              <div className="sticky top-24 h-[calc(100vh-6rem)] w-full py-12">
                 <div className="relative w-full h-full rounded-sm overflow-hidden border-2 border-border bg-ink shadow-2xl">
                    {CHAPTERS.map((chapter, index) => (
                       <div 
                         key={chapter.id}
                         className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                           activeChapter === index ? 'opacity-100 scale-100' : 
                           'opacity-0 scale-110'
                         }`}
                       >
                          {/* Image */}
                          <img 
                            src={chapter.image} 
                            alt={chapter.title} 
                            className={`w-full h-full object-cover transition-all duration-1000 ${index === 0 ? 'grayscale contrast-125' : ''}`} 
                          />
                          {/* Overlay Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-t ${chapter.color} opacity-90`} />
                          
                          {/* Floating Badge */}
                          <div className="absolute top-8 left-8 bg-black/80 backdrop-blur border border-white/10 px-4 py-3 flex items-center gap-3 shadow-xl">
                             <chapter.icon className="w-5 h-5 text-accent" />
                             <span className="font-mono text-xs uppercase tracking-widest text-white">{chapter.subtitle}</span>
                          </div>
                       </div>
                    ))}
                    
                    {/* Progress Indicator */}
                    <div className="absolute bottom-8 left-8 flex gap-2">
                       {CHAPTERS.map((_, i) => (
                         <div key={i} className={`h-1 transition-all duration-300 ${activeChapter === i ? 'w-12 bg-accent' : 'w-4 bg-white/20'}`} />
                       ))}
                    </div>
                 </div>
              </div>

              {/* Scrolling Right Side (Text) */}
              <div className="py-12">
                 {CHAPTERS.map((chapter, index) => (
                    <div 
                      key={chapter.id}
                      ref={el => { observerRefs.current[index] = el }}
                      className={`min-h-[80vh] flex flex-col justify-center p-8 transition-all duration-700 ${
                        activeChapter === index 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-20 translate-x-4 grayscale'
                      }`}
                    >
                       <div className="text-accent font-display text-9xl opacity-[0.05] -mb-10 select-none -ml-4">0{chapter.id}</div>
                       <H2 className="relative z-10">{chapter.title}</H2>
                       <div className="w-12 h-1 bg-accent mb-8"></div>
                       <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
                         {chapter.text}
                       </p>
                    </div>
                 ))}
                 
                 <div className="h-[40vh] flex items-center justify-start pl-8">
                    <div className="space-y-6">
                      <H2>Your Turn.</H2>
                      <Button onClick={onApply} size="lg" withIcon className="animate-pulse">Start Your Chapter 04</Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* MOBILE LAYOUT: Cinematic Stacking Cards */}
        <div className="lg:hidden pb-20">
           {CHAPTERS.map((chapter, index) => (
              <div key={chapter.id} className="relative h-screen sticky top-0 flex items-end border-b-4 border-black">
                 {/* Background Image */}
                 <div className="absolute inset-0 z-0">
                    <img 
                      src={chapter.image} 
                      alt={chapter.title} 
                      className={`w-full h-full object-cover object-center ${index === 0 ? 'grayscale contrast-125' : ''}`} 
                    />
                    {/* Aggressive Gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent opacity-100" />
                 </div>

                 {/* Content */}
                 <div className="relative z-10 w-full p-6 pb-32 flex flex-col items-start">
                    <div className="bg-accent text-white text-xs font-bold px-3 py-1 mb-4 flex items-center gap-2 uppercase tracking-widest shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                       <chapter.icon className="w-3 h-3" />
                       <span>Chapter 0{chapter.id}</span>
                    </div>
                    
                    <H2 className="text-4xl md:text-5xl mb-4 drop-shadow-xl">{chapter.title}</H2>
                    <p className="text-gray-200 text-lg leading-relaxed drop-shadow-md border-l-2 border-accent pl-4">
                       {chapter.text}
                    </p>
                 </div>
              </div>
           ))}
           
           <div className="bg-ink py-24 px-6 text-center relative z-20">
              <H2>Write The Next <br/><span className="text-accent">Chapter</span></H2>
              <Button onClick={onApply} size="lg" className="w-full mt-8">Apply Now</Button>
           </div>
        </div>
     </main>
  );
};