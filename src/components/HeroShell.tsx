import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowDownRight, Atom, BrainCircuit, Menu, Orbit, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

import type { HeroContent, NavLink } from '../data/site';
import { withBasePath } from '../lib/paths';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';
import { aeonEase } from './motion';

interface HeroShellProps {
  content: HeroContent;
  leftNav: NavLink[];
  mobileNav: NavLink[];
  rightNav: NavLink[];
}

interface Particle {
  delay: string;
  duration: string;
  left: string;
  size: number;
  top: string;
}

const particles = createParticles();

function createParticles(count = 108): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = (index + 1) * 17.731;
    return {
      left: `${(((Math.sin(seed) + 1) / 2) * 100).toFixed(2)}%`,
      top: `${(((Math.cos(seed * 0.67) + 1) / 2) * 100).toFixed(2)}%`,
      size: index % 11 === 0 ? 4 : index % 3 === 0 ? 2 : 1,
      duration: `${(2.1 + (((Math.cos(seed * 1.71) + 1) / 2) * 4.2)).toFixed(2)}s`,
      delay: `${(((Math.sin(seed * 2.31) + 1) / 2) * 3.8).toFixed(2)}s`,
    };
  });
}

const telemetry = [
  { label: 'MODEL CORE', value: 'MACE-MH' },
  { label: 'ACTIVE AGENT', value: 'mace-san' },
  { label: 'WORKSPACE', value: 'NMDL / TOKYO' },
  { label: 'STATUS', value: 'SYNCHRONIZED' },
];

const heroMetrics = [
  { value: '302+', label: 'RESEARCH OUTPUTS' },
  { value: '24', label: 'HUMAN + AI MEMBERS' },
  { value: '6', label: 'MATERIAL VECTORS' },
  { value: '∞', label: 'DESIGN SPACE' },
];

const signalWords = [
  'MACE-SAN',
  'ATOMISTIC AI',
  'MATERIALS INTELLIGENCE',
  'PHYSICAL AI',
  'SPECTROSCOPY',
  'ML POTENTIALS',
  'DESIGNED MATERIALS',
  'OPENCLAW',
  'MACE-SAN',
  'ATOMISTIC AI',
  'MATERIALS INTELLIGENCE',
  'PHYSICAL AI',
  'SPECTROSCOPY',
  'ML POTENTIALS',
  'DESIGNED MATERIALS',
  'OPENCLAW',
];

export default function HeroShell({
  content,
  leftNav,
  mobileNav,
  rightNav,
}: HeroShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const homeHref = withBasePath('/');

  return (
    <MotionConfig reducedMotion="user">
      <section className="mace-command-deck relative min-h-[100svh] overflow-hidden bg-[#07080f] text-white">
        <div className="mace-noise absolute inset-0 opacity-[0.16]" />
        <div className="mace-grid absolute inset-0 opacity-60" />
        <div className="mace-scanline absolute inset-x-0 top-[36%]" />
        <div className="mace-orb mace-orb-lime" />
        <div className="mace-orb mace-orb-pink" />
        <div className="mace-orb mace-orb-cyan" />
        <div className="mace-orbit mace-orbit-one" />
        <div className="mace-orbit mace-orbit-two" />
        <div className="mace-orbit mace-orbit-three" />
        <div className="mace-prism mace-prism-a" />
        <div className="mace-prism mace-prism-b" />
        <div className="mace-prism mace-prism-c" />

        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {particles.map((particle, index) => (
            <span
              key={`${particle.left}-${particle.top}-${index}`}
              className="mace-particle absolute rounded-full bg-white"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: particle.duration,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>

        <header className="relative z-30 flex items-start justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
          <a href={homeHref} className="group flex items-center gap-3 transition-opacity hover:opacity-85">
            <span className="mace-logo-mark grid h-11 w-11 place-items-center rounded-full border border-white/60 text-[#e9ff3f] shadow-[0_0_30px_rgba(233,255,63,0.4)]">
              <Atom size={24} strokeWidth={1.35} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1rem] font-black tracking-[0.17em] text-white">MACE-SAN</span>
              <span className="mt-1 block font-display text-[8px] tracking-[0.28em] text-white/56">MATERIALS INTELLIGENCE</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-white/20 bg-black/20 px-3 py-2 font-display text-[9px] tracking-[0.2em] text-[#e9ff3f] backdrop-blur-md lg:block">
              {content.utilityLabel}
            </span>
            <ThemeToggle variant="hero" />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition hover:border-[#e9ff3f] hover:text-[#e9ff3f] lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mace-mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.nav
              id="mace-mobile-navigation"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.32, ease: aeonEase }}
              className="absolute right-5 top-19 z-40 w-[min(21rem,calc(100vw-2.5rem))] border border-white/20 bg-[#0a0b16]/95 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:hidden"
            >
              <div className="mb-4 font-display text-[9px] tracking-[0.25em] text-[#e9ff3f]">NAVIGATION / ACTIVE</div>
              <ul className="grid gap-3">
                {mobileNav.map((item, index) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex items-center justify-between border-b border-white/10 py-2 font-display text-[12px] tracking-[0.16em] text-white/80 transition hover:border-[#e9ff3f] hover:text-[#e9ff3f]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.label}</span><span className="text-white/35 group-hover:text-[#e9ff3f]">0{index + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>

        <nav className="absolute left-8 top-[21%] z-20 hidden -rotate-[13deg] lg:block">
          <ul className="grid gap-4 font-display text-[10px] tracking-[0.23em] text-white/75">
            {leftNav.map((item, index) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="text-[#e9ff3f]">0{index + 1}</span>
                <a href={item.href} className="transition hover:text-[#e9ff3f]">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="absolute right-8 top-[21%] z-20 hidden rotate-[13deg] lg:block">
          <ul className="grid gap-4 font-display text-[10px] tracking-[0.23em] text-white/75">
            {rightNav.map((item, index) => (
              <li key={item.label} className="flex items-center justify-end gap-3">
                <a href={item.href} className="transition hover:text-[#43e8ff]">{item.label}</a>
                <span className="text-[#43e8ff]">0{index + 4}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col items-center px-5 pb-10 pt-11 text-center sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.72, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.18, duration: 0.9, ease: aeonEase }}
            className="mace-core relative grid h-[122px] w-[122px] place-items-center sm:h-[150px] sm:w-[150px]"
          >
            <div className="absolute inset-0 animate-[spin_17s_linear_infinite] rounded-full border border-dashed border-[#e9ff3f]/80" />
            <div className="absolute inset-[10%] animate-[spin_12s_linear_infinite_reverse] rounded-full border border-[#43e8ff]/65" />
            <div className="absolute inset-[21%] rounded-full border border-[#ff4dad]/70 bg-[#090b14]/70 shadow-[0_0_58px_rgba(255,77,173,0.45),inset_0_0_32px_rgba(233,255,63,0.15)]" />
            <BrainCircuit className="relative z-10 text-[#e9ff3f]" size={46} strokeWidth={1.35} />
            <span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[8px] tracking-[0.24em] text-white/70">AGENT CORE</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.8, ease: aeonEase }}
            className="mt-6 inline-flex items-center gap-2 border border-white/22 bg-black/25 px-3 py-2 font-display text-[9px] tracking-[0.2em] text-[#43e8ff] backdrop-blur-md"
          >
            <Sparkles size={12} /> <span>LIVE RESEARCH COMPANION / v0.∞</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.9, ease: aeonEase }}
            className="mace-title mt-6 max-w-[13ch] font-display text-[3.7rem] font-black leading-[0.76] tracking-[-0.08em] sm:max-w-none sm:text-[6.2rem] md:text-[8.5rem] lg:text-[10.5rem]"
          >
            MATERIALS<br />
            <span className="mace-title-accent">THINK BACK.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66, duration: 0.85, ease: aeonEase }}
            className="mt-7 max-w-3xl text-balance text-[1rem] leading-7 text-white/72 sm:text-[1.12rem] sm:leading-8"
          >
            {content.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.8, ease: aeonEase }}
            className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <a href={content.primaryCta.href} className="mace-button-primary group">
              <span>{content.primaryCta.label}</span><ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a href={content.secondaryCta.href} className="mace-button-secondary group">
              <span>{content.secondaryCta.label}</span><Orbit size={17} className="transition-transform group-hover:rotate-45" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: aeonEase }}
            className="mt-9 grid w-full max-w-6xl grid-cols-2 gap-px border border-white/18 bg-white/18 sm:grid-cols-4"
          >
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="mace-metric min-h-25 px-4 py-4 text-left sm:px-5">
                <div className="font-display text-[2.1rem] font-black leading-none text-white sm:text-[2.6rem]">{metric.value}</div>
                <div className="mt-3 font-display text-[8px] tracking-[0.15em] text-white/60 sm:text-[9px]">{metric.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mace-ticker mt-5 w-[min(94vw,1180px)] overflow-hidden border border-white/16 bg-black/30 py-3 backdrop-blur-md"
          >
            <div className="mace-ticker-track">
              {signalWords.map((word, index) => (
                <span key={`${word}-${index}`} className="mace-ticker-chip">{word}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.12, duration: 0.7 }}
            className="mt-5 grid w-full max-w-6xl gap-1 border-t border-white/15 pt-4 sm:grid-cols-4"
          >
            {telemetry.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 px-1 py-1 text-left sm:block">
                <div className="font-display text-[8px] tracking-[0.16em] text-white/38">{item.label}</div>
                <div className="mt-1 font-display text-[9px] tracking-[0.13em] text-[#e9ff3f]">{item.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
