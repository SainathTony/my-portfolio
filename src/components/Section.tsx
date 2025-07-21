import { forwardRef } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type AnimationType = "fadeIn" | "slideUp" | "slideLeft" | "slideRight";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  fullHeight?: boolean;
  withPadding?: boolean;
  withDivider?: boolean;
  animation?: AnimationType;
  delay?: number;
  as?: ElementType;
  "data-dark"?: boolean;
}

const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      title,
      subtitle,
      children,
      className = "",
      fullHeight = false,
      withPadding = true,
      withDivider = false,
      animation = "fadeIn",
      delay = 0,
      as: Component = "section",
      "data-dark": dataDark = false,
      ...props
    },
    ref,
  ) => {
    const selectedVariant =
      animationVariants[animation] || animationVariants.fadeIn;

    return (
      <Component
        id={id}
        ref={ref}
        className={`relative ${fullHeight ? "min-h-screen" : ""} ${
          withPadding ? "py-10 md:py-18 lg:py-26" : ""
        } ${className}`}
        {...props}
      >
        <div className="w-full h-full">
          {(title || subtitle) && (
            <motion.header
              className="mb-12 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
              variants={selectedVariant}
              custom={delay}
            >
              {subtitle && (
                <motion.p
                  className="text-sm font-semibold tracking-wider text-blue-500 dark:text-blue-400 uppercase mb-3"
                  variants={selectedVariant}
                >
                  {subtitle}
                </motion.p>
              )}
              {title && (
                <motion.h2
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                    dataDark
                      ? "from-blue-400 to-purple-400"
                      : "from-blue-600 to-purple-600"
                  }`}
                  variants={selectedVariant}
                >
                  {title}
                </motion.h2>
              )}
            </motion.header>
          )}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
            variants={selectedVariant}
            custom={delay + 0.1}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>

        {withDivider && (
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
            <svg
              className="w-full h-12 md:h-16 lg:h-20 text-white dark:text-gray-900"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity="0.25"
                className="fill-current"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity="0.5"
                className="fill-current"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-current"
              ></path>
            </svg>
          </div>
        )}
      </Component>
    );
  },
);

Section.displayName = "Section";

export default Section;
