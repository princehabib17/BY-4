import React, { useState, useEffect, useRef } from 'react';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Display, H2, H3, Lead, Body, Accent, Label } from './components/Typography';
import { IMAGES, PILLARS, TRANSFORMATIONS, CASE_STUDY, cld } from './constants';
import { CheckCircle, Activity, Target, Clock, ArrowRight, Moon, Shield } from 'lucide-react';
import { MacroCalculator } from './components/MacroCalculator';
import { CompareSlider } from './components/CompareSlider';
import { Reveal } from './components/Reveal';

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
      <section id="intro" className="relative h-screen min-h-[760px] flex items-end pb-16 md:pb-24 overflow-hidden bg-bg">
        <div className="absolute inset-0 z-0 hero-media">
           <img
             src={cld(IMAGES.hero, 2200)}
             alt="Brother Yusuf Fit"
             className="w-full h-full object-cover object-[72%_18%] md:object-[80%_14%]"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/30 z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-5xl">
            <Label className="mb-5 text-accent hero-fade d1">Elite Coaching for Muslim Men</Label>
            <Display className="mb-8 max-w-6xl">
              <span className="hero-line"><span>You’re winning</span></span>
              <span className="hero-line"><span>on paper but</span></span>
              <span className="hero-line"><span><Accent>failing your body</Accent></span></span>
              <span className="hero-line"><span>and health.</span></span>
            </Display>
            <Lead className="mb-10 text-white/90 font-medium max-w-xl hero-fade d2">
              Build real strength, master your nafs and lose 20–50lbs through The Barakah Body Framework, inshallah.
            </Lead>

            <div className="flex flex-wrap gap-4 hero-fade d3">
              <Button onClick={onApply} size="lg" withIcon>
                Enter the barakah era
              </Button>
            </div>
          </div>
        </div>

        <div className="scroll-hint hidden md:flex hero-fade d3">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      {/* SECTION 2: FEATURED CASE STUDY */}
      <Section id="proof" darker className="border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <Label className="mb-4">Real Results</Label>
            <H2>Client <Accent>Transformation</Accent></H2>
            <Lead className="max-w-2xl mx-auto">Successful in career, providing for family, but losing the battle internally. Drag the line.</Lead>
          </Reveal>

          <Reveal>
            <CompareSlider
              before={cld(CASE_STUDY.beforeImg, 1200)}
              after={cld(CASE_STUDY.afterImg, 1200)}
              beforeAlt="Day 01"
              afterAlt="Week 12"
              className="aspect-[4/5] md:aspect-[5/4] max-w-4xl mx-auto border border-border"
            />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-16 max-w-4xl mx-auto">
            <Reveal>
              <Label className="mb-2 text-muted">The Beginning</Label>
              <H3 className="text-white mb-6">Day 01: The Fog</H3>
              <ul className="space-y-5">
                {CASE_STUDY.beforePoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <ArrowRight className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <Body>{point}</Body>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <Label className="mb-2 text-accent">The Outcome</Label>
              <H3 className="text-white mb-6">Week 12: The Result</H3>
              <ul className="space-y-5 border-l-2 border-accent pl-6">
                {CASE_STUDY.afterPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span className="font-display text-xl md:text-2xl text-white uppercase tracking-tight">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SECTION 3: TRANSFORMATIONS */}
      <Section id="stories">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center mb-16">
             <Label className="mb-4">Proof of Work</Label>
             <H2>More <Accent>Stories</Accent></H2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {TRANSFORMATIONS.map((t, idx) => (
              <Reveal key={t.id} delay={idx * 80}>
              <div className="relative group bg-ink border border-border hover:border-accent/40 transition-colors">
                <div className="grid grid-cols-2 aspect-[3/4] bg-neutral-900">
                  <div className="relative border-r border-border/50 overflow-hidden frame">
                    <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur px-3 py-1">
                       <Label className="text-white text-[10px] tracking-widest">Before</Label>
                    </div>
                    <img src={cld(t.beforeImg, 900)} alt={`${t.name} before`} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="relative overflow-hidden frame">
                    <div className="absolute top-4 left-4 z-10 bg-accent px-3 py-1">
                       <Label className="text-white text-[10px] tracking-widest">After</Label>
                    </div>
                    <img src={cld(t.afterImg, 900)} alt={`${t.name} after`} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-6 border-t border-border">
                   <H3 className="text-xl mb-2">{t.name}</H3>
                   <p className="font-display text-accent text-2xl mb-3">{t.result}</p>
                   <Body className="italic text-sm">"{t.quote}"</Body>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 text-center">
             <Button onClick={onApply} size="lg" withIcon>Start Your Transformation</Button>
          </div>
        </div>
      </Section>

      {/* SECTION 4: THE ORIGIN / ABOUT */}
      <section id="about" className="relative bg-bg pb-32">
          <div className="py-24 text-center border-b border-border/50 px-4 max-w-4xl mx-auto">
              <Label className="mb-4">The Origin Story</Label>
              <H2 className="mb-6">About <Accent>Brother Yusuf</Accent></H2>
              <Lead>I was not always the man you see today. I rebuilt myself from the ground up.</Lead>
          </div>

          <div className="hidden lg:block relative border-b border-border">
             {/* Sticky container setup with h-screen to ensure full viewport tracking */}
             <div className="container mx-auto max-w-7xl grid grid-cols-2 gap-16 px-8 items-start">
                <div className="sticky top-0 h-screen w-full pt-24 pb-12 self-start">
                   <div className="relative w-full h-full rounded-sm overflow-hidden border-2 border-border bg-ink shadow-2xl">
                      {CHAPTERS.map((chapter, index) => (
                         <div 
                           key={chapter.id}
                           className={`absolute inset-0 transition-all duration-700 ease-in-out transform bg-neutral-900 ${
                             activeChapter === index ? 'opacity-100 scale-100' : 
                             'opacity-0 scale-110'
                           }`}
                         >
                            <img
                              src={cld(chapter.image, 1400)}
                              alt={chapter.title}
                              className={`w-full h-full object-cover object-top transition-all duration-1000 ${index === 0 ? 'grayscale contrast-125' : ''}`}
                            />
                            
                            <div className="absolute top-8 left-8 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 flex items-center gap-3 shadow-xl z-10">
                               <chapter.icon className="w-4 h-4 text-accent" />
                               <span className="font-display uppercase text-sm tracking-wider">Chapter 0{chapter.id}</span>
                            </div>
                         </div>
                      ))}
                      
                      <div className="absolute bottom-8 left-8 flex gap-2 z-10">
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
                         <H2 className="relative z-10">{chapter.title}</H2>
                         <div className="w-16 h-1 bg-accent mb-10"></div>
                         <Lead className="text-white font-light mb-8">
                           {chapter.text}
                         </Lead>
                         
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
                   <div className="absolute inset-0 z-0 bg-neutral-900">
                      <img
                        src={cld(chapter.image, 1200)}
                        alt={chapter.title}
                        className={`w-full h-full object-cover object-top ${index === 0 ? 'grayscale contrast-125' : ''}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent opacity-100" />
                   </div>

                   <div className="relative z-10 w-full p-6 pb-32 flex flex-col items-start">
                      <div className="mb-4 text-accent flex items-center gap-2">
                         <chapter.icon className="w-6 h-6 drop-shadow-lg" />
                         <span className="font-mono text-xs uppercase tracking-widest text-white/80">Chapter 0{index + 1}</span>
                      </div>
                      <H2 className="text-white mb-4 drop-shadow-xl">{chapter.title}</H2>
                      <Body className="text-gray-200 border-l-2 border-accent pl-4 mb-8">
                         {chapter.text}
                      </Body>
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
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <Label className="mb-4">The Methodology</Label>
          <H2>The <Accent>Barakah Body</Accent> Framework</H2>
          <Lead>
            Proven system that has helped Muslim men transform their bodies while building discipline that carries into every area of life.
          </Lead>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon === 'Activity' ? Activity : pillar.icon === 'Target' ? Target : Clock;
            return (
              <Reveal key={idx} delay={idx * 90} className="h-full">
              <div className="relative group bg-ink border border-border p-8 hover:border-accent/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
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
                  <H3 className="mb-4 group-hover:translate-x-1 transition-transform duration-300">{pillar.title}</H3>
                  <Body className="mb-8 opacity-70 group-hover:opacity-100 transition-opacity">{pillar.desc}</Body>

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
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SECTION: MACRO CALCULATOR */}
      <MacroCalculator />

      {/* SECTION 6: PRICING / CTA */}
      <Section id="pricing">
        <Reveal>
        <div className="bg-ink border border-border p-8 md:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <Label className="mb-4">The Commitment</Label>
          <H2>One Program. <Accent>Total Reset.</Accent></H2>
          <Lead className="mb-12 max-w-xl mx-auto">
            This is not a PDF workout. This is high-proximity coaching for men who are ready to change their life.
          </Lead>

          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-16 text-left max-w-3xl mx-auto">
             <ul className="space-y-6">
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Custom Nutrition & Training Protocol</Body>
               </li>
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Weekly Accountability & Form Review</Body>
               </li>
             </ul>
             <ul className="space-y-6">
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Spiritual Habits Integration</Body>
               </li>
               <li className="flex items-center gap-4">
                 <CheckCircle className="w-5 h-5 text-accent shrink-0" /> 
                 <Body className="text-white">Mindset Reframe</Body>
               </li>
             </ul>
          </div>

          <div className="text-center">
             <p className="text-accent font-mono uppercase tracking-widest text-xs mb-6">
                limited spots available
             </p>
             <Button onClick={onApply} size="lg" className="w-full md:w-auto min-w-[300px]">
                Apply For Coaching
             </Button>
             <p className="mt-6 text-xs text-muted max-w-md mx-auto">
                Application required. We only work with men who are 100% committed.
             </p>
          </div>
        </div>
        </Reveal>
      </Section>
    </main>
  );
};