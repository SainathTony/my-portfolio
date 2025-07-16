import React from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  hover?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  direction = "up",
  hover = true,
}: AnimatedCardProps) {
  const directionOffsets = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: -50 },
    right: { x: 50 },
  };

  const initial = {
    opacity: 0,
    ...directionOffsets[direction],
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  const hoverEffect = hover
    ? {
        y: -10,
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      whileHover={hoverEffect}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={`card ${className}`}
    >
      {children}
    </motion.div>
  );
}
