import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { earlier, education, roles } from "../data/portfolioData";
import type { Role } from "../types/portfolio";
import { roughLine } from "../lib/sketch";
import { Reveal, SectionHeader } from "../components/ink";

function Tick({ seed }: { seed: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 8" className="absolute right-[2px] top-[13px] hidden h-2 w-6 text-ink/70 md:block">
      <path d={roughLine(0, 4, 22, 4, seed, 1)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Entry({ role, i }: { role: Role; i: number }) {
  return (
    <motion.li
      className="relative grid md:grid-cols-[var(--margin-x)_1fr]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative md:pr-10">
        <Tick seed={120 + i} />
        <p className="hand m-0 text-[20px] leading-[32px] md:pl-3 md:text-right">{role.when}</p>
      </div>
      <div className="md:pl-8">
        <h3 className="m-0 text-[26px] font-[560] leading-[32px] tracking-[-0.015em] md:text-[28px]">{role.title}</h3>
        <p className="m-0 flex flex-wrap items-center gap-x-2.5 text-[16px] leading-[32px]">
          <span className="font-medium">{role.company}</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-muted">{role.location}</span>
        </p>
        <p className="m-0 text-[16.5px] italic leading-[32px] text-ink-muted">{role.summary}</p>
        <ul className="m-0 list-none p-0">
          {role.bullets.map((b) => (
            <li key={b} className="relative pl-6 text-[16.5px] leading-[32px]">
              <span aria-hidden className="hand absolute left-0 top-0 text-[18px] leading-[32px] text-vermilion">
                –
              </span>
              {b}
            </li>
          ))}
        </ul>
        <p className="m-0 font-mono text-[12px] leading-[32px] text-ink-muted">{role.stack.join(" · ")}</p>
      </div>
    </motion.li>
  );
}

function Line({ when, text, seed }: { when: string; text: string; seed: number }) {
  return (
    <motion.li
      className="relative grid md:grid-cols-[var(--margin-x)_1fr]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative md:pr-10">
        <Tick seed={seed} />
        <p className="hand m-0 text-[20px] leading-[32px] md:pl-3 md:text-right">{when}</p>
      </div>
      <p className="m-0 text-[16.5px] leading-[32px] text-ink-muted md:pl-8">{text}</p>
    </motion.li>
  );
}

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.55"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const pencil = roughLine(6, 0, 6, 1000, 7, 2.5);

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative scroll-mt-16 py-14 md:py-20">
      <div className="page">
        <SectionHeader id="experience-title" index="03" label="Experience" title="Where I learned it" />

        <Reveal>
          <div className="curl paper-ruled ruled-offset relative rounded-[2px] pb-8 pl-10 pr-5 pt-[32px] shadow-sheet [--margin-x:22px] sm:pr-8 md:pl-0 md:pr-10 md:[--margin-x:220px]">
            <ol ref={listRef} className="relative m-0 list-none space-y-[32px] p-0">
              {/* pencil line drawn down the margin as you read */}
              <svg
                aria-hidden
                viewBox="0 0 12 1000"
                preserveAspectRatio="none"
                className="pointer-events-none absolute bottom-0 left-[calc(var(--margin-x)-14px)] top-0 hidden h-full w-3 text-ink/60 md:block"
              >
                <motion.path
                  d={pencil}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  style={{ pathLength: reduce ? 1 : drawn }}
                />
              </svg>

              {roles.map((r, i) => (
                <Entry key={r.id} role={r} i={i} />
              ))}
              <Line when={earlier.when} text={earlier.text} seed={140} />
              <Line when={education.when} text={education.text} seed={141} />
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
