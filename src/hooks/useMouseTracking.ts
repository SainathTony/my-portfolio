import { useState, useRef, useEffect, useCallback } from "react";

interface MouseState {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  speed: number;
  isIdle: boolean;
}

interface CursorPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

interface AIAssistantPosition {
  x: number;
  y: number;
}

interface MouseTrackingConfig {
  trailLength?: number;
  idleTimeout?: number;
  smoothingFactor?: number;
  assistantFollowSpeed?: number;
  assistantIdleSpeed?: number;
  maxSpeed?: number;
}

interface UseMouseTrackingReturn {
  cursorTrail: CursorPoint[];
  mouseState: React.MutableRefObject<MouseState>;
  aiAssistantRef: React.MutableRefObject<AIAssistantPosition>;
}

export const useMouseTracking = (
  config: MouseTrackingConfig = {},
): UseMouseTrackingReturn => {
  const {
    trailLength = 6,
    idleTimeout = 3000,
    smoothingFactor = 0.1,
    assistantFollowSpeed = 0.05,
    assistantIdleSpeed = 0.02,
    maxSpeed = 10,
  } = config;

  const [cursorTrail, setCursorTrail] = useState<CursorPoint[]>([]);
  const aiAssistantRef = useRef<AIAssistantPosition>({ x: 0, y: 0 });
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastMouseTime = useRef<number>(Date.now());
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const mouseState = useRef<MouseState>({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    speed: 0,
    isIdle: false,
  });

  const calculateMouseSpeed = useCallback(
    (currentX: number, currentY: number, currentTime: number): number => {
      const deltaTime = currentTime - lastMouseTime.current;
      const deltaX = currentX - lastMousePos.current.x;
      const deltaY = currentY - lastMousePos.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Cap speed to prevent erratic behavior
      return deltaTime > 0 ? Math.min(distance / deltaTime, maxSpeed) : 0;
    },
    [maxSpeed],
  );

  const updateMousePosition = useCallback(
    (x: number, y: number, speed: number): void => {
      mouseState.current = {
        ...mouseState.current,
        x,
        y,
        speed,
        isIdle: false,
      };
    },
    [],
  );

  const updateCursorTrail = useCallback(
    (x: number, y: number, timestamp: number): void => {
      setCursorTrail((prev) => {
        const newTrail = [...prev, { x, y, id: timestamp, timestamp }];
        return newTrail.slice(-trailLength);
      });
    },
    [trailLength],
  );

  const resetIdleTimer = useCallback((): void => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    idleTimeoutRef.current = setTimeout(() => {
      mouseState.current = {
        ...mouseState.current,
        isIdle: true,
        speed: 0,
      };
    }, idleTimeout);
  }, [idleTimeout]);

  const updateAIAssistantPosition = useCallback((): void => {
    if (!mouseState.current.isIdle) {
      // Follow mouse when active
      aiAssistantRef.current.x +=
        (mouseState.current.x - aiAssistantRef.current.x) *
        assistantFollowSpeed;
      aiAssistantRef.current.y +=
        (mouseState.current.y - aiAssistantRef.current.y) *
        assistantFollowSpeed;
    } else {
      // Move to corner when idle
      const cornerX = Math.max(0, window.innerWidth - 100);
      const cornerY = Math.max(0, window.innerHeight - 100);
      aiAssistantRef.current.x +=
        (cornerX - aiAssistantRef.current.x) * assistantIdleSpeed;
      aiAssistantRef.current.y +=
        (cornerY - aiAssistantRef.current.y) * assistantIdleSpeed;
    }
  }, [assistantFollowSpeed, assistantIdleSpeed]);

  const handleMouseMove = useCallback(
    (e: MouseEvent): void => {
      const currentTime = Date.now();
      const speed = calculateMouseSpeed(e.clientX, e.clientY, currentTime);

      updateMousePosition(e.clientX, e.clientY, speed);
      updateCursorTrail(e.clientX, e.clientY, currentTime);
      resetIdleTimer();

      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastMouseTime.current = currentTime;
    },
    [
      calculateMouseSpeed,
      updateMousePosition,
      updateCursorTrail,
      resetIdleTimer,
    ],
  );

  const animateSmoothing = useCallback((): void => {
    // Smooth mouse position interpolation
    mouseState.current.smoothX +=
      (mouseState.current.x - mouseState.current.smoothX) * smoothingFactor;
    mouseState.current.smoothY +=
      (mouseState.current.y - mouseState.current.smoothY) * smoothingFactor;

    updateAIAssistantPosition();

    animationFrameRef.current = requestAnimationFrame(animateSmoothing);
  }, [smoothingFactor, updateAIAssistantPosition]);

  useEffect(() => {
    // Initialize AI assistant position at screen center
    aiAssistantRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    // Event listeners with performance optimizations
    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
      capture: false,
    });

    animationFrameRef.current = requestAnimationFrame(animateSmoothing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [handleMouseMove, animateSmoothing]);

  return { cursorTrail, mouseState, aiAssistantRef };
};
