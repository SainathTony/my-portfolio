/**
 * Simple utility to merge class names
 * @param classes - Class names to merge
 * @returns A single string of combined class names
 */
export function mergeClasses(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * A tiny (228B) utility for constructing `className` strings conditionally.
 * Inspired by clsx and classnames.
 */
type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, boolean>
  | ClassValue[];

function cn(...inputs: ClassValue[]): string {
  let i = 0;
  let str = "";

  while (i < inputs.length) {
    const arg = inputs[i];

    if (arg) {
      if (typeof arg === "string" || typeof arg === "number") {
        str && (str += " ");
        str += arg;
      } else if (Array.isArray(arg) && arg.length) {
        const inner = cn(...arg);
        if (inner) {
          str && (str += " ");
          str += inner;
        }
      } else if (typeof arg === "object") {
        for (const key in arg) {
          if (arg[key as keyof typeof arg] && key) {
            str && (str += " ");
            str += key;
          }
        }
      }
    }

    i++;
  }

  return str;
}

export { cn };

/**
 * Formats a number to a compact string (e.g., 1000 -> 1K)
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Generates a random number between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number between min and max
 */
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Debounce a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle a function call
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if the current device is a mobile device
 * @returns Boolean indicating if the device is mobile
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when text is copied
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
