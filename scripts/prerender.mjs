/*
 * Injects the server-rendered app into dist/index.html.
 * Runs after `vite build` (client) and `vite build --ssr` (→ dist-ssr/).
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const htmlPath = path.join(root, "dist", "index.html");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

const html = fs.readFileSync(htmlPath, "utf8");
const marker = "<!--app-html-->";
if (!html.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`);
}
if (!appHtml.includes("<h1")) {
  throw new Error("prerender: rendered app has no <h1> — refusing to ship an empty page");
}

fs.writeFileSync(htmlPath, html.replace(marker, appHtml));
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

const words = appHtml.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB (~${words} words) into dist/index.html`);
