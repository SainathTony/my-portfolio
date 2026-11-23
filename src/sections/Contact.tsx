import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { contact, links, person } from "../data/portfolioData";
import { rng } from "../lib/sketch";
import { EASE, HandUnderline, Reveal, Stamp } from "../components/ink";

function useTornEdge(seed = 5, teeth = 46, depth = 9) {
  return useMemo(() => {
    const r = rng(seed);
    const pts: string[] = [];
    for (let i = 0; i <= teeth; i++) {
      const x = (i / teeth) * 100;
      const y = 2 + r() * depth;
      pts.push(`${x.toFixed(2)}% ${y.toFixed(1)}px`);
    }
    return `polygon(${pts.join(", ")}, 100% 100%, 0% 100%)`;
  }, [seed, teeth, depth]);
}

/** Envelope whose flap swings open (CSS 3D) and lets the letter rise. Back → flap → letter → pocket. */
function Envelope() {
  const ref = useRef<HTMLDivElement>(null);
  const open = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [flapBehind, setFlapBehind] = useState(false);
  const W = 330;
  const BODY = 190;
  const FLAP = Math.round(BODY * 0.45);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-[300px] sm:w-[330px]"
      style={{ height: BODY + FLAP, perspective: 1000 }}
      aria-hidden
    >
      {/* back panel */}
      <div className="absolute inset-x-0 bottom-0 rounded-[2px] bg-[#E6DCC6] shadow-sheet" style={{ height: BODY, zIndex: 1 }} />
      {/* flap, hinged flush on the top edge of the body */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: FLAP,
          height: FLAP,
          transformOrigin: "50% 0%",
          zIndex: flapBehind ? 2 : 5,
        }}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: open ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        onAnimationComplete={() => open && setFlapBehind(true)}
      >
        <svg viewBox={`0 0 ${W} ${FLAP}`} preserveAspectRatio="none" className="block h-full w-full">
          <path d={`M0.5 0.5 L${W - 0.5} 0.5 L${W / 2} ${FLAP - 1} Z`} fill="#DCCFB4" stroke="#CDBF9F" strokeWidth="1" />
        </svg>
      </motion.div>
      {/* the letter */}
      <motion.div
        className="absolute inset-x-9 rounded-[2px] bg-paper-raised px-4 pt-3 shadow-sheet"
        style={{ backgroundImage: "var(--grain)", zIndex: 3, bottom: 12, height: BODY - 30 }}
        initial={{ y: 0 }}
        animate={{ y: open ? (reduce ? -34 : -46) : 0 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: EASE, delay: reduce ? 0 : 0.5 }}
      >
        <p className="hand m-0 text-[17px]">Hi Sainath,</p>
        <p className="hand m-0 mt-0.5 text-[15px] text-ink-muted">we're building agents that need to work in production…</p>
      </motion.div>
      {/* front pocket */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-[2px] bg-[#EFE7D6]"
        style={{
          height: BODY,
          clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)",
          zIndex: 4,
          backgroundImage: "var(--grain)",
        }}
      />
      <Stamp text="OPEN TO WORK" rotate={-9} className="absolute bottom-6 right-4 z-[6]" />
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };
  return (
    <span className="relative inline-flex items-center">
      <button type="button" onClick={copy} className="btn-paper min-h-[40px] px-3" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
      {copied && (
        <motion.span
          className="hand absolute left-full ml-3 whitespace-nowrap text-[20px] text-vermilion"
          initial={{ opacity: 0, rotate: -6, y: 4 }}
          animate={{ opacity: 1, rotate: -6, y: 0 }}
        >
          copied ✓
        </motion.span>
      )}
    </span>
  );
}

export default function Contact() {
  const torn = useTornEdge();
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-16 pt-12 md:pt-20">
      <div style={{ filter: "drop-shadow(0 -3px 4px rgba(74,58,34,.10))" }}>
      <div
        className="sheet relative pb-16 pt-20 md:pb-24 md:pt-28"
        style={{ clipPath: torn, boxShadow: "none" }}
      >
        <div className="page grid items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <p className="label mb-4 flex items-center gap-3">
                <span className="text-vermilion">06</span>
                <span aria-hidden className="h-px w-8 bg-ink/30" />
                <span>Contact</span>
              </p>
              <h2
                id="contact-title"
                className="max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-[560] leading-[1.02] tracking-[-0.02em]"
              >
                {contact.title} <em className="font-[480]">{contact.titleEnd}</em>
              </h2>
              <p className="mt-5 text-[18px] text-ink-muted md:text-[19px]">{contact.body}</p>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={`mailto:${person.email}`}
                  className="group relative break-all font-display text-[clamp(22px,3vw,36px)] font-[500] tracking-[-0.01em] text-ink"
                >
                  {person.email}
                  <HandUnderline
                    seed={12}
                    className="absolute -bottom-1.5 left-0 h-[10px] w-full text-vermilion"
                  />
                </a>
                <CopyEmail />
              </div>
              <ul className="mt-9 flex list-none flex-wrap gap-x-7 gap-y-3 p-0 font-mono text-[13px] uppercase tracking-[0.08em]">
                <li>
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link-ink">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="link-ink">
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a href={links.resume} target="_blank" rel="noopener noreferrer" className="link-ink">
                    Résumé (PDF) ↗
                  </a>
                </li>
              </ul>
              <p className="label mt-6 normal-case tracking-[0.02em]">{person.location}</p>
            </Reveal>
          </div>

          <div className="mt-6 lg:mt-0">
            <Envelope />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
