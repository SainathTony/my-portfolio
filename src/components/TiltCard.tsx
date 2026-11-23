import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

/** A sheet that tilts (≤4°) toward the cursor, like a card lifted off the desk. */
export default function TiltCard({
  children,
  className = "",
  rest = 0,
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  /** resting z-rotation in degrees */
  rest?: number;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const lift = useMotionValue(0);
  const spring = { stiffness: 300, damping: 30 };
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const z = useSpring(lift, spring);
  const shadow = useTransform(
    z,
    [0, 1],
    [
      "0 1px 0 rgba(0,0,0,.04), 0 10px 20px -12px rgba(74,58,34,.30)",
      "0 1px 0 rgba(0,0,0,.04), 0 26px 36px -16px rgba(74,58,34,.42)",
    ],
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    lift.set(1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    lift.set(0);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          rotateX: reduce ? 0 : rx,
          rotateY: reduce ? 0 : ry,
          rotateZ: rest,
          boxShadow: shadow,
          transformStyle: "preserve-3d",
        }}
        className="h-full rounded-[2px]"
      >
        {children}
      </motion.div>
    </div>
  );
}
