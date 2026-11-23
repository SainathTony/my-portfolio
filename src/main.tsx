import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs) → hydrate it.
// In dev the root only holds the placeholder comment → render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
