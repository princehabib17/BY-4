import React, { useState, useEffect, useRef } from 'react';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Display, H2, H3, Lead, Body, Accent } from './components/Typography';
import { IMAGES, PILLARS, TRANSFORMATIONS, CASE_STUDY } from './constants';
import { CheckCircle, Activity, Target, Clock, ArrowRight, Moon, Shield } from 'lucide-react';
import { MacroCalculator } from './components/MacroCalculator';

interface HomePageProps {
  onApply: () => void;
}

const CHAPTERS = [
  {
    id: 1,
    title: "Addiction to Discipline",
    subtitle: "The Struggle",
    text: "For nearly a decade, I was addicted to pharmaceutical drugs, which led to more destructive substances. I lived without control over my nafs. Outwardly I survived. Internally I was drowning.",
    image: IMAGES.storyAbyss,
    icon: Activity,
    color: "from-gray-900 to-black"
  },
  {
    id: 2,
    title: "Islam Changed Everything",
    subtitle: "The Turning Point",
    text: "My turning point came when I found Islam and reverted. Islam didn't just help me quit bad habits; it rebuilt how I thought, lived, and carried myself. I went from intoxicated and lost to sober and grateful, with clear purpose.",
    image: IMAGES.storyAwakening, 
    icon: Moon,
    color: "from-emerald-900/40 to-black"
  },
  {
    id: 3,
    title: "Body as a Tool",
    subtitle: "The Weapon",
    text: "My physical transformation reflected a deeper internal change. Training became a way to build self-mastery. I learned to lead myself before leading others. If Allah allowed me to change the way I did, then change is possible for any man willing to commit.",
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
      {/* SECTION 1: HERO */}
      <section className="relative h-screen min-h-[700px] flex items-end pb-12 md:pb-24 lg:pb-32 overflow-hidden bg-bg">
        <div className="absolute inset-0 z-0">
           <img 
             src={IMAGES.hero} 
             alt="Brother Yusuf Fit" 
             className="w-full h-full object-cover object-[50%_35%] brightness-110 contrast-110 saturate-[1.05]" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-r from-bg/20 via-transparent to-bg/20 z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-6xl">
            <Display className="mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              YOU'RE WINNING ON PAPER, BUT <Accent>LOSING YOUR BODY</Accent> AND HEALTH.
            </Display>
            <Lead className="mb-10 text-white font-medium max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Build real strength, master your bags and lose 20–50 lbs through my Baraka Body Framework, inshallah.
            </Lead>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={onApply} size="lg">
                Enter the barakah era
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED CASE STUDY */}
      <Section darker className="border-t-2 border-accent/10 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <H2>Client <Accent>Transformation</Accent></H2>
            <Lead className="max-w-2xl mx-auto">Successful in career, providing for family, but losing the battle internally. This is the starting point for most high-performers.</Lead>
          </div>

          {/* Day 1 */}
          <div className="mb-24 relative border-l-2 border-border pl-6 md:pl-12 pb-8">
             <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-border"></div>
             
             <div className="mb-8">
               <H3 className="text-white">Day 01: The Fog</H3>
             </div>

             <div className="relative mb-10 group max-w-2xl">
                <img 
                  src={CASE_STUDY.beforeImg} 
                  alt="Day 1" 
                  className="w-full aspect-[4/5] md:aspect-video object-cover grayscale brightness-90 border border-border"
                />
             </div>

             <ul className="space-y-6 max-w-2xl">
                {CASE_STUDY.beforePoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <ArrowRight className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <Body>{point}</Body>
                  </li>
                ))}
             </ul>
          </div>

          {/* Week 12 */}
          <div className="relative border-l-2 border-accent pl-6 md:pl-12">
             <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(229,9,20,0.8)] animate-pulse"></div>

             <div className="mb-8">
               <H3 className="text-white">Week 12: The Result</H3>
             </div>

             <div className="relative mb-10 max-w-2xl">
                <img 
                  src={CASE_STUDY.afterImg} 
                  alt="Week 12" 
                  className="w-full aspect-[4/5] md:aspect-video object-cover saturate-110 border-2 border-accent/20 shadow-[0_0_40px_rgba(229,9,20,0.15)]"
                />
             </div>

             <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 md:p-10 border-l-4 border-accent max-w-2xl">
                <ul className="space-y-6">
                  {CASE_STUDY.afterPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                      <span className="font-display text-xl md:text-3xl text-white uppercase">{point}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: TRANSFORMATIONS (Side-by-side) */}
      <Section>
        {/* Removed "Proven Results" Heading as requested */}
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {TRANSFORMATIONS.map((t) => (
              <div key={t.id} className="relative group border border-border overflow-hidden bg-ink">
                <div className="grid grid-cols-2 aspect-square md:aspect-video">
                  <div className="relative border-r border-border/50 overflow-hidden">
                    <img src={t.beforeImg} alt="Before" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="relative overflow-hidden">
                    <img src={t.afterImg} alt="After" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
             <Button onClick={onApply} size="lg" withIcon>Start Your Transformation</Button>
          </div>
        </div>
      </Section>

      {/* SECTION 4: THE ORIGIN / ABOUT */}
      <section id="about" className="relative bg-bg pb-32">
          <div className="py-24 text-center border-b border-border/50 px-4">
              <H2 className="mb-2 text-3xl md:text-5xl leading-tight">About me: <span className="text-white">I was not always the man you see today</span></H2>
          </div>

          <div className="hidden lg:block relative border-b border-border">
             <div className="container mx-auto max-w-7xl grid grid-cols-2 gap-16 px-8">
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
                            <img 
                              src={chapter.image} 
                              alt={chapter.title} 
                              className={`w-full h-full object-cover transition-all duration-1000 ${index === 0 ? 'grayscale contrast-125' : ''}`} 
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${chapter.color} opacity-90`} />
                            
                            <div className="absolute top-8 left-8 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 flex items-center gap-3 shadow-xl">
                               <chapter.icon className="w-4 h-4 text-accent" />
                            </div>
                         </div>
                      ))}
                      
                      <div className="absolute bottom-8 left-8 flex gap-2">
                         {CHAPTERS.map((_, i) => (
                           <div key={i} className={`h-1 transition-all duration-300 ${activeChapter === i ? 'w-12 bg-accent' : 'w-4 bg-white/20'}`} />
                         ))}
                      </div>
                   </div>
                </div>

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
                         {/* Removed numbering text here */}
                         <H2 className="relative z-10">{chapter.title}</H2>
                         <div className="w-16 h-1 bg-accent mb-10"></div>
                         <Lead className="text-white font-light mb-8">
                           {chapter.text}
                         </Lead>
                         
                         {/* CTA after the last chapter */}
                         {index === CHAPTERS.length - 1 && (
                            <div className="mt-8">
                                <Button onClick={onApply} size="lg" withIcon>Apply Now</Button>
                            </div>
                         )}
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="lg:hidden pb-0">
             {CHAPTERS.map((chapter, index) => (
                <div key={chapter.id} className="relative h-screen sticky top-0 flex items-end border-b-4 border-black">
                   <div className="absolute inset-0 z-0">
                      <img 
                        src={chapter.image} 
                        alt={chapter.title} 
                        className={`w-full h-full object-cover object-center ${index === 0 ? 'grayscale contrast-125' : ''}`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent opacity-100" />
                   </div>

                   <div className="relative z-10 w-full p-6 pb-32 flex flex-col items-start">
                      {/* Removed "Chapter 0X" text badge */}
                      <div className="mb-4 text-accent">
                         <chapter.icon className="w-8 h-8 drop-shadow-lg" />
                      </div>
                      <H2 className="text-white mb-4 drop-shadow-xl">{chapter.title}</H2>
                      <Body className="text-gray-200 border-l-2 border-accent pl-4 mb-8">
                         {chapter.text}
                      </Body>
                      {/* CTA after the last chapter */}
                      {index === CHAPTERS.length - 1 && (
                            <div className="w-full">
                                <Button onClick={onApply} size="lg" className="w-full">Apply Now</Button>
                            </div>
                         )}
                   </div>
                </div>
             ))}
          </div>
      </section>

      {/* SECTION 5: THE FRAMEWORK */}
      <Section id="method">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <H2>The <Accent>Barakah Body</Accent> Framework</H2>
          <Lead>
            Proven system that has helped Muslim men transform their bodies while building discipline that carries into every area of life. It was designed specifically for men with demanding careers.
          </Lead>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon === 'Activity' ? Activity : pillar.icon === 'Target' ? Target : Clock;
            return (
              <div key={idx} className="relative group bg-ink border border-border p-8 hover:border-accent/50 transition-all duration-500 overflow-hidden flex flex-col">
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 ease-out" />

                {/* Icon & Number */}
                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <div className="p-3 bg-bg border border-border group-hover:border-accent/30 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-6xl font-display text-border group-hover:text-white/5 transition-colors select-none font-bold">0{idx + 1}</div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <H3 className="mb-4 text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-300">{pillar.title}</H3>
                  <Body className="text-sm md:text-base mb-8 opacity-70 group-hover:opacity-100 transition-opacity">{pillar.desc}</Body>

                  {/* Benefits List */}
                  <div className="border-t border-border pt-6 group-hover:border-accent/20 transition-colors">
                    <ul className="space-y-3">
                      {pillar.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-muted group-hover:text-white transition-colors duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                           <span className="text-accent mt-px font-bold text-xs">/</span>
                           {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SECTION: MACRO CALCULATOR */}
      <MacroCalculator />

      {/* SECTION 6: PRICING / CTA */}
      <Section id="pricing">
        <div className="bg-ink border border-border p-8 md:p-20 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <H2>One Program. <Accent>Total Reset.</Accent></H2>
          <Lead className="mb-12 max-w-xl mx-auto">
            This is not a PDF workout. This is high-proximity coaching for men who are ready to change their life.
          </Lead>

          <div className="flex flex-col md:flex-row justify-center gap-10 mb-16 text-left max-w-3xl mx-auto">
             <ul className="space-y-6">
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Custom Nutrition & Training Protocol</Body>
               </li>
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Daily Accountability & Form Review</Body>
               </li>
             </ul>
             <ul className="space-y-6">
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Spiritual Habits Integration</Body>
               </li>
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Private Brotherhood Community</Body>
               </li>
             </ul>
          </div>

          <Button size="lg" onClick={onApply} className="w-full md:w-auto px-16">
            Apply For Coaching
          </Button>
          <div className="mt-8">
            <Body className="text-sm font-mono opacity-60">InshAllah only limited spots for {new Date().toLocaleString('default', { month: 'long' })}</Body>
          </div>
        </div>
      </Section>
    </main>
  );
};