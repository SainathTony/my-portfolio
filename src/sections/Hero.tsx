import { motion, useReducedMotion } from "framer-motion";
import { hero, links, person, proofPoints } from "../data/portfolioData";
import { roughArrow } from "../lib/sketch";
import { DrawPath, HandCircle, HandUnderline, Highlight } from "../components/ink";
// Small wrapper (SVG poster + trail). three.js itself is dynamically imported inside it after idle.
import PaperPlane from "../components/plane/PaperPlane";

/** "not demos." — tucked under the right end of the marker circle, arrow pointing up at it. */
function MarginNote() {
  const reduce = useReducedMotion();
  const arrow = roughArrow(46, 34, 14, 4, 0.3, 21, 8);
  return (
    <motion.span
      aria-hidden
      className="hand pointer-events-none absolute right-[-0.2em] top-[100%] mt-[0.12em] block whitespace-nowrap pl-12 text-[18px] leading-none tracking-normal md:text-[24px]"
      initial={{ opacity: 0, rotate: -5 }}
      animate={{ opacity: 1, rotate: -5 }}
      transition={{ delay: reduce ? 0 : 1.9, duration: 0.4 }}
    >
      <svg
        viewBox="0 0 56 40"
        className="absolute left-0 top-[-22px] h-[40px] w-[56px] overflow-visible text-fountain"
      >
        <DrawPath d={arrow.shaft} delay={reduce ? 0 : 2} duration={0.5} />
        <DrawPath d={arrow.head} delay={reduce ? 0 : 2.4} duration={0.2} />
      </svg>
      {hero.marginNote}
    </motion.span>
  );
}

/** Zigzag top & bottom edges, like a till receipt torn off the roll. */
function receiptClip(teeth = 90, depth = 7) {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= teeth; i++) {
    const x = ((i / teeth) * 100).toFixed(3);
    top.push(`${x}% ${i % 2 ? depth : 0}px`);
    bottom.unshift(`${x}% calc(100% - ${i % 2 ? depth : 0}px)`);
  }
  return `polygon(${[...top, ...bottom].join(", ")})`;
}
const RECEIPT_CLIP = receiptClip();

function ProofStrip() {
  return (
    <div
      className="rise relative mt-8 md:col-span-12 md:mt-4"
      style={{ filter: "drop-shadow(0 6px 7px rgba(74,58,34,.16))", animationDelay: "450ms" }}
    >
      <div
        className="bg-paper-raised px-5 pb-7 pt-6 sm:px-7"
        style={{ clipPath: RECEIPT_CLIP, backgroundImage: "var(--grain)" }}
      >
        <p className="flex justify-between border-b border-dashed border-ink/25 pb-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
          <span>Receipt No. 0006 · HYD</span>
          <span aria-hidden>items: {proofPoints.length}</span>
        </p>
        <dl className="mt-4 grid grid-cols-2 md:grid-cols-4">
          {proofPoints.map((p, i) => (
            <div
              key={p.value}
              className={`py-2 pr-4 md:px-6 md:first:pl-0 ${i % 2 ? "border-l border-dashed border-ink/25 pl-4" : ""} ${
                i > 1 ? "border-t border-dashed border-ink/25 pt-4 md:border-t-0 md:pt-2" : ""
              } ${i === 2 ? "md:border-l md:border-dashed md:border-ink/25" : ""}`}
            >
              <dt className="sr-only">{p.label}</dt>
              <dd className="m-0">
                <span className="block font-display text-[34px] font-[560] leading-none tracking-[-0.02em] md:text-[44px]">
                  <Highlight delay={900 + i * 140}>{p.value}</Highlight>
                </span>
                <span className="mt-2 block max-w-[26ch] text-[14.5px] leading-snug text-ink-muted">{p.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function Hero() {

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip pb-14 pt-24 md:pb-16 md:pt-28">
      <div
        aria-hidden
        className="paper-dots absolute inset-0 -z-0"
        style={{
          maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
        }}
      />

      <div className="page relative">
        <div className="grid items-center gap-y-6 md:grid-cols-12 md:gap-x-6">
          <div className="relative z-10 md:col-span-7">
            <p className="rise label" style={{ animationDelay: "50ms" }}>
              {person.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="rise mt-5 text-[clamp(38px,5.3vw,76px)] font-[560] leading-[1.04] tracking-[-0.025em]"
              style={{ animationDelay: "120ms" }}
            >
              {hero.headlineStart}{" "}
              <span className="relative inline-block whitespace-nowrap">
                <HandCircle seed={9} delay={1.1} padX={0.3} padTop={-0.12} padBottom={0.11} strokeWidth={3} className="pt-[0.06em]">
                  {hero.headlineCircled}
                </HandCircle>
                .
                <MarginNote />
              </span>
            </h1>

            <p
              className="rise mt-11 max-w-[54ch] text-[18px] leading-relaxed text-ink-muted md:mt-12 md:text-[19.5px]"
              style={{ animationDelay: "220ms" }}
            >
              {hero.sub}
            </p>

            <div className="rise mt-8 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: "300ms" }}>
              <a href="#ai" className="btn-ink">
                See the AI work <span aria-hidden>↓</span>
              </a>
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex min-h-[44px] items-center text-[16px] font-medium text-ink"
              >
                Résumé (PDF) <span aria-hidden className="ml-1.5">↗</span>
                <HandUnderline
                  seed={8}
                  className="absolute -bottom-0.5 left-0 h-[9px] w-full text-vermilion transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
              <span className="flex items-center gap-4 font-mono text-[12.5px] uppercase tracking-[0.08em]">
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link-ink inline-flex min-h-[44px] items-center">
                  LinkedIn ↗
                </a>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="link-ink inline-flex min-h-[44px] items-center">
                  GitHub ↗
                </a>
              </span>
            </div>
          </div>

          {/* on phones the receipts come before the plane, so the evidence is on the first screen */}
          <div className="relative order-last mt-2 h-[250px] sm:h-[380px] md:order-none md:col-span-5 md:mt-0 md:h-[540px]">
            {/* the canvas bleeds past the column so wings and shadow never hit an edge */}
            <div className="absolute -inset-x-5 -bottom-2 -top-4 md:-left-10 md:-right-[max(32px,calc((100vw-1200px)/2))]">
              <PaperPlane />
            </div>
            <p className="label absolute -bottom-5 right-0 text-[11px] normal-case tracking-[0.04em] text-ink-faint md:-bottom-3">
              fig. 1 — an agent spec, folded for flight (click it)
            </p>
          </div>

          <ProofStrip />
        </div>
      </div>
    </section>
  );
}
