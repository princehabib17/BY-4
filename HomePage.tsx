import React, { useState, useEffect, useRef } from 'react';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Display, H2, H3, Lead, Accent } from './components/Typography';
import { IMAGES, PILLARS, TRANSFORMATIONS, CASE_STUDY } from './constants';
import { CheckCircle, Activity, Target, Clock, Star, ArrowRight, Moon, Shield } from 'lucide-react';

interface HomePageProps {
  onApply: () => void;
}

const CHAPTERS = [
  {
    id: 1,
    title: "The Abyss",
    subtitle: "Ex-Addict",
    text: "I was buried under layers of vice. My body was soft, my mind was clouded, and my soul was starving. I chased temporary highs to escape the permanent low of my reality. I looked in the mirror and saw a stranger.",
    image: IMAGES.storyAbyss,
    icon: Activity,
    color: "from-gray-900 to-black"
  },
  {
    id: 2,
    title: "The Awakening",
    subtitle: "Finding Islam",
    text: "The dunya broke me so the Deen could build me. I fell into Sujood not out of piety, but out of desperation. In that silence, I found the noise stopped. I realized my body wasn't mine to trash—it was an Amanah to protect.",
    image: IMAGES.storyAwakening, 
    icon: Moon,
    color: "from-emerald-900/40 to-black"
  },
  {
    id: 3,
    title: "The Vessel",
    subtitle: "The Weapon",
    text: "Fitness became my form of gratitude. Every rep became a tasbih. I didn't just build muscle; I built a vessel capable of serving my family, my community, and my Creator. Now, I forge other men in this same fire.",
    image: IMAGES.storyVessel, 
    icon: Shield,
    color: "from-accent/20 to-black"
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onApply }) => {
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
    <main>
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-end pb-12 md:pb-24 overflow-hidden bg-bg">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
           <img 
             src={IMAGES.hero} 
             alt="Brother Yusuf Fit" 
             className="w-full h-full object-cover object-[50%_35%]" 
           />
           {/* Gradient reduced: Dark only at the bottom for text, transparent top for face visibility */}
           <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <Display className="mb-4 drop-shadow-lg">
              You’re winning on paper but losing your <Accent>body</Accent> and <Accent>energy</Accent>.
            </Display>
            <Lead className="mb-8 text-white/90 font-medium max-w-xl drop-shadow-md">
              You sit with your family, quietly questioning the example you’re setting for your children.
            </Lead>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onApply} 
                size="lg" 
                className="bg-accent hover:bg-accentHover text-white shadow-lg shadow-accent/20 animate-[pulse_3s_infinite]"
              >
                Enter the barakah era
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM / AGITATION */}
      <Section darker>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <H2>The <Accent>Fog</Accent> Is Real</H2>
            <p className="text-xl text-muted mb-6">
              You are successful in your career. You provide for your family. But when you look in the mirror, you don't see a leader. You see potential wasted.
            </p>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 border-2 border-accent/20 z-0" />
             <img src={IMAGES.coachPortrait} alt="The struggle" className="relative z-10 w-full h-[400px] object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
      </Section>

      {/* THE ORIGIN / ABOUT SECTION */}
      <section id="about" className="relative bg-bg">
          {/* Header */}
          <div className="py-16 md:py-20 text-center border-b border-border/50">
              <Display>The <Accent>Origin</Accent></Display>
              <p className="text-muted font-mono uppercase tracking-widest text-xs md:text-sm mt-4">
                Darkness to Light. Weakness to Strength.
              </p>
          </div>

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
          <div className="lg:hidden pb-0">
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
          </div>
      </section>

      {/* THE FRAMEWORK */}
      <Section id="method" label="The Method">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <H2>The <Accent>Barakah</Accent> System</H2>
          <Lead>
            We don't just train bodies. We build vessels for worship. This is fitness for the Akhirah-minded man.
          </Lead>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon === 'Activity' ? Activity : pillar.icon === 'Target' ? Target : Clock;
            return (
              <div key={idx} className="bg-ink p-8 border border-border hover:border-accent transition-colors group">
                <Icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                <H3>{pillar.title}</H3>
                <p className="text-muted leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* FEATURED CASE STUDY */}
      <Section darker label="Case Study" className="border-t-2 border-accent/10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block bg-accent/10 text-accent px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 border border-accent/20">
              Featured Client
            </div>
            <H2 className="mb-8">12 Weeks: <br/><Accent>{CASE_STUDY.title}</Accent></H2>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-display text-xl text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-900 rounded-full"></span> 
                  The Starting Point
                </h4>
                <ul className="space-y-3">
                  {CASE_STUDY.beforePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted/80">
                      <ArrowRight className="w-5 h-5 text-red-900 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bg/50 p-6 border-l-2 border-accent">
                <h4 className="font-display text-xl text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span> 
                  The Result
                </h4>
                <ul className="space-y-3">
                  {CASE_STUDY.afterPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <Button onClick={onApply} withIcon>Apply for Similar Results</Button>
            </div>
          </div>

          {/* Image Comparison */}
          <div className="order-1 lg:order-2 relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase text-white border border-white/10">
                    Day 1
                  </div>
                  <img 
                    src={CASE_STUDY.beforeImg} 
                    alt="Case Study Before" 
                    className="w-full h-[350px] md:h-[500px] object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>
                <div className="relative group">
                  <div className="absolute top-4 left-4 z-10 bg-accent px-3 py-1 text-xs font-bold uppercase text-white shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                    Week 12
                  </div>
                  <img 
                    src={CASE_STUDY.afterImg} 
                    alt="Case Study After" 
                    className="w-full h-[350px] md:h-[500px] object-cover saturate-110 group-hover:saturate-100 transition-all duration-700"
                  />
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-accent/20 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-accent opacity-50 hidden md:block"></div>
          </div>

        </div>
      </Section>

      {/* TRANSFORMATIONS */}
      <Section id="stories" label="Evidence">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <H2>More <Accent>Results</Accent></H2>
            <p className="text-muted">Brothers who took the step.</p>
          </div>
          <Button variant="outline" onClick={onApply} withIcon>Start Your Story</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TRANSFORMATIONS.map((t) => (
            <div key={t.id} className="group relative bg-bg border border-border overflow-hidden">
              <div className="grid grid-cols-2 h-64">
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-black/50 text-[10px] uppercase font-bold px-2 py-1 backdrop-blur-sm">Before</span>
                  <img src={t.beforeImg} alt="Before" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-accent text-[10px] uppercase font-bold px-2 py-1">After</span>
                  <img src={t.afterImg} alt="After" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-display text-xl font-bold uppercase">{t.name}</h4>
                    <span className="text-accent text-sm font-bold">{t.result}</span>
                  </div>
                </div>
                <p className="text-sm text-muted italic">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING / CTA */}
      <Section id="pricing">
        <div className="bg-ink border border-border p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <H2>One Program. <Accent>Total Reset.</Accent></H2>
          <p className="text-xl text-muted mb-8 max-w-xl mx-auto">
            This is not a PDF workout. This is high-proximity coaching for men who are ready to change their life.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 mb-12 text-left max-w-2xl mx-auto">
             <ul className="space-y-4">
               <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-accent" /> <span>Custom Nutrition & Training Protocol</span></li>
               <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-accent" /> <span>Daily Accountability & Form Review</span></li>
             </ul>
             <ul className="space-y-4">
               <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-accent" /> <span>Spiritual Habits Integration</span></li>
               <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-accent" /> <span>Private Brotherhood Community</span></li>
             </ul>
          </div>

          <Button size="lg" onClick={onApply} className="w-full md:w-auto px-12">
            Apply For Coaching
          </Button>
          <p className="mt-6 text-xs text-muted font-mono uppercase tracking-widest">Limited spots available for {new Date().toLocaleString('default', { month: 'long' })}</p>
        </div>
      </Section>
    </main>
  );
};