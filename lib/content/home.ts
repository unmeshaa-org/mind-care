import type { LucideIcon } from 'lucide-react';
import { Heart, Sparkles, Target, UserRound } from 'lucide-react';

export type BenefitItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const benefitItems: BenefitItem[] = [
  {
    title: 'Individuals',
    text: 'One-on-one support for anxiety, mood, life transitions, and building emotional resilience in a confidential space.',
    icon: UserRound,
  },
  {
    title: 'Couples & families',
    text: 'Strengthen communication, navigate conflict with care, and rebuild connection through guided conversations.',
    icon: Heart,
  },
  {
    title: 'Professionals & students',
    text: 'Manage burnout, performance pressure, and focus — with practical tools that fit demanding schedules.',
    icon: Target,
  },
  {
    title: 'Anyone seeking growth',
    text: 'Whether you are starting out or deepening self-awareness, sessions are paced to your goals and comfort.',
    icon: Sparkles,
  },
];

export type WorkRealm = { title: string; text: string };

export const workRealms: WorkRealm[] = [
  {
    title: 'One-on-one counseling',
    text: 'Personalized sessions for anxiety, depression, stress, and everyday emotional challenges in a calm, non-judgmental setting.',
  },
  {
    title: 'Confidence & self-belief',
    text: 'Build a steadier inner voice with techniques drawn from cognitive and strengths-based approaches.',
  },
  {
    title: 'Emotional regulation',
    text: 'Mindfulness, grounding, and reframing skills to respond — not react — when life feels overwhelming.',
  },
  {
    title: 'Goals & motivation',
    text: 'Clarify what matters, break patterns that hold you back, and stay accountable to meaningful change.',
  },
  {
    title: 'Mental skills for performance',
    text: 'Focus, pre-event routines, and stress plans for study, work, or sport — without losing balance.',
  },
  {
    title: 'Leadership & communication',
    text: 'For managers and caregivers: clearer boundaries, empathy, and presence in high-stakes moments.',
  },
];

export type Testimonial = { quote: string; name: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      'I finally have language for what I was carrying. Sessions feel structured but never cold — I leave with something practical every time.',
    name: 'Anonymous client',
  },
  {
    quote:
      'The blend of listening and real strategies helped me through a rough work season. I recommend Mind Care without hesitation.',
    name: 'Professional client',
  },
];

export const serviceBullets: string[] = [
  'Individual counseling tailored to your challenges and strengths',
  'Stress, burnout, and anxiety management',
  'Couple and family-oriented support (where appropriate)',
  'Mindfulness and grounding for day-to-day balance',
  'Performance and focus strategies for study or work',
  'Referrals and coordination when specialized care is needed',
];
