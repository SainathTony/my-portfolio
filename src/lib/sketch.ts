/*
 * Tiny seeded "hand-drawn" path generator.
 * Deterministic (same seed → same wobble) so marks don't change between renders.
 */

export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/** A slightly bowed line with jittered ends. */
export function roughLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed = 1,
  jitter = 1.6,
): string {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 2 * jitter;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const bow = (r() - 0.5) * Math.min(len * 0.04, 6);
  const nx = -(y2 - y1) / (len || 1);
  const ny = (x2 - x1) / (len || 1);
  const mx = (x1 + x2) / 2 + nx * bow;
  const my = (y1 + y2) / 2 + ny * bow;
  return `M${f(x1 + j())} ${f(y1 + j())} Q${f(mx + j())} ${f(my + j())} ${f(x2 + j())} ${f(y2 + j())}`;
}

/** A box drawn as two loose passes with overshooting corners. */
export function roughRect(
  x: number,
  y: number,
  w: number,
  h: number,
  seed = 1,
  jitter = 1.8,
  passes = 2,
): string {
  const parts: string[] = [];
  for (let p = 0; p < passes; p++) {
    const o = p === 0 ? 3 : -2; // overshoot
    const s = seed * 31 + p * 7;
    parts.push(
      roughLine(x - o, y, x + w + o, y, s + 1, jitter),
      roughLine(x + w, y - o, x + w, y + h + o, s + 2, jitter),
      roughLine(x + w + o, y + h, x - o, y + h, s + 3, jitter),
      roughLine(x, y + h + o, x, y - o, s + 4, jitter),
    );
  }
  return parts.join(" ");
}

/** A marker circle that doesn't quite close — overshoots like a real hand. */
export function roughEllipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  seed = 1,
  wobble = 0.06,
): string {
  const r = rng(seed);
  const start = -Math.PI * (0.55 + r() * 0.2);
  const sweep = Math.PI * 2 + 0.45 + r() * 0.25;
  const n = 18;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = start + (sweep * i) / n;
    // drift outward over the stroke so the end doesn't land on the start
    const drift = 1 + (i / n) * 0.07;
    const k = drift * (1 + (r() - 0.5) * wobble);
    pts.push([cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k]);
  }
  return catmullRom(pts);
}

/** Smooth path through points (Catmull-Rom → cubic Bézier). */
export function catmullRom(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Arrowhead (two short strokes) at (x, y) pointing along angle (radians). */
export function arrowHead(
  x: number,
  y: number,
  angle: number,
  size = 10,
  seed = 1,
): string {
  const r = rng(seed);
  const spread = 0.45 + r() * 0.1;
  const a1 = angle + Math.PI - spread;
  const a2 = angle + Math.PI + spread;
  return [
    roughLine(x, y, x + Math.cos(a1) * size, y + Math.sin(a1) * size, seed + 3, 0.6),
    roughLine(x, y, x + Math.cos(a2) * size, y + Math.sin(a2) * size, seed + 5, 0.6),
  ].join(" ");
}

/** A curved hand-drawn arrow from (x1,y1) to (x2,y2) with a given bend. */
export function roughArrow(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend = 0.2,
  seed = 1,
  head = 10,
): { shaft: string; head: string } {
  const r = rng(seed);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / (len || 1);
  const ny = (x2 - x1) / (len || 1);
  const cx = mx + nx * len * bend + (r() - 0.5) * 3;
  const cy = my + ny * len * bend + (r() - 0.5) * 3;
  const angle = Math.atan2(y2 - cy, x2 - cx);
  return {
    shaft: `M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`,
    head: arrowHead(x2, y2, angle, head, seed + 11),
  };
}

/** A loose squiggle underline across a given width. */
export function squiggle(width: number, seed = 1, amp = 2.2): string {
  const r = rng(seed);
  const pts: [number, number][] = [];
  const steps = Math.max(4, Math.round(width / 22));
  for (let i = 0; i <= steps; i++) {
    const x = (width * i) / steps;
    const y = 5 + Math.sin(i * 1.7 + r()) * amp * (0.6 + r() * 0.5);
    pts.push([x, y]);
  }
  return catmullRom(pts);
}
