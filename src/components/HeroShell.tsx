import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

interface HeroStar {
  delay: string;
  duration: string;
  left: string;
  size: number;
  top: string;
}

const heroStars = createHeroStars();

function createHeroStars(count = 60): HeroStar[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = (index + 1) * 19.37;
    const left = ((Math.sin(seed) + 1) / 2) * 100;
    const top = 2 + (((Math.cos(seed * 0.73) + 1) / 2) * 21);
    const size = 1 + (((Math.sin(seed * 1.7) + 1) / 2) > 0.55 ? 1 : 0);
    const duration = 2 + (((Math.cos(seed * 1.31) + 1) / 2) * 3);
    const delay = ((Math.sin(seed * 2.1) + 1) / 2) * 3.2;

    return {
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      size,
      duration: `${duration.toFixed(2)}s`,
      delay: `${delay.toFixed(2)}s`,
    };
  });
}

export default function HeroShell({
  content,
  leftNav,
  mobileNav,
  rightNav,
}: HeroShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const homeHref = withBasePath('/');
  const heroMetrics = [
    { value: '302+', label: 'Manuscripts archived' },
    { value: '23', label: 'Current members' },
    { value: '6', label: 'Research directions' },
    { value: '2025', label: 'Lab renewal' },
  ];
  const signalWords = [
    'AI AGENTS',
    'PHYSICAL AI',
    'STEM-EELS',
    'XANES',
    'DFT',
    'ML POTENTIALS',
    'DESIGNED MATERIALS',
    'ATOMIC-SCALE ANALYSIS',
  ];
  const orbitalRings = [
    {
      size: 'min(55vw, 500px)',
      borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    {
      size: 'min(38vw, 360px)',
      borderColor: 'rgba(255, 255, 255, 0.10)',
    },
    {
      size: 'min(24vw, 220px)',
      borderColor: 'rgba(74, 158, 255, 0.25)',
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[100svh] overflow-hidden bg-page-cream">
        <div
          className="absolute inset-0 z-0 overflow-hidden bg-dark-space"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 10%, 50% 26%, 0 10%)',
          }}
        >
          <div className="hero-grid absolute inset-0" />
          <img
            src={withBasePath('/images/top_hero_image.png')}
            alt=""
            className="hero-sky-image absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="hero-aurora hero-aurora-left absolute -left-[12%] top-[-8%] h-[24rem] w-[24rem] rounded-full blur-3xl" />
          <div className="hero-aurora hero-aurora-right absolute right-[-10%] top-[4%] h-[22rem] w-[22rem] rounded-full blur-3xl" />
          <div className="hero-beam absolute left-1/2 top-[-5%] h-[42rem] w-[16rem] -translate-x-1/2 rotate-[18deg]" />
          <div className="hero-beam absolute left-[18%] top-[6%] h-[26rem] w-[8rem] rotate-[28deg] opacity-60" />
          <div className="hero-beam absolute right-[16%] top-[2%] h-[24rem] w-[7rem] -rotate-[24deg] opacity-55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(74,158,255,0.25),transparent_45%),radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_42%)]" />
          <div className="hero-scanline absolute inset-x-0 top-[22%] h-px" />

          {heroStars.map((star, index) => (
            <span
              key={`${star.left}-${star.top}-${index}`}
              className="hero-star absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: star.duration,
                animationDelay: star.delay,
              }}
            />
          ))}

          {orbitalRings.map((ring) => (
            <div
              key={ring.size}
              className="absolute rounded-full border"
              style={{
                left: '50%',
                top: '8%',
                width: ring.size,
                height: ring.size,
                transform: 'translate(-50%, -50%)',
                borderColor: ring.borderColor,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-10">
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
            <a href={homeHref} className="inline-flex items-center transition-opacity duration-300 hover:opacity-80">
              <BrandLogo tone="dark" />
            </a>
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <span className="hero-utility-label hidden font-display text-[10px] uppercase tracking-[0.25em] lg:block">
                {content.utilityLabel}
              </span>
              <ThemeToggle variant="hero" />
              <button
                type="button"
                className="rounded-full border border-navy-text/15 bg-page-cream/78 p-2 text-navy-text backdrop-blur-sm transition-colors duration-300 hover:bg-white lg:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.nav
                id="mobile-navigation"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: aeonEase }}
                className="absolute inset-x-5 top-18 z-30 rounded-[1.5rem] border border-navy-text/10 bg-[rgba(232,223,200,0.96)] px-5 py-4 shadow-[0_22px_52px_rgba(6,10,18,0.18)] backdrop-blur-sm lg:hidden"
              >
                <ul className="flex flex-col gap-3">
                  {mobileNav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block font-display text-[11px] uppercase tracking-[0.24em] text-navy-text transition-colors duration-300 hover:text-accent-blue"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ) : null}
          </AnimatePresence>

          <div
            className="absolute z-30 hidden lg:block"
            style={{
              left: '25%',
              top: '21%',
              transform: 'translate(-50%, -50%) rotate(10deg)',
            }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: aeonEase }}
            >
              <ul className="flex items-center gap-7 font-display text-[11px] uppercase tracking-[0.24em] text-navy-text">
                {leftNav.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-7">
                    <a className="transition-colors duration-300 hover:text-accent-blue" href={item.href}>
                      {item.label}
                    </a>
                    {index < leftNav.length - 1 ? <span className="text-navy-text/35">|</span> : null}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </div>

          <div
            className="absolute z-30 hidden lg:block"
            style={{
              left: '75%',
              top: '21%',
              transform: 'translate(-50%, -50%) rotate(-10deg)',
            }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: aeonEase }}
            >
              <ul className="flex items-center gap-7 font-display text-[11px] uppercase tracking-[0.24em] text-navy-text">
                {rightNav.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-7">
                    <a className="transition-colors duration-300 hover:text-accent-blue" href={item.href}>
                      {item.label}
                    </a>
                    {index < rightNav.length - 1 ? <span className="text-navy-text/35">|</span> : null}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </div>

          <div className="absolute left-1/2 top-[23%] z-20 -translate-x-1/2 -translate-y-1/2 sm:top-[24%] md:top-[25%] lg:top-[26%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.85, ease: aeonEase }}
              className="relative flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-full border border-white/55 bg-[radial-gradient(circle_at_30%_30%,#fffdf7,#f2e8d7_70%,#e8dcc8)] shadow-[0_18px_54px_rgba(0,0,0,0.28),0_0_90px_rgba(74,158,255,0.22)] sm:h-[110px] sm:w-[110px] lg:h-[136px] lg:w-[136px]"
            >
              <div className="absolute inset-[10%] rounded-full border border-white/35 opacity-70" />
              <div className="absolute inset-[-18%] rounded-full border border-accent-blue/20" />
              <BrandLogo kind="symbol" className="w-[64%] sm:w-[66%]" tone="light" />
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-center px-6 pb-10 pt-[9.5rem] text-center sm:px-8 sm:pb-14 sm:pt-[12rem] md:pt-[14rem] lg:pb-16 lg:pt-[18rem]">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: aeonEase }}
              className="max-w-[11ch] font-display text-[1.65rem] leading-[0.92] font-bold uppercase tracking-[0.03em] text-navy-text sm:max-w-none sm:text-[2.5rem] md:text-[3.35rem] lg:text-[5.5rem]"
            >
              <span className="block">{content.eyebrow}</span>
              <span className="mt-3 block bg-[linear-gradient(to_right,#1a5fa0,#4a9eff,#8b6532)] bg-clip-text text-transparent [text-shadow:0_0_24px_rgba(74,158,255,0.18)]">
                DESIGNED MATERIALS
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: aeonEase }}
              className="text-balance mt-5 max-w-md text-[0.98rem] font-light leading-7 text-muted-navy/75 sm:mt-6 sm:max-w-2xl sm:text-[1.04rem] sm:leading-8 md:max-w-3xl md:text-[1.08rem]"
            >
              {content.paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.85, ease: aeonEase }}
              className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:mt-9 sm:flex-row sm:justify-center"
            >
              <a
                href={content.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center bg-navy-text px-8 font-display text-[10px] uppercase tracking-[0.22em] text-page-cream transition-colors duration-300 hover:bg-accent-blue"
              >
                {content.primaryCta.label}
              </a>
              <a
                href={content.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center border border-navy-text/35 px-8 font-display text-[10px] uppercase tracking-[0.22em] text-navy-text transition-colors duration-300 hover:border-accent-blue hover:text-accent-blue"
              >
                {content.secondaryCta.label}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.85, ease: aeonEase }}
              className="mt-8 grid w-full max-w-5xl gap-3 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4"
            >
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="hero-metric-card px-5 py-4 text-left backdrop-blur-md">
                  <div className="font-display text-[1.6rem] leading-none font-bold text-navy-text sm:text-[1.9rem]">
                    {metric.value}
                  </div>
                  <div className="mt-3 font-display text-[10px] uppercase tracking-[0.22em] text-muted-navy/80">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.02, duration: 0.85, ease: aeonEase }}
              className="hero-ticker mt-5 w-[min(92vw,1100px)] overflow-hidden rounded-full border border-navy-text/10 bg-page-cream/68 py-3 backdrop-blur-md"
            >
              <div className="ticker-track">
                {[...signalWords, ...signalWords].map((word, index) => (
                  <span key={`${word}-${index}`} className="ticker-chip">
                    {word}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.1, duration: 0.8, ease: aeonEase }}
              className="mt-8 hidden h-8 w-px origin-top bg-[linear-gradient(to_bottom,rgba(26,46,66,0.4),rgba(26,46,66,0))] 2xl:block"
            />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
