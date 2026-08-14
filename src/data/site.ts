import { withBasePath } from '../lib/paths';

export interface NavLink {
  href: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  paragraph: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  utilityLabel: string;
}

export interface MissionCardProps {
  description: string;
  href: string;
  icon: 'satellite' | 'rocket' | 'star';
  status: string;
  statusTone: 'green' | 'blue' | 'gold';
  title: string;
}

export interface SpectrumBarProps {
  value: number;
}

export interface StatBlockProps {
  label: string;
  value: string;
}

export interface LaunchRowProps {
  date: string;
  detail: string;
  href: string;
  time: string;
  title: string;
}

export interface DiscoveryContent {
  archiveHref: string;
  archiveLabel: string;
  body: string;
  cta: NavLink;
  image: string;
  label: string;
  rangeEnd: string;
  rangeStart: string;
  title: string;
}

export interface NextDepartureContent {
  allHref: string;
  image: string;
  label: string;
  launchDate: string;
  launchTime: string;
  title: string;
}

export interface FooterMeta {
  description: string;
  title: string;
}

export const siteNav: NavLink[] = [
  { label: 'Research', href: withBasePath('/research/') },
  { label: 'Publications', href: withBasePath('/publications/') },
  { label: 'Members', href: withBasePath('/members/') },
  { label: 'Alumni', href: withBasePath('/alumni/') },
  { label: 'News', href: withBasePath('/news/') },
  { label: 'Environment', href: withBasePath('/environment/') },
  { label: 'Join', href: withBasePath('/join/') },
  { label: 'About', href: withBasePath('/about/') },
];

export const heroLeftNav: NavLink[] = [
  { label: 'Research', href: withBasePath('/research/') },
  { label: 'Publications', href: withBasePath('/publications/') },
  { label: 'Members', href: withBasePath('/members/') },
];

export const heroRightNav: NavLink[] = [
  { label: 'Environment', href: withBasePath('/environment/') },
  { label: 'News', href: withBasePath('/news/') },
  { label: 'About', href: withBasePath('/about/') },
];

export const mobileNav: NavLink[] = [...heroLeftNav, ...heroRightNav];

export const heroContent: HeroContent = {
  eyebrow: 'NMDL PLAYGROUND',
  paragraph:
    'Nano Materials Design Laboratory explores how atomic structure, bonding, spectroscopy, simulation, measurement, and AI can be fused into a single high-energy pipeline for designed materials. This playground is the experimental high-voltage version of that story.',
  primaryCta: {
    href: withBasePath('/research/'),
    label: 'Explore Research',
  },
  secondaryCta: {
    href: withBasePath('/publications/'),
    label: 'See Publications',
  },
  utilityLabel: 'EXPERIMENTAL / UNOFFICIAL',
};

export const stats: StatBlockProps[] = [
  { value: '302+', label: 'Manuscripts in archive' },
  { value: '23', label: 'Current members' },
  { value: '6', label: 'Research directions' },
  { value: '2025', label: 'Renewed lab space' },
];

export const footerMeta: FooterMeta = {
  title: 'NMDL',
  description:
    'Nano Materials Design Laboratory, The University of Tokyo. Experimental design prototype for a more cinematic and research-forward web presence.',
};

export const footerDirectory: NavLink[] = [...siteNav];

export const footerPolicies: string[] = ['Preview', 'Experimental', 'Unofficial'];
