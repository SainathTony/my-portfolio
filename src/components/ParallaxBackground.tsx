import React, { useRef } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

interface BackgroundShapeProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  speed?: number;
}

const BackgroundShape: React.FC<BackgroundShapeProps> = React.memo(({ 
  className = '', 
  style = {}, 
  children, 
  speed = 0.1 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useViewportScroll();
  
  // Create parallax effect based on scroll position
  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, 100 * speed],
    { clamp: false }
  );

  // Add subtle floating animation with a simple yoyo effect
  const floating = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: { 
        duration: 8 + (Math.random() * 4),
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut' as const,
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`absolute ${className}`}
      style={{ ...style, y }}
      initial="initial"
      animate="animate"
      variants={floating}
    >
      {children}
    </motion.div>
  );
});

BackgroundShape.displayName = 'BackgroundShape';

const ParallaxBackground: React.FC = React.memo(() => {
  // Generate random positions for the shapes
  const generateRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.floor(80 + Math.random() * 120)}px`,
    height: `${Math.floor(80 + Math.random() * 120)}px`,
    opacity: 0.05 + Math.random() * 0.1,
    rotate: Math.random() * 360,
    speed: 0.1 + Math.random() * 0.3,
  });

  // Generate random gradient colors
  const getRandomGradient = () => {
    const colors = [
      'from-blue-500/10 to-purple-500/10',
      'from-green-500/10 to-blue-500/10',
      'from-purple-500/10 to-pink-500/10',
      'from-yellow-500/15 to-orange-500/15',
      'from-indigo-500/15 to-purple-500/15',
      'from-teal-500/15 to-cyan-500/15',
      'from-red-500/20 to-pink-500/20',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Generate random shapes
  const shapes = Array.from({ length: 12 }, (_, i) => {
    const { top, left, width, height, opacity, rotate, speed } = generateRandomPosition();
    const gradient = getRandomGradient();
    const isCircle = Math.random() > 0.5;
    
    return (
      <BackgroundShape
        key={`shape-${i}`}
        className={`${isCircle ? 'rounded-full' : 'rounded-lg'} ${gradient} ${
          i % 3 === 0 ? 'blur-xl' : i % 2 === 0 ? 'blur-lg' : 'blur-md'
        }`}
        style={{
          top,
          left,
          width,
          height,
          opacity,
          rotate: `${rotate}deg`,
          zIndex: -1,
        }}
        speed={speed}
      />
    );
  });

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0">
        {shapes}
      </div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
