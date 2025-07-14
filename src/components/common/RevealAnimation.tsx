import React from 'react';
import { cn } from '../../lib/utils';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

type RevealAnimationProps = {
  children: React.ReactNode;
  /**
   * Unique identifier for the animation
   * If not provided, the component will always be visible
   */
  animationId?: string;
  /**
   * Delay before the animation starts (in milliseconds)
   */
  delay?: number;
  /**
   * Direction of the reveal animation
   * @default 'up'
   */
  direction?: AnimationDirection;
  /**
   * Set of visible element IDs (for scroll-based animations)
   * If not provided, the component will always be visible
   */
  visibleElements?: Set<string>;
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
  /**
   * If true, the animation will be triggered immediately on mount
   * without waiting for scroll
   * @default false
   */
  appearOnMount?: boolean;
};

/**
 * A reusable animation component that reveals content with various entrance effects.
 * Can be used for scroll-based or mount-based animations.
 */
const RevealAnimation: React.FC<RevealAnimationProps> = React.memo(({ 
  children, 
  animationId, 
  delay = 0, 
  direction = 'up', 
  visibleElements = new Set(),
  className = '',
  appearOnMount = false,
}) => {
  // If no animationId is provided or appearOnMount is true, always show the content
  const isVisible = !animationId || appearOnMount || visibleElements.has(animationId);
  
  const animationClasses = {
    up: 'translate-y-8',
    down: 'translate-y-[-2rem]',
    left: 'translate-x-8',
    right: 'translate-x-[-2rem]',
    scale: 'scale-95',
    fade: 'opacity-0',
  } as const;
  
  return (
    <div
      {...(animationId ? { 'data-animate-id': animationId } : {})}
      className={cn(
        'transition-all duration-700 ease-out',
        {
          'opacity-100 translate-y-0 translate-x-0 scale-100': isVisible,
          [`opacity-0 ${animationClasses[direction]}`]: !isVisible,
        },
        className
      )}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
});

RevealAnimation.displayName = 'RevealAnimation';

export default RevealAnimation;