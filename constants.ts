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
  title: "From Fog to Focus",
  beforePoints: [
    "Successful on paper but suffering internally.",
    "No routine to support his health.",
    "Significant weight gain left him uncomfortable in his own clothes.",
    "Poor health and constant lethargy quietly eroded his quality of life."
  ],
  afterPoints: [
    "Energy is steady, his body leaner.",
    "Mental clarity replaced brain fog.",
    "Approaches challenges with focus and composure."
  ]
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
    title: "Time Efficient Training",
    desc: "Strength and fat loss through high-impact workouts that fit into a busy schedule, without spending hours in the gym.",
    icon: "Clock",
    benefits: [
      "45-Min High-Output Sessions",
      "3-4 Days Per Week Frequency",
      "Science-Based Hypertrophy",
      "Zero 'Junk Volume'"
    ]
  },
  {
    title: "Fast Meal Prep",
    desc: "Removes complexity from nutrition, making fat loss and muscle growth sustainable without living in the kitchen or giving up the foods you enjoy.",
    icon: "Activity",
    benefits: [
      "High-Protein Simple Recipes",
      "No Obsessive Macro Tracking",
      "Family-Friendly Meals",
      "Sustainable Energy Levels"
    ]
  },
  {
    title: "Taqwa Accountability",
    desc: "Creates consistency by enforcing structure and excellence, especially when motivation is low.",
    icon: "Target",
    benefits: [
      "Daily Fajr Check-ins",
      "Private Brotherhood Group",
      "Weekly Form Reviews",
      "Spiritual & Physical Alignment"
    ]
  }
];