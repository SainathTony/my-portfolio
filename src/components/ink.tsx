/*
 * Ink & paper primitives: hand-drawn marks, highlighter, stamps, tape,
 * and the one entrance animation used site-wide.
 */
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { roughEllipse, squiggle } from "../lib/sketch";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** useId() output is not always valid inside url(#…) references. */
function useSafeId() {
  return useId().replace(/[^a-zA-Z0-9_-]/g, "");
}

/* ------------------------------------------------------------------ Reveal */

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Resting rotation in degrees — elements settle into it. */
  rotate?: number;
};

/** Opacity + 12px rise, once, at 30% visibility. */
export function Reveal({ delay = 0, rotate = 0, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, rotate: rotate * 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------- Highlight */

/** Highlighter swipe that draws on when scrolled into view. Metrics only. */
export function Highlight({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <span
      ref={ref}
      className={`hl ${inView ? "is-on" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------- useBoxSize */

/**
 * Pixel size of an element. Hand-drawn marks are generated in real pixels:
 * stretching a fixed viewBox distorts the stroke, and framer's pathLength
 * breaks under vector-effect="non-scaling-stroke".
 */
function useBoxSize<T extends Element>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      setSize((s) => (s && s.w === w && s.h === h ? s : { w, h }));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

/* -------------------------------------------------------------- HandCircle */

/** Red marker circle drawn around inline content. Paddings are in em. */
export function HandCircle({
  children,
  seed = 7,
  color = "var(--vermilion)",
  delay = 0.9,
  padX = 0.22,
  padY = 0.32,
  padTop,
  padBottom,
  strokeWidth = 2.6,
  className = "",
}: {
  children: ReactNode;
  seed?: number;
  color?: string;
  delay?: number;
  padX?: number;
  /** shorthand for top & bottom padding */
  padY?: number;
  padTop?: number;
  padBottom?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const top = padTop ?? padY;
  const bottom = padBottom ?? padY * 0.7;
  const reduce = useReducedMotion();
  const [ref, size] = useBoxSize<SVGSVGElement>();
  const d = size
    ? roughEllipse(size.w / 2, size.h / 2, size.w / 2 - 3, size.h / 2 - 3, seed, 0.05)
    : "";
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        ref={ref}
        aria-hidden
        viewBox={size ? `0 0 ${size.w} ${size.h}` : undefined}
        className="pointer-events-none absolute overflow-visible"
        style={{
          left: `${-padX}em`,
          top: `${-top}em`,
          width: `calc(100% + ${padX * 2}em)`,
          height: `calc(100% + ${top + bottom}em)`,
        }}
      >
        {size && (
          <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0.9 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.1, ease: [0.65, 0, 0.35, 1], delay }}
          />
        )}
      </svg>
    </span>
  );
}

/* ---------------------------------------------------------- HandUnderline */

/** A loose marker squiggle that fills its own (CSS-sized) box. */
export function HandUnderline({
  seed = 3,
  color = "currentColor",
  className = "",
  draw = true,
}: {
  seed?: number;
  color?: string;
  className?: string;
  draw?: boolean;
}) {
  const reduce = useReducedMotion();
  const [ref, size] = useBoxSize<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={size ? `0 0 ${size.w} 10` : undefined}
      preserveAspectRatio="none"
      className={`pointer-events-none overflow-visible ${className}`}
    >
      {size && (
        <motion.path
          d={squiggle(size.w, seed)}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: draw && !reduce ? 0 : 1 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: 0.2 }}
        />
      )}
    </svg>
  );
}

/* -------------------------------------------------------------- DrawPath */

/** An SVG path that draws itself on when in view. */
export function DrawPath({
  d,
  delay = 0,
  duration = 1.1,
  stroke = "currentColor",
  strokeWidth = 1.6,
  dashed = false,
  className,
  style,
}: {
  d: string;
  delay?: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const maskId = `draw-${useSafeId()}`;
  if (dashed) {
    return (
      <g className={className} style={style}>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <motion.path
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth={strokeWidth * 5}
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0 : duration, ease: [0.65, 0, 0.35, 1], delay }}
            />
          </mask>
        </defs>
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="5 7"
          mask={`url(#${maskId})`}
        />
      </g>
    );
  }
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
      whileInView={reduce ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        pathLength: { duration, ease: [0.65, 0, 0.35, 1], delay },
        opacity: { duration: 0.01, delay },
      }}
    />
  );
}

/* ------------------------------------------------------------------ Stamp */

/** Vermilion rubber stamp with uneven ink. */
export function Stamp({
  text,
  rotate = -8,
  className = "",
  size = "md",
}: {
  text: string;
  rotate?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const id = useSafeId();
  const fs = size === "sm" ? 11 : 13.5;
  const padX = size === "sm" ? 9 : 12;
  const h = size === "sm" ? 26 : 34;
  const w = Math.round(text.length * fs * 0.68 + padX * 2);
  return (
    <svg
      aria-label={text}
      role="img"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={`pointer-events-none select-none mix-blend-multiply ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <filter id={`ink-${id}`} x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={text.length} result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.6"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="inked" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed={3} result="warp" />
          <feDisplacementMap in="inked" in2="warp" scale="1.6" />
        </filter>
      </defs>
      <g filter={`url(#ink-${id})`} fill="none" stroke="var(--vermilion)">
        <rect x="1.5" y="1.5" width={w - 3} height={h - 3} rx="3" strokeWidth="2" />
        <rect x="4.5" y="4.5" width={w - 9} height={h - 9} rx="2" strokeWidth="0.9" />
        <text
          x={w / 2}
          y={h / 2 + fs * 0.36}
          textAnchor="middle"
          fill="var(--vermilion)"
          stroke="none"
          style={{
            font: `600 ${fs}px "IBM Plex Mono", monospace`,
            letterSpacing: "0.12em",
          }}
        >
          {text}
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------- Tape */

export function Tape({
  className = "",
  rotate = -4,
  width = 96,
}: {
  className?: string;
  rotate?: number;
  width?: number;
}) {
  return (
    <span
      aria-hidden
      className={`tape ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width }}
    />
  );
}

/* --------------------------------------------------------- SectionHeader */

export function SectionHeader({
  index,
  label,
  title,
  children,
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="label mb-4 flex items-center gap-3">
        <span className="text-vermilion">{index}</span>
        <span aria-hidden className="h-px w-8 bg-ink/30" />
        <span>{label}</span>
      </p>
      <h2
        id={id}
        className="max-w-[22ch] text-[clamp(34px,4.4vw,60px)] font-[560] leading-[1.02] tracking-[-0.02em]"
      >
        {title}
      </h2>
      {children && (
        <div className="mt-5 max-w-prose text-[18px] leading-relaxed text-ink-muted md:text-[19px]">
          {children}
        </div>
      )}
    </Reveal>
  );
}
