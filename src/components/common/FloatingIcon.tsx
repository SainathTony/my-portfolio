import React from "react";

const mergeClasses = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");

type FloatingIconProps = {
  icon: React.ReactNode;
  delay?: number;
  size?: number;
  className?: string;
};

const FloatingIcon: React.FC<FloatingIconProps> = React.memo(
  ({ icon, delay = 0, size = 40, className = "" }) => {
    // Generate random position if no specific position is provided via className
    const hasPositioning =
      className &&
      (className.includes("top-") ||
        className.includes("left-") ||
        className.includes("right-") ||
        className.includes("bottom-"));

    return (
      <div
        className={mergeClasses(
          "absolute opacity-20 transition-all duration-500",
          className,
        )}
        style={{
          animation: `gentleFloat ${4 + delay}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          fontSize: `${size}px`,
          ...(!hasPositioning
            ? {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: "translate(-50%, -50%)",
              }
            : {}),
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
    );
  },
);

FloatingIcon.displayName = "FloatingIcon";

export default FloatingIcon;
