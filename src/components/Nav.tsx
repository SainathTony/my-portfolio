import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { links, person } from "../data/portfolioData";
import { squiggle } from "../lib/sketch";
import { EASE } from "./ink";

const NAV_ITEMS = [
  { id: "ai", label: "AI work" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio);
        // the section occupying most of the reading band wins
        let best = "";
        let bestRatio = 0;
        for (const [id, r] of seen) if (r > bestRatio) [best, bestRatio] = [id, r];
        setActive(bestRatio > 0 ? best : "");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function Squiggle() {
  return (
    <motion.svg
      layoutId="nav-squiggle"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute -bottom-[7px] left-0 h-[8px] w-full text-vermilion"
      transition={{ duration: 0.3, ease: EASE }}
    >
      <path
        d={squiggle(100, 5, 2)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

export default function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-paper/[0.97] shadow-[0_1px_0_rgba(29,27,24,0.12)]"
          : "bg-transparent"
      }`}
    >
      <nav className="page flex h-16 items-center justify-between" aria-label="Primary">
        <a
          href="#top"
          className="font-display text-[22px] italic tracking-[-0.01em] text-ink"
          style={{ fontVariationSettings: '"SOFT" 60, "WONK" 1' }}
          onClick={() => setOpen(false)}
        >
          {person.shortName}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative font-mono text-[12.5px] uppercase tracking-[0.08em] transition-colors duration-200 hover:text-ink ${
                  active === item.id ? "text-ink" : "text-ink-muted"
                }`}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
                {active === item.id && <Squiggle />}
              </a>
            </li>
          ))}
          <li>
            <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn-paper">
              Résumé <span aria-hidden>↗</span>
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="btn-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="md:hidden"
          >
            <ul className="page sheet paper-ruled mb-3 py-2 [--margin-x:40px]">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center gap-4 pl-14 font-display text-[22px]"
                  >
                    <span className="font-mono text-[11px] text-vermilion">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center gap-4 pl-14 font-display text-[22px]"
                >
                  <span className="font-mono text-[11px] text-vermilion">↗</span>
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
