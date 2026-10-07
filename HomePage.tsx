import React from 'react';
import { Button } from './components/Button';
import { Display, H2, H3, Lead, Body, Accent } from './components/Typography';
import { IMAGES, PILLARS, TRANSFORMATIONS, CASE_STUDY, cld } from './constants';
import { CheckCircle, Activity, Target, Clock, ArrowRight } from 'lucide-react';
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
    text: "For nearly a decade, I was addicted to pharmaceutical drugs, which led to more destructive substances. I lived without control over my nafs. Outwardly I survived. Internally I was drowning.",
    image: IMAGES.storyAbyss,
    crop: "object-[50%_18%] grayscale",
  },
  {
    id: 2,
    title: "Islam Changed Everything",
    text: "My turning point came when I found Islam and reverted. Islam didn't just help me quit bad habits; it rebuilt how I thought, lived, and carried myself. I went from intoxicated and lost to sober and grateful, with clear purpose.",
    image: IMAGES.storyAwakening,
    crop: "object-center",
  },
  {
    id: 3,
    title: "Body as a Tool",
    text: "My physical transformation reflected a deeper internal change. Training became a way to build self-mastery. I learned to lead myself before leading others. If Allah allowed me to change the way I did, then change is possible for any man willing to commit.",
    image: IMAGES.storyVessel,
    crop: "object-[50%_12%]",
  },
];

const TICKER = [
  "THE BARAKAH BODY",
  "DISCIPLINE OVER MOTIVATION",
  "MASTER YOUR NAFS",
  "20–50 LBS IN 12 WEEKS",
  "STRENGTH AS WORSHIP",
];

export const HomePage: React.FC<HomePageProps> = ({ onApply }) => {
  return (
    <main>
      {/* HERO — type left, unobstructed photo right, type overlaps the frame */}
      <section id="intro" className="relative min-h-[100svh] bg-bg overflow-hidden">
        <div className="hero-media relative h-[56vh] min-h-[280px] lg:absolute lg:inset-y-0 lg:left-[38%] lg:right-0 lg:h-auto lg:min-h-0">
          <img
            src={cld(IMAGES.hero, 2400)}
            alt="Brother Yusuf Fit"
            className="absolute inset-0 w-full h-[120%] object-cover object-[78%_28%] lg:object-[72%_22%]"
          />
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 flex justify-between items-end pointer-events-none">
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/80">
              Brother Yusuf Fit — Coach
            </p>
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/50 hidden sm:block">
              Est. Barakah Era
            </p>
          </div>
        </div>

        <div className="relative z-20 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[46%] flex flex-col justify-end px-6 md:px-12 lg:px-14 xl:px-16 pt-10 pb-12 lg:pt-28 lg:pb-20 bg-bg lg:bg-transparent">
          <div className="lg:bg-bg/90 lg:backdrop-blur-[2px] lg:-mr-16 lg:pr-16 lg:py-8">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent mb-6 hero-fade d1">
              01 — Intro
            </p>
            <Display className="mb-8 text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[4.4rem] xl:text-[5.6rem] 2xl:text-[6.4rem] leading-[0.84]">
              <span className="hero-line"><span>You’re winning</span></span>
              <span className="hero-line"><span>on paper but</span></span>
              <span className="hero-line"><span><Accent>failing your body</Accent></span></span>
              <span className="hero-line"><span>and health.</span></span>
            </Display>
            <Lead className="mb-10 text-white/90 font-medium max-w-md hero-fade d2">
              Build real strength, master your nafs and lose 20–50lbs through The Barakah Body Framework, inshallah.
            </Lead>
            <div className="flex flex-wrap gap-4 hero-fade d3">
              <Button onClick={onApply} size="lg" withIcon>
                Enter the barakah era
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>

      {/* PROOF — paper magazine spread. Impossible to miss vs the black site. */}
      <section id="proof" className="paper-section relative overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(280px,0.42fr)_1fr] gap-10 lg:gap-16 px-6 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
          <Reveal className="lg:sticky lg:top-28 self-start">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#8a3b32] mb-5">
              02 — Proof
            </p>
            <H2 className="text-[#12110f] mb-6">
              12 weeks.<br />A different man.
            </H2>
            <Lead className="text-[#5c574e] max-w-sm mb-10">
              Successful in career, providing for family, but losing the battle internally. Drag the line.
            </Lead>
            <div className="space-y-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#8a8378] mb-3">Day 01</p>
                <ul className="space-y-3">
                  {CASE_STUDY.beforePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#3a372f] text-sm md:text-base leading-snug">
                      <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-accent pl-5">
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-accent mb-3">Week 12</p>
                <ul className="space-y-3">
                  {CASE_STUDY.afterPoints.map((point, i) => (
                    <li key={i} className="font-display text-xl md:text-2xl uppercase tracking-tight text-[#12110f] leading-none">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <CompareSlider
              before={cld(CASE_STUDY.beforeImg, 1400)}
              after={cld(CASE_STUDY.afterImg, 1400)}
              beforeAlt="Day 01"
              afterAlt="Week 12"
              className="aspect-[4/5] md:aspect-[4/5] lg:aspect-[5/6] w-full border border-[#c9c0ad]"
            />
          </Reveal>
        </div>
      </section>

      {/* STORIES — full-bleed rows, not twin cards */}
      <section id="stories" className="bg-bg border-t border-border">
        <div className="px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-6 max-w-[1600px] mx-auto">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent mb-4">03 — Stories</p>
            <H2>More men. Same protocol.</H2>
          </Reveal>
        </div>
        {TRANSFORMATIONS.map((t, idx) => (
          <Reveal key={t.id}>
            <article className={`grid lg:grid-cols-2 border-t border-border ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="grid grid-cols-2 min-h-[52vh] lg:min-h-[70vh]">
                <div className="relative overflow-hidden frame border-r border-border">
                  <span className="absolute top-4 left-4 z-10 bg-black/70 px-3 py-1 font-mono text-[10px] tracking-[0.24em] uppercase">
                    Before
                  </span>
                  <img src={cld(t.beforeImg, 1100)} alt={`${t.name} before`} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="relative overflow-hidden frame">
                  <span className="absolute top-4 left-4 z-10 bg-accent px-3 py-1 font-mono text-[10px] tracking-[0.24em] uppercase">
                    After
                  </span>
                  <img src={cld(t.afterImg, 1100)} alt={`${t.name} after`} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col justify-end px-6 md:px-12 lg:px-16 py-12 lg:py-20 bg-ink">
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted mb-4">0{idx + 1} — Client</p>
                <H3 className="text-3xl md:text-5xl mb-3">{t.name}</H3>
                <p className="font-display text-accent text-4xl md:text-6xl uppercase leading-none mb-8">{t.result}</p>
                <Body className="italic text-lg md:text-xl max-w-md">“{t.quote}”</Body>
              </div>
            </article>
          </Reveal>
        ))}
        <div className="px-6 py-16 text-center border-t border-border">
          <Button onClick={onApply} size="lg" withIcon>Start Your Transformation</Button>
        </div>
      </section>

      {/* ORIGIN — pinned split film, photos wipe on the right */}
      <section id="about" className="origin-pin bg-bg">
        <div className="origin-stage h-[100svh] grid grid-rows-[1fr_minmax(42vh,auto)] lg:grid-rows-none lg:grid-cols-[minmax(280px,38%)_1fr] overflow-hidden">
          <div className="relative z-20 order-2 lg:order-1 flex flex-col justify-end px-6 md:px-12 lg:px-14 py-10 lg:py-20 bg-bg border-t lg:border-t-0 lg:border-r border-border min-h-[42vh]">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent mb-6 lg:mb-8">04 — Origin</p>
            {CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.id}
                className="origin-copy absolute inset-x-0 bottom-10 lg:bottom-20 px-6 md:px-12 lg:px-14"
                data-origin-copy={index}
                style={{ opacity: index === 0 ? 1 : 0, pointerEvents: index === 0 ? 'auto' : 'none' }}
              >
                <p className="font-display text-[22vw] lg:text-[8.5rem] leading-[0.75] text-white/[0.07] select-none mb-4">
                  0{index + 1}
                </p>
                <H2 className="text-white mb-5">{chapter.title}</H2>
                <Lead className="text-white/85 max-w-md mb-8">{chapter.text}</Lead>
                {index === CHAPTERS.length - 1 && (
                  <Button onClick={onApply} size="lg" withIcon>Apply Now</Button>
                )}
              </div>
            ))}
            <div className="origin-dots flex gap-2 mt-auto relative z-10">
              {CHAPTERS.map((_, i) => (
                <span key={i} className="origin-dot h-px w-10 bg-white/20" data-origin-dot={i} />
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2 min-h-0 overflow-hidden">
            {CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`origin-still absolute inset-0 ${index === 0 ? "z-0" : "z-10"}`}
                data-origin-index={index}
              >
                <img
                  src={cld(chapter.image, 2200)}
                  alt={chapter.title}
                  className={`w-full h-full object-cover ${chapter.crop}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD — stacked editorial rows, not three equal cards */}
      <section id="method" className="bg-bg border-t border-border">
        <div className="px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-10 max-w-[1600px] mx-auto">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent mb-4">05 — Method</p>
            <H2>
              The <Accent>Barakah Body</Accent> Framework
            </H2>
            <Lead>
              Proven system that has helped Muslim men transform their bodies while building discipline that carries into every area of life.
            </Lead>
          </Reveal>
        </div>

        <div className="border-t border-border">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon === "Activity" ? Activity : pillar.icon === "Target" ? Target : Clock;
            return (
              <Reveal key={pillar.title}>
                <article className="pillar-row group grid lg:grid-cols-[140px_1fr_1.1fr] gap-6 lg:gap-12 items-start px-6 md:px-12 lg:px-16 py-12 lg:py-16 border-b border-border hover:bg-ink transition-colors">
                  <div className="font-display text-6xl md:text-7xl text-white/10 group-hover:text-accent/40 leading-none transition-colors">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-5 h-5 text-accent" />
                      <H3 className="mb-0">{pillar.title}</H3>
                    </div>
                    <Body className="max-w-md">{pillar.desc}</Body>
                  </div>
                  <ul className="space-y-3 lg:pt-2">
                    {pillar.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted group-hover:text-white transition-colors">
                        <span className="text-accent">/</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <MacroCalculator />

      <section id="pricing" className="bg-ink border-t border-border">
        <Reveal>
          <div className="px-6 md:px-12 lg:px-16 py-24 md:py-32 max-w-[1100px] mx-auto text-center">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent mb-6">06 — Apply</p>
            <H2>
              One Program. <Accent>Total Reset.</Accent>
            </H2>
            <Lead className="mb-14 max-w-xl mx-auto">
              This is not a PDF workout. This is high-proximity coaching for men who are ready to change their life.
            </Lead>
            <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-14">
              {[
                "Custom Nutrition & Training Protocol",
                "Weekly Accountability & Form Review",
                "Spiritual Habits Integration",
                "Mindset Reframe",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 border border-border p-5">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <Body className="text-white mb-0">{item}</Body>
                </div>
              ))}
            </div>
            <Button onClick={onApply} size="lg" className="w-full md:w-auto min-w-[300px]">
              Apply For Coaching
            </Button>
            <p className="mt-6 text-xs text-muted max-w-md mx-auto">
              Application required. We only work with men who are 100% committed.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
};
