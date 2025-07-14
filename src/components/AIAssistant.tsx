import React, { useEffect, useRef, useState, useCallback, type JSX } from 'react';

interface Position {
  x: number;
  y: number;
}

interface MouseState {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  speed: number;
  isIdle: boolean;
  [key: string]: any; // For any additional properties
}

interface AIAssistantProps {
  aiAssistantRef: React.MutableRefObject<Position>;
  mouseState: React.MutableRefObject<MouseState>;
}

const AIAssistant = React.memo<AIAssistantProps>(({ aiAssistantRef, mouseState }): JSX.Element => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const assistantRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Calculate eye rotation based on mouse position
  const calculateEyeRotation = useCallback((x: number, y: number): Position => {
    // Default to center of the screen if mouse state is not available
    const currentMouseState = mouseState?.current;
    const mouseX = currentMouseState?.x ?? window.innerWidth / 2;
    const mouseY = currentMouseState?.y ?? window.innerHeight / 2;
    
    const dx = mouseX - x;
    const dy = mouseY - y;
    const angle = Math.atan2(dy, dx);
    
    // Limit the eye movement
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 2);
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  }, [mouseState?.current?.x, mouseState?.current?.y]);

  // Smoothly update the position
  useEffect(() => {
    if (!aiAssistantRef) return;
    
    let isMounted = true;
    let frameId: number | null = null;
    
    const updatePosition = () => {
      if (!isMounted || !aiAssistantRef?.current) return;
      
      setPosition({
        x: aiAssistantRef.current.x ?? window.innerWidth / 2,
        y: aiAssistantRef.current.y ?? window.innerHeight / 2
      });
      
      if (isMounted) {
        frameId = window.requestAnimationFrame(updatePosition);
      }
    };

    // Start the animation loop
    frameId = window.requestAnimationFrame(updatePosition);

    // Cleanup function
    return () => {
      isMounted = false;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      const currentFrameId = animationFrameRef.current;
      if (currentFrameId !== null) {
        window.cancelAnimationFrame(currentFrameId);
      }
    };
  }, [aiAssistantRef]);

  const leftEye = calculateEyeRotation(position.x, position.y);
  const rightEye = calculateEyeRotation(position.x, position.y);
  const isIdle = mouseState.current?.isIdle ?? false;

  return (
    <div
      ref={assistantRef}
      className="fixed z-50 pointer-events-none transition-all duration-300"
      style={{
        left: position.x - 30,
        top: position.y - 30,
        transform: isIdle ? 'scale(0.8)' : 'scale(1)',
      }}
      aria-label="AI Assistant"
    >
      <div className={`relative ${isIdle ? 'animate-bounce' : ''}`}>
        <div 
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg ${
            !isIdle ? 'animate-pulse' : ''
          }`}
          aria-hidden="true"
        >
          <div className="text-2xl">🤖</div>
        </div>
        
        {/* Left Eye */}
        <div className="absolute top-3 left-3 w-3 h-3 bg-white rounded-full overflow-hidden">
          <div 
            className="w-2 h-2 bg-black rounded-full transition-all duration-200"
            style={{
              transform: `translate(${leftEye.x}px, ${leftEye.y}px)`
            }}
            aria-hidden="true"
          />
        </div>
        
        {/* Right Eye */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full overflow-hidden">
          <div 
            className="w-2 h-2 bg-black rounded-full transition-all duration-200"
            style={{
              transform: `translate(${rightEye.x}px, ${rightEye.y}px)`
            }}
            aria-hidden="true"
          />
        </div>
        
        {/* Help Bubble */}
        {mouseState?.current?.isIdle && (
          <div className="absolute -top-12 -left-8 px-3 py-2 bg-white rounded-lg shadow-lg text-xs text-gray-800 whitespace-nowrap animate-fadeIn">
            Need help? 💡
            <div className="absolute top-full left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}
        
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 w-16 h-16 rounded-full border-2 border-blue-400 opacity-60 transition-all duration-1000"
          style={{
            animation: mouseState?.current?.isIdle ? 'none' : 'pulse 2s ease-in-out infinite',
            transform: `scale(${1 + (mouseState?.current?.speed || 0) * 0.5})`,
          }}
        />
      </div>
    </div>
  );
});

AIAssistant.displayName = 'AIAssistant';

export default AIAssistant;
