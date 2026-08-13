import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import type { MemberProfile } from '../data/members';
import { withBasePath } from '../lib/paths';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface MembersSectionProps {
  featured: MemberProfile;
  members: MemberProfile[];
}

export default function MembersSection({ featured, members }: MembersSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="members" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <div className="font-display text-[11px] uppercase tracking-[0.28em] text-accent-blue">Human Layer</div>
              <h2 className="mt-5 break-words font-display text-[2.85rem] leading-none font-bold text-white sm:text-6xl">
                Laboratory Members
              </h2>
              <p className="mt-7 text-lg leading-8 text-white/65 sm:text-xl">
                A research group is not only ideas and outputs. It is also people, roles, and the texture of how a
                laboratory actually works.
              </p>
            </div>

            <a
              href={withBasePath('/members/')}
              className="group inline-flex items-center gap-3 self-start font-display text-[12px] uppercase tracking-[0.24em] text-white/72 transition-colors duration-300 hover:text-accent-blue"
            >
              View Members
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
            </a>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
            <motion.a
              href={withBasePath('/members/')}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewViewport}
              transition={fadeUpTransition}
              className="group overflow-hidden border border-white/10 bg-white/[0.03]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={withBasePath(featured.image)}
                  alt={featured.name}
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                />
              </div>
              <div className="p-7 sm:p-8">
                <div className="font-display text-[10px] uppercase tracking-[0.24em] text-warm-gold">Featured Member</div>
                <h3 className="mt-4 break-words font-display text-[2.1rem] leading-none text-white sm:text-[2.6rem]">
                  {featured.name}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-accent-blue">{featured.role}</p>
                <p className="mt-5 text-[1.02rem] leading-7 text-white/72">{featured.note}</p>
                {featured.email ? <p className="mt-5 text-sm text-white/54">{featured.email}</p> : null}
              </div>
            </motion.a>

            <div className="grid gap-4 sm:grid-cols-2">
              {members.map((member, index) => (
                <motion.a
                  key={`${member.group}-${member.name}`}
                  href={withBasePath('/members/')}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewViewport}
                  transition={{ duration: 0.72, delay: index * 0.05, ease: aeonEase }}
                  className="group overflow-hidden border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-accent-blue/40"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={withBasePath(member.image)}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="font-display text-[10px] uppercase tracking-[0.24em] text-warm-gold">{member.group}</div>
                    <h3 className="mt-3 break-words font-display text-[1.35rem] leading-none text-white">{member.name}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.18em] text-accent-blue">{member.role}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
