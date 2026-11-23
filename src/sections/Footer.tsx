import { person } from "../data/portfolioData";

const UPDATED = "Nov 2026";

export default function Footer() {
  return (
    <footer className="sheet relative -mt-px pb-10" style={{ boxShadow: "none" }}>
      <div className="page flex flex-col gap-3 border-t border-dashed border-ink/20 pt-6 font-mono text-[11.5px] text-ink-muted md:flex-row md:items-center md:justify-between">
        <p className="m-0">
          © 2026 {person.name} · last updated {UPDATED}
        </p>
        <p className="m-0">
          Set in Fraunces, IBM Plex &amp; Kalam. Paper generated, not scanned. React + Three.js.
        </p>
      </div>
    </footer>
  );
}
