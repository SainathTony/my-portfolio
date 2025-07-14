import { memo } from 'react';
import type { MouseState, CursorPoint } from '../types/common';
import * as React from 'react';

interface CursorTrailProps {
  cursorTrail: Array<CursorPoint & { timestamp: number }>;
  mouseState: React.MutableRefObject<MouseState>;
}

// Maximum number of trail points to render for performance
const MAX_TRAIL_POINTS = 10;

const CursorTrail: React.FC<CursorTrailProps> = memo(({ cursorTrail, mouseState }) => {
  // Only render a subset of trail points for better performance
  const visibleTrail = React.useMemo(() => {
    const step = Math.max(1, Math.floor(cursorTrail.length / MAX_TRAIL_POINTS));
    return cursorTrail.filter((_, index) => index % step === 0).slice(-MAX_TRAIL_POINTS);
  }, [cursorTrail]);

  // Don't render if mouse is idle
  if (mouseState.current.isIdle) {
    return null;
  }

  return (
    <>
      {visibleTrail.map((point, index) => {
        const opacity = (index + 1) / visibleTrail.length * 0.6;
        const scale = (index + 1) / visibleTrail.length;
        
        return (
          <div
            key={point.id+index}
            className="fixed w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-40 transition-all duration-300 will-change-transform"
            style={{
              left: `${point.x - 4}px`,
              top: `${point.y - 4}px`,
              opacity,
              transform: `scale(${scale})`,
              transition: `opacity 300ms, transform 300ms`,
              transitionDelay: `${index * 15}ms`,
            }}
            aria-hidden="true"
          />
        );
      })}
      
      <div
        className="fixed w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 transition-all duration-500 will-change-transform"
        style={{
          left: `${mouseState.current.smoothX}px`,
          top: `${mouseState.current.smoothY}px`,
          opacity: 0.7,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'transform 100ms, opacity 200ms',
        }}
        aria-hidden="true"
      />
    </>
  );
});

CursorTrail.displayName = 'CursorTrail';

export default CursorTrail;
