import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DrawPath } from "../ink";
import { catmullRom, roughLine } from "../../lib/sketch";
import type { PaperPlaneHandle } from "./paperPlaneScene";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Hand-drawn plane: the poster before WebGL is ready, and the fallback without it. */
function SketchPlane() {
  const outline = [
    roughLine(40, 160, 300, 70, 11, 1.2),
    roughLine(300, 70, 120, 190, 12, 1.2),
    roughLine(120, 190, 40, 160, 13, 1.2),
    roughLine(300, 70, 150, 150, 14, 1.2),
    roughLine(150, 150, 120, 190, 15, 1.2),
    roughLine(150, 150, 170, 210, 16, 1.2),
    roughLine(170, 210, 300, 70, 17, 1.2),
  ].join(" ");
  return (
    <svg viewBox="0 0 340 260" className="h-full w-full" aria-hidden>
      <path d={outline} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 160 L300 70 L120 190 Z" fill="rgba(250,247,240,.7)" />
    </svg>
  );
}

type Tail = { x: number; y: number; w: number; h: number };

/** The dashed pencil flight path: swoops up from the lower left, loops once, ends at the tail. */
function FlightTrail({ tail }: { tail: Tail }) {
  const { x, y, w, h } = tail;
  const s = Math.min(w, h) / 520; // loop size follows the canvas
  // swoops up from the lower left and arrives along the plane's heading (~20°), 12px behind the tail
  const pts: [number, number][] = [
    [x - 150 * s, y + 235 * s],
    [x - 182 * s, y + 160 * s],
    [x - 160 * s, y + 92 * s],
    [x - 112 * s, y + 44 * s],
    [x - 11, y + 4],
  ].map(([px, py]) => [Math.max(-24, px), Math.min(h - 30, py)] as [number, number]);
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-ink-muted"
      aria-hidden
    >
      <DrawPath d={catmullRom(pts)} dashed strokeWidth={1.4} duration={1.4} />
    </svg>
  );
}

export default function PaperPlane() {
  const host = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const handle = useRef<PaperPlaneHandle | null>(null);
  const reduce = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);
  const [tail, setTail] = useState<Tail | null>(null);
  // Detected after mount so the prerendered HTML (poster only) and first client render match.
  const [webgl, setWebgl] = useState(false);
  useEffect(() => setWebgl(hasWebGL()), []);

  useEffect(() => {
    if (!webgl || !host.current) return;
    let disposed = false;
    const el = host.current;

    const getScrollProgress = () => {
      const box = wrap.current?.getBoundingClientRect();
      if (!box) return 0;
      // 0 while the plane is fully visible, → 1 as it leaves the top of the viewport
      return Math.min(1, Math.max(0, -box.top / (box.height * 0.9)));
    };

    const start = async () => {
      // fonts must be ready before the spec page is painted onto the texture
      await Promise.all([
        document.fonts.load('700 74px "Kalam"'),
        document.fonts.load('400 44px "Kalam"'),
        document.fonts.load('500 26px "IBM Plex Mono"'),
      ]).catch(() => undefined);
      const { createPaperPlane } = await import("./paperPlaneScene");
      if (disposed) return;
      handle.current = createPaperPlane(el, {
        reducedMotion: reduce,
        getScrollProgress,
        onFirstFrame: () => setReady(true),
        onTail: (x, y, w, h) => setTail({ x, y, w, h }),
      });
    };

    // Start after first paint so the 3D chunk never competes with the headline.
    const ric = typeof window.requestIdleCallback === "function";
    const idle = ric
      ? window.requestIdleCallback(() => void start(), { timeout: 900 })
      : globalThis.setTimeout(() => void start(), 250);

    return () => {
      disposed = true;
      if (ric) window.cancelIdleCallback(idle as number);
      else globalThis.clearTimeout(idle as ReturnType<typeof setTimeout>);
      handle.current?.dispose();
      handle.current = null;
    };
  }, [webgl, reduce]);

  return (
    <div ref={wrap} className="relative h-full w-full">
      {tail && <FlightTrail tail={tail} />}

      {/* poster / fallback */}
      <div
        className={`absolute inset-[18%] transition-opacity duration-300 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <SketchPlane />
      </div>

      {webgl && (
        <button
          type="button"
          onClick={() => handle.current?.loop()}
          className="absolute inset-0 cursor-pointer rounded-sm focus-visible:outline-offset-[-8px]"
          aria-label="Paper plane made from an agent spec. Click to make it loop."
        >
          <div
            ref={host}
            className={`h-full w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        </button>
      )}
    </div>
  );
}
