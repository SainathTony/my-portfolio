import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  darkMode: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = React.memo(
  ({ isLoading, darkMode }) => {
    const loadingTextRef = useRef<HTMLParagraphElement>(null);
    const name = "Sainath Bottupally";
    const title = "Crafting Digital Experiences...";

    // Typewriter effect for the loading text
    useEffect(() => {
      if (!isLoading || !loadingTextRef.current) return;

      const text = loadingTextRef.current.textContent || "";
      loadingTextRef.current.textContent = "";

      let charIndex = 0;
      const typeWriter = () => {
        if (charIndex < text.length) {
          if (loadingTextRef.current) {
            loadingTextRef.current.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
          }
        }
      };

      const timer = setTimeout(typeWriter, 500);
      return () => clearTimeout(timer);
    }, [isLoading]);

    return (
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            }}
            aria-live="polite"
            aria-busy={isLoading}
          >
            <div className="text-center px-4">
              {/* Animated Spinner */}
              <div className="relative mb-8 mx-auto w-40 h-40">
                <motion.div
                  className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-0 border-4 border-purple-500 border-b-transparent rounded-full opacity-70"
                  animate={{ rotate: -360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-4 border-4 border-green-500 border-l-transparent rounded-full opacity-60"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.3,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="space-y-3"
              >
                <h1
                  className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                    darkMode
                      ? "from-blue-400 to-purple-400"
                      : "from-blue-600 to-purple-600"
                  }`}
                >
                  {name}
                </h1>
                <p
                  ref={loadingTextRef}
                  className={`text-lg md:text-xl font-light ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  aria-label="Loading portfolio"
                >
                  {title}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className={`mt-8 h-1 ${
                  darkMode ? "bg-gray-800" : "bg-gray-200"
                } rounded-full overflow-hidden w-48 mx-auto`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.5 },
                }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: "100%",
                    transition: {
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
