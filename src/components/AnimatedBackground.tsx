import React from 'react';
import { easeInOut, motion } from 'framer-motion';

const NATURE_COLORS = [
  '#2dd4bf', // Teal-500 - Ocean depths
  '#10b981', // Emerald-500 - Forest canopy  
  '#06b6d4', // Cyan-500 - Tropical lagoon
  '#22c55e', // Green-500 - Spring meadow
  '#14b8a6', // Teal-600 - Deep sea
  '#059669', // Emerald-600 - Pine forest
  '#0891b2', // Cyan-600 - Mountain lake
  '#16a34a', // Green-600 - Jungle vine 
];

const liquidBlobs = [
  {
    style: { top: '-15%', left: '-20%', width: '70vw', height: '70vw' },
    color: NATURE_COLORS[0],
    animate: { 
      x: [0, 60, -40, 0], 
      y: [0, 40, -50, 0], 
      rotate: [0, 20, -15, 0],
      scale: [1, 1.1, 0.95, 1]
    },
    transition: { duration: 25, repeat: Infinity, ease: easeInOut },
  },
  {
    style: { top: '20%', left: '60%', width: '50vw', height: '50vw' },
    color: NATURE_COLORS[1],
    animate: { 
      x: [0, -30, 45, 0], 
      y: [0, -35, 60, 0], 
      rotate: [0, -15, 25, 0],
      scale: [1, 0.9, 1.15, 1]
    },
    transition: { duration: 28, repeat: Infinity, ease: easeInOut },
  },
  {
    style: { top: '55%', left: '-10%', width: '60vw', height: '60vw' },
    color: NATURE_COLORS[2],
    animate: { 
      x: [0, 35, -30, 0], 
      y: [0, 25, -40, 0], 
      rotate: [0, 12, -18, 0],
      scale: [1, 1.05, 0.92, 1]
    },
    transition: { duration: 22, repeat: Infinity, ease: easeInOut },
  },
  {
    style: { top: '5%', left: '75%', width: '45vw', height: '45vw' },
    color: NATURE_COLORS[3],
    animate: { 
      x: [0, -25, 30, 0], 
      y: [0, 40, -25, 0], 
      rotate: [0, -10, 15, 0],
      scale: [1, 0.95, 1.08, 1]
    },
    transition: { duration: 30, repeat: Infinity, ease: easeInOut },
  },
  {
    style: { top: '45%', left: '70%', width: '40vw', height: '40vw' },
    color: NATURE_COLORS[4],
    animate: { 
      x: [0, 20, -25, 0], 
      y: [0, -30, 35, 0], 
      rotate: [0, 8, -12, 0],
      scale: [1, 1.12, 0.88, 1]
    },
    transition: { duration: 26, repeat: Infinity, ease: easeInOut },
  },
  {
    style: { top: '70%', left: '20%', width: '35vw', height: '35vw' },
    color: NATURE_COLORS[5],
    animate: { 
      x: [0, -15, 20, 0], 
      y: [0, -20, 25, 0], 
      rotate: [0, 15, -8, 0],
      scale: [1, 0.93, 1.07, 1]
    },
    transition: { duration: 24, repeat: Infinity, ease: easeInOut },
  },
];

const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Liquid Flow Blobs */}
      {liquidBlobs.map((blob, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            ...blob.style,
            filter: 'blur(40px)',
            opacity: 0.6,
            zIndex: 1,
          }}
          animate={blob.animate}
          transition={blob.transition}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <g filter="url(#liquidFlow)">
              <motion.path
                d="M400,750 Q550,650 650,500 Q750,350 650,200 Q550,50 400,100 Q250,150 150,300 Q50,450 150,600 Q250,700 400,750 Z"
                fill={blob.color}
                fillOpacity="0.8"
                animate={{
                  d: [
                    "M400,750 Q550,650 650,500 Q750,350 650,200 Q550,50 400,100 Q250,150 150,300 Q50,450 150,600 Q250,700 400,750 Z",
                    "M400,720 Q580,680 680,520 Q780,380 620,180 Q520,80 380,120 Q220,180 120,320 Q20,480 180,620 Q280,720 400,720 Z",
                    "M400,760 Q520,620 620,480 Q720,320 680,220 Q580,20 420,80 Q280,120 180,280 Q80,420 120,580 Q220,680 400,760 Z",
                    "M400,750 Q550,650 650,500 Q750,350 650,200 Q550,50 400,100 Q250,150 150,300 Q50,450 150,600 Q250,700 400,750 Z"
                  ]
                }}
                transition={{
                  duration: 15 + (i * 2),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
            <defs>
              <filter id="liquidFlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                <feColorMatrix in="blur" mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="gooey" />
                <feBlend in="SourceGraphic" in2="gooey" />
              </filter>
            </defs>
          </svg>
        </motion.div>
      ))}

      {/* Glassmorphism Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 w-full h-full"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 100%)',
          borderRadius: 'inherit',
          border: '1px solid rgba(255,255,255,0.15)',
          zIndex: 2,
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 8 }, (_, i) => {
        const size = 4 + (i % 3) * 2;
        const initialX = 10 + (i * 12) + (i % 2) * 15;
        const initialY = 15 + (i * 10) + (i % 3) * 20;
        const colorIndex = i % NATURE_COLORS.length;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              background: `radial-gradient(circle, ${NATURE_COLORS[colorIndex]} 0%, ${NATURE_COLORS[(colorIndex + 1) % NATURE_COLORS.length]} 100%)`,
              opacity: 0.3,
              zIndex: 3,
            }}
            animate={{
              y: [0, -15 - (i % 3) * 5, 0],
              x: [0, 5 - (i % 2) * 10, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12 + (i % 4) * 3,
              repeat: Infinity,
              ease: easeInOut,
              delay: i * 0.8,
            }}
          />
        );
      })}

      {/* Moving Gradient Layers */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 50%, transparent 0%, rgba(16, 185, 129, 0.15) 45%, rgba(6, 182, 212, 0.1) 100%)',
          zIndex: 4,
        }}
        animate={{
          background: [
            'radial-gradient(ellipse 120% 80% at 50% 50%, transparent 0%, rgba(16, 185, 129, 0.15) 45%, rgba(6, 182, 212, 0.1) 100%)',
            'radial-gradient(ellipse 140% 90% at 60% 40%, transparent 0%, rgba(6, 182, 212, 0.18) 50%, rgba(45, 212, 191, 0.12) 100%)',
            'radial-gradient(ellipse 110% 70% at 40% 60%, transparent 0%, rgba(34, 197, 94, 0.16) 48%, rgba(20, 184, 166, 0.11) 100%)',
            'radial-gradient(ellipse 120% 80% at 50% 50%, transparent 0%, rgba(16, 185, 129, 0.15) 45%, rgba(6, 182, 212, 0.1) 100%)'
          ]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: easeInOut
        }}
      />
      
      <motion.div
        className="absolute inset-0 w-full h-full opacity-15"
        style={{
          background: 'linear-gradient(45deg, rgba(45, 212, 191, 0.08) 0%, transparent 30%, rgba(16, 185, 129, 0.06) 70%, transparent 100%)',
          zIndex: 5,
        }}
        animate={{
          background: [
            'linear-gradient(45deg, rgba(45, 212, 191, 0.08) 0%, transparent 30%, rgba(16, 185, 129, 0.06) 70%, transparent 100%)',
            'linear-gradient(75deg, rgba(6, 182, 212, 0.1) 0%, transparent 35%, rgba(34, 197, 94, 0.08) 65%, transparent 100%)',
            'linear-gradient(105deg, rgba(20, 184, 166, 0.09) 0%, transparent 25%, rgba(45, 212, 191, 0.07) 75%, transparent 100%)',
            'linear-gradient(135deg, rgba(16, 185, 129, 0.07) 0%, transparent 40%, rgba(6, 182, 212, 0.05) 60%, transparent 100%)',
            'linear-gradient(45deg, rgba(45, 212, 191, 0.08) 0%, transparent 30%, rgba(16, 185, 129, 0.06) 70%, transparent 100%)'
          ]
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: easeInOut
        }}
      />
      
      <motion.div
        className="absolute inset-0 w-full h-full opacity-10"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, rgba(6, 182, 212, 0.05) 0deg, transparent 90deg, rgba(16, 185, 129, 0.08) 180deg, transparent 270deg, rgba(45, 212, 191, 0.06) 360deg)',
          zIndex: 6,
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
