export interface MouseState {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  speed: number;
  isIdle: boolean;
}

export interface CursorPoint {
  x: number;
  y: number;
  id: number;
}

export interface VisibleElements extends Set<string> {}

export type AnimationDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "fade";
