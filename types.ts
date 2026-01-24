export interface NavItem {
  label: string;
  href: string;
}

export interface Transformation {
  id: number;
  beforeImg: string;
  afterImg: string;
  name: string;
  result: string;
  quote: string;
}

export interface ProgramPillar {
  title: string;
  desc: string;
  icon: string;
  benefits: string[];
}

export interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  cta: string;
  isPopular?: boolean;
}