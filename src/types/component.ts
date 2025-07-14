import type { AnimationDirection, VisibleElements } from "./common";

export interface BaseComponentProps {
  darkMode: boolean;
  visibleElements: VisibleElements;
}

export interface SectionProps extends BaseComponentProps {}

export interface NavigationProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
  darkMode: boolean;
}

export interface RevealAnimationProps {
  children: React.ReactNode;
  animationId: string;
  delay?: number;
  direction?: AnimationDirection;
  visibleElements: VisibleElements;
}

export interface FloatingIconProps {
  icon: string;
  delay?: number;
  size?: number;
}
