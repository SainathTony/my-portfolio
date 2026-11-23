/*
 * Build-time prerender entry. `scripts/prerender.mjs` renders this into
 * dist/index.html so crawlers (and people without JS) get the full page as HTML;
 * the browser then hydrates it via main.tsx.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
