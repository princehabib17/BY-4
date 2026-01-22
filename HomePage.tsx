import React, { useState, useEffect, useRef } from 'react';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Display, H2, H3, Lead, Accent } from './components/Typography';
import { InstagramFeed } from './components/InstagramFeed';
import { IMAGES, PILLARS, TRANSFORMATIONS, CASE_STUDY } from './constants';
import { CheckCircle, Activity, Target, Clock, Star, ArrowRight, Moon, Shield } from 'lucide-react';

interface HomePageProps {
  onApply: () => void;
}

const CHAPTERS = [
  {
    id: 1,
    title: "From Addiction to Discipline",
    subtitle: "The Starting Point",
    text: "For nearly a decade, I was addicted to pharmaceutical drugs, which led to more destructive substances.\nI lived without control over my nafs—chasing pleasure and distraction.\nNo discipline. No purpose. No peace.\nOutwardly I survived. Internally I was drowning.",
    image: IMAGES.storyAbyss,
    icon: Activity,
    color: "from-gray-900 to-black"
  },
  {
    id: 2,
    title: "Islam Changed Everything",
    subtitle: "The Turning Point",
    text: "My turning point came when I found Islam and reverted.\nIslam didn't just help me quit bad habits—it rebuilt how I thought, lived, and carried myself.\nIt gave me structure, accountability, and a standard to live up to.\nI went from intoxicated and lost to sober and grateful, with clear purpose.",
    image: IMAGES.storyAwakening,
    icon: Moon,
    color: "from-emerald-900/40 to-black"
  },
  {
    id: 3,
    title: "Body as a Tool for Character",
    subtitle: "The Transformation",
    text: "My physical transformation reflected a deeper internal change.\nTraining became a way to build discipline, patience, and self-mastery.\nI learned to lead myself before leading others.\nIf Allah allowed me to change the way I did, then change is possible for any man willing to commit.",
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
          <div className="max-w-4xl">
            <Display className="mb-6 drop-shadow-lg">
              You're winning on paper, yet your <Accent>body</Accent> and <Accent>energy</Accent> no longer reflect the level you operate at.
            </Display>

            <div className="mb-8 space-y-2 text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-md">
              <p>Your mind feels foggy. Your energy is inconsistent. Salah feels rushed and unfocused.</p>
              <p>You sit with your family, but your presence is divided.</p>
              <p>You're succeeding in your career, but quietly failing your body.</p>
            </div>

            <Lead className="mb-8 text-muted max-w-3xl leading-[1.8]">
              Through my <Accent>Barakah Body Framework</Accent>, I help high-performing Muslim professionals lose 20–50 lbs, build real strength, restore energy, and regain mastery over their nafs—so they lead by example with discipline and barakah, inshallah.
            </Lead>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={onApply}
                size="lg"
              >
                Enter the Barakah Era
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See the Results
              </Button>
            </div>

            {/* Trust Chips */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-ink/80 backdrop-blur-sm px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-subtle">Lose 20–50 lbs</span>
              <span className="bg-ink/80 backdrop-blur-sm px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-subtle">Build Real Strength</span>
              <span className="bg-ink/80 backdrop-blur-sm px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-subtle">Restore Energy</span>
              <span className="bg-ink/80 backdrop-blur-sm px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-subtle">Master the Nafs</span>
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

      {/* ABOUT (JOURNEY) — 3 PHASES */}
      <section id="about" className="relative bg-bg">
          {/* Header */}
          <div className="py-16 md:py-20 text-center border-b border-border/50">
              <div className="mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-muted">ABOUT</span>
              </div>
              <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
                My transformation started inside—then showed on the outside.
              </p>
          </div>

          {/* DESKTOP LAYOUT: Sticky Split Screen */}
          <div className="hidden lg:block relative border-b border-border">
             <div className="container mx-auto max-w-7xl grid grid-cols-2 gap-16 px-8">
                {/* Sticky Left Side (Images) */}
                <div className="sticky top-24 h-[calc(100vh-6rem)] w-full py-12">
                   <div className="relative w-full h-full rounded-sm overflow-hidden bg-ink shadow-deep">
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
                            <div className="absolute top-8 left-8 bg-black/80 backdrop-blur px-4 py-3 flex items-center gap-3 shadow-elevated">
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
                         <div className="text-xl md:text-2xl text-muted leading-[1.9] font-light space-y-4">
                           {chapter.text.split('\n').map((line, i) => (
                             <p key={i}>{line}</p>
                           ))}
                         </div>
                      </div>
                   ))}
                   
                   <div className="h-[40vh] flex items-center justify-start pl-8">
                      <div className="space-y-6">
                        <H2>Your Turn.</H2>
                        <Button onClick={onApply} size="lg">Start Your Transformation</Button>
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
                      <div className="bg-accent text-white text-xs font-bold px-3 py-1 mb-4 flex items-center gap-2 uppercase tracking-widest shadow-accent-glow-strong">
                         <chapter.icon className="w-3 h-3" />
                         <span>Chapter 0{chapter.id}</span>
                      </div>
                      
                      <H2 className="text-4xl md:text-5xl mb-4 drop-shadow-xl">{chapter.title}</H2>
                      <div className="text-gray-200 text-lg leading-[1.8] drop-shadow-md border-l-2 border-accent pl-4 space-y-3">
                         {chapter.text.split('\n').map((line, i) => (
                           <p key={i}>{line}</p>
                         ))}
                      </div>
                   </div>
                </div>
             ))}

             {/* CTA after mobile journey */}
             <div className="py-20 text-center bg-bg">
               <div className="space-y-6">
                 <H2>Your Turn.</H2>
                 <Button onClick={onApply} size="lg">Start Your Transformation</Button>
               </div>
             </div>
          </div>
      </section>

      {/* PROGRAMS — THE BARAKAH BODY FRAMEWORK */}
      <Section id="method" label="PROGRAMS">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <H2>The <Accent>Barakah Body Framework</Accent></H2>
          <Lead className="mb-12">
            The Barakah Body Framework is a proven system designed for Muslim men with demanding careers who want results without burning out or wasting time.
          </Lead>

          {/* 3 Pillars */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-ink p-8 shadow-elevated hover:shadow-accent-glow transition-all duration-300">
              <div className="mb-4">
                <Activity className="w-12 h-12 text-accent mb-4" />
                <H3>Time Efficient Training</H3>
              </div>
              <p className="text-muted leading-relaxed">High-impact workouts that fit a busy schedule—without living in the gym.</p>
            </div>

            <div className="bg-ink p-8 shadow-elevated hover:shadow-accent-glow transition-all duration-300">
              <div className="mb-4">
                <Target className="w-12 h-12 text-accent mb-4" />
                <H3>Fast Meal Prep</H3>
              </div>
              <p className="text-muted leading-relaxed">Nutrition made simple so fat loss and strength are sustainable—without living in the kitchen.</p>
            </div>

            <div className="bg-ink p-8 shadow-elevated hover:shadow-accent-glow transition-all duration-300">
              <div className="mb-4">
                <Clock className="w-12 h-12 text-accent mb-4" />
                <H3>Ihsan Accountability</H3>
              </div>
              <p className="text-muted leading-relaxed">Structure and excellence enforced—especially when motivation is low.</p>
            </div>
          </div>
        </div>

        {/* Program Cards - Keeping existing structure but updating details */}
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted mb-8">All programs include:</p>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <span className="bg-ink/80 px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-subtle">Includes all 3 pillars</span>
            <span className="bg-ink/80 px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-subtle">Weekly check-ins</span>
            <span className="bg-ink/80 px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-subtle">Clear targets + structure</span>
          </div>
          <Button onClick={onApply} size="lg">Apply Now</Button>
        </div>
      </Section>

      {/* FEATURED CLIENT STORY */}
      <Section darker label="FEATURED STORY" id="stories">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <H2 className="mb-6">{CASE_STUDY.title}</H2>
            <div className="inline-block bg-accent px-6 py-3 shadow-accent-glow-strong">
              <span className="font-display text-6xl md:text-7xl text-white tracking-wider">12 WEEKS</span>
            </div>
          </div>

          {/* Before Section */}
          <div className="mb-20">
             <div className="relative mb-10 max-w-3xl mx-auto">
                <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase text-white shadow-elevated">
                  BEFORE
                </div>
                <img
                  src={CASE_STUDY.beforeImg}
                  alt="Before"
                  className="w-full aspect-[4/5] md:aspect-video object-cover grayscale brightness-90 shadow-elevated"
                />
             </div>

             <div className="max-w-3xl mx-auto text-muted/90 text-lg md:text-xl leading-[1.9] space-y-4">
                {CASE_STUDY.beforeText.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
             </div>
          </div>

          {/* After Section */}
          <div className="mb-16">
             <div className="relative mb-10 max-w-3xl mx-auto">
                <div className="absolute top-4 left-4 z-10 bg-accent px-4 py-2 text-xs font-bold uppercase text-white shadow-accent-glow-strong">
                  AFTER
                </div>
                <img
                  src={CASE_STUDY.afterImg}
                  alt="After"
                  className="w-full aspect-[4/5] md:aspect-video object-cover saturate-110 shadow-accent-glow"
                />
             </div>

             <div className="max-w-3xl mx-auto text-white text-lg md:text-xl leading-[1.9] space-y-4 font-medium">
                {CASE_STUDY.afterText.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
             </div>
          </div>

          {/* 3 IMPROVEMENT LINES */}
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <div className="border-2 border-border p-4 md:p-6 flex items-center justify-between gap-4 shadow-elevated hover:shadow-accent-glow transition-all duration-300">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent font-bold">ENERGY</span>
              <span className="text-sm md:text-base text-muted flex-1 text-center hidden md:block">steady, consistent, no crashes</span>
              <span className="font-display text-xl md:text-2xl text-accent uppercase tracking-wider">LOCKED</span>
            </div>

            <div className="border-2 border-border p-4 md:p-6 flex items-center justify-between gap-4 shadow-elevated hover:shadow-accent-glow transition-all duration-300">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent font-bold">FOCUS</span>
              <span className="text-sm md:text-base text-muted flex-1 text-center hidden md:block">brain fog replaced with clarity</span>
              <span className="font-display text-xl md:text-2xl text-accent uppercase tracking-wider">CLEAR</span>
            </div>

            <div className="border-2 border-border p-4 md:p-6 flex items-center justify-between gap-4 shadow-elevated hover:shadow-accent-glow transition-all duration-300">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent font-bold">DISCIPLINE</span>
              <span className="text-sm md:text-base text-muted flex-1 text-center hidden md:block">structure held even when life got busy</span>
              <span className="font-display text-xl md:text-2xl text-accent uppercase tracking-wider">IHSAN</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={onApply} size="lg">
              Apply for Coaching
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See More Transformations
            </Button>
          </div>
        </div>
      </Section>

      {/* TRANSFORMATION MINI GRID */}
      <Section id="transformations">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
          {TRANSFORMATIONS.map((t) => (
            <div key={t.id} className="group relative bg-bg shadow-elevated hover:shadow-accent-glow overflow-hidden transition-all duration-300">
              <div className="grid grid-cols-2 h-64 md:h-80">
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-black/50 text-[10px] uppercase font-bold px-2 py-1 backdrop-blur-sm shadow-subtle">Before</span>
                  <img src={t.beforeImg} alt="Before" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-accent text-[10px] uppercase font-bold px-2 py-1 shadow-accent-glow">After</span>
                  <img src={t.afterImg} alt="After" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-display text-xl font-bold uppercase tracking-wider">{t.name}</h4>
                    <span className="text-accent text-sm font-bold">{t.result}</span>
                  </div>
                </div>
                <p className="text-sm text-muted italic leading-relaxed">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted font-mono uppercase tracking-widest mb-8">
          Real men. Real schedules. Real results.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Back to Story
          </Button>
          <Button onClick={onApply} size="lg">
            Start Your Journey
          </Button>
        </div>
      </Section>

      {/* INSTAGRAM FEED */}
      <InstagramFeed />

      {/* FINAL CTA (END BANNER) */}
      <Section id="pricing" darker>
        <div className="bg-ink shadow-deep p-12 md:p-20 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent shadow-accent-glow" />

          <H2 className="mb-6">Lead by example—at home, at work, and with your deen.</H2>
          <Lead className="mb-12 max-w-2xl mx-auto">
            Strong body. Clear mind. Disciplined nafs. Consistent salah—by Allah's permission.
          </Lead>

          <Button size="lg" onClick={onApply} className="px-16 py-6">
            Apply for Coaching
          </Button>
        </div>
      </Section>
    </main>
  );
};