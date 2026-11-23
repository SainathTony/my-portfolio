import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: "/my-portfolio/",
  plugins: [react()],
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // three.js is only reached through the lazy paper-plane chunk, so it stays off the critical path.
            manualChunks: {
              vendor: ["react", "react-dom"],
              motion: ["framer-motion"],
            },
          },
        },
    chunkSizeWarningLimit: 600,
    target: "es2019",
    minify: isSsrBuild ? false : "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "three"],
  },
}));
