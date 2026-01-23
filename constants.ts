import { NavItem, Transformation, ProgramPillar } from './types';

// Using the uploaded images mapped to logical constants
export const IMAGES = {
  hero: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888771/Brother_Yusuf_triceps_qrmqph.jpg",
  
  // Story / About Section Images
  storyAbyss: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888801/BY_before_gkzrrv.png",
  storyAwakening: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888771/Prayer_onkyve.jpg",
  storyVessel: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888771/Brother_Yusuf_tricep_2_zvwjez.jpg",

  prayer: "https://file.rendit.io/n/image_17.png", 
  action1: "https://file.rendit.io/n/image_12.png", 
  action2: "https://file.rendit.io/n/image_14.png", 
  aesthetic: "https://file.rendit.io/n/image_15.png", 
  coachPortrait: "https://file.rendit.io/n/image_1.png", 
  logoWhite: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888984/White_Logo_fi1ujy.png", 
  logoBlack: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888984/White_Logo_fi1ujy.png", 
};

export const CASE_STUDY = {
  beforeImg: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888799/casestudy-before_rccwv2.jpg",
  afterImg: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888799/casestudy-after_bzecwq.jpg",
  title: "Paper success to real alignment.",
  beforeText: "Before, he was successful on paper but suffering internally. He worked relentlessly while neglecting his body—brain fog, low energy, bloating, and digestive issues became normal. With no routine outside work, weight gain left him uncomfortable in his own clothes. Outwardly fine. Internally drained.",
  afterText: "Twelve weeks later, you see alignment. His energy is steady. His body is leaner and noticeably stronger. Mental clarity replaced brain fog, and stress no longer controls his decisions. He shows up with focus and composure—and even performs better at work by handling more physical tasks himself. Despite a demanding schedule, his discipline is consistent. He moves with greater control and gratitude."
};

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: 1,
    beforeImg: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888799/transformation-1-before_i0dl1u.jpg",
    afterImg: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888799/transformation-1-after_fim5h8.jpg",
    name: "Brother Ahmed",
    result: "Lost 42 lbs",
    quote: "I was drowning in fog. Now I lead my family."
  },
  {
    id: 2,
    beforeImg: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888800/transformation-2-before_yr23nz.jpg",
    afterImg: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888800/transformation-2-after_nhhimw.jpg",
    name: "Brother Karim",
    result: "Rebuilt Core",
    quote: "The discipline in the gym fixed my salah."
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Method", href: "/#method" },
  { label: "Stories", href: "/#stories" },
  { label: "Pricing", href: "/#pricing" },
];

export const PILLARS: ProgramPillar[] = [
  {
    title: "Metabolic Reset",
    desc: "Strip fat without starving. Nutrition designed for high performance.",
    icon: "Activity"
  },
  {
    title: "Ihsan Accountability",
    desc: "Daily check-ins. We don't just count reps, we count intentions.",
    icon: "Target"
  },
  {
    title: "Barakah Scheduling",
    desc: "Workouts built around your Salah, not against it.",
    icon: "Clock"
  }
];

// Social Media & Booking Configuration
export const SOCIAL_CONFIG = {
  instagram: {
    username: "BrotherYusuf.Fit",
    embedUrl: "https://www.instagram.com/BrotherYusuf.Fit/embed"
  },
  calendly: {
    url: "https://calendly.com/brotheryusuf-fit/30min"
  }
};