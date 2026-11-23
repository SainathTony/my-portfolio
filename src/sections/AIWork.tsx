import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { aiIntro, aiNotes, principles } from "../data/portfolioData";
import type { AINote } from "../types/portfolio";
import { rng, roughArrow, roughLine, roughRect } from "../lib/sketch";
import { DrawPath, EASE, Highlight, Reveal, SectionHeader, Tape } from "../components/ink";

/* ------------------------------- the diagram ------------------------------- */

type NodeId = "people" | "agent" | "mcp" | "data" | "workflows" | "services";
type Box = [x: number, y: number, w: number, h: number];
type Edge = { from: [number, number]; to: [number, number]; bend: number; label?: [string, number, number] };

const NODE_TEXT: Record<NodeId, [title: string, note: string]> = {
  people: ["People", "ask in plain words"],
  agent: ["LLM agent", "plans, calls tools"],
  mcp: ["MCP server", "context + actions"],
  data: ["Internal data", "spread across apps"],
  workflows: ["Admin workflows", "repetitive ops tasks"],
  services: ["Product services", "its own APIs"],
};

const LAYOUTS: Record<
  "wide" | "tall",
  { view: [number, number]; boxes: Record<NodeId, Box>; edges: Edge[]; mine: [number, number, string]; returnLabel: [number, number, number] }
> = {
  wide: {
    view: [640, 410],
    boxes: {
      people: [18, 46, 168, 74],
      agent: [252, 46, 156, 74],
      mcp: [252, 222, 156, 84],
      data: [470, 134, 160, 66],
      workflows: [470, 226, 160, 66],
      services: [470, 318, 160, 66],
    },
    edges: [
      { from: [190, 74], to: [248, 74], bend: -0.12, label: ["asks", 202, 62] },
      { from: [330, 126], to: [330, 216], bend: 0.12, label: ["tool calls", 342, 176] },
      { from: [412, 248], to: [466, 172], bend: -0.12 },
      { from: [412, 264], to: [466, 260], bend: 0.05 },
      { from: [412, 284], to: [466, 350], bend: 0.12 },
      { from: [258, 124], to: [112, 126], bend: -0.35 },
    ],
    mine: [74, 272, "the part I build →"],
    returnLabel: [150, 178, -4],
  },
  tall: {
    view: [340, 640],
    boxes: {
      people: [86, 18, 168, 68],
      agent: [86, 150, 168, 68],
      mcp: [86, 292, 168, 76],
      data: [6, 452, 158, 62],
      workflows: [176, 452, 158, 62],
      services: [91, 550, 158, 62],
    },
    edges: [
      { from: [178, 90], to: [178, 146], bend: 0.1, label: ["asks", 190, 124] },
      { from: [178, 222], to: [178, 288], bend: -0.1, label: ["tool calls", 190, 260] },
      { from: [140, 372], to: [92, 448], bend: -0.1 },
      { from: [214, 372], to: [252, 448], bend: 0.1 },
      { from: [170, 372], to: [170, 546], bend: 0.04 },
      { from: [82, 196], to: [82, 56], bend: -0.3 },
    ],
    mine: [258, 334, "← I build"],
    returnLabel: [22, 160, -90],
  },
};

function Diagram({
  layout,
  active,
  onHover,
}: {
  layout: "wide" | "tall";
  active: Set<string>;
  onHover: (node: NodeId | null) => void;
}) {
  const L = LAYOUTS[layout];
  const reduce = useReducedMotion();
  const ids = Object.keys(L.boxes) as NodeId[];
  return (
    <svg
      viewBox={`0 0 ${L.view[0]} ${L.view[1]}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Diagram of the pattern: a person asks an LLM agent; the agent calls tools on an MCP server, which reaches internal data, admin workflows and the product's own services."
    >
      {/* arrows */}
      <g className="text-ink" stroke="currentColor">
        {L.edges.map((e, i) => {
          const a = roughArrow(e.from[0], e.from[1], e.to[0], e.to[1], e.bend, 40 + i, 9);
          const dashed = i === L.edges.length - 1;
          return (
            <g key={i}>
              <DrawPath d={a.shaft} delay={0.5 + i * 0.12} duration={0.6} strokeWidth={1.5} dashed={dashed} />
              <DrawPath d={a.head} delay={1.0 + i * 0.12} duration={0.2} strokeWidth={1.5} />
              {e.label && (
                <motion.text
                  x={e.label[1]}
                  y={e.label[2]}
                  className="fill-fountain"
                  style={{ font: '400 15px "Kalam", cursive' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  {e.label[0]}
                </motion.text>
              )}
            </g>
          );
        })}
        <motion.text
          className="fill-fountain"
          style={{ font: '400 15px "Kalam", cursive' }}
          transform={`translate(${L.returnLabel[0]} ${L.returnLabel[1]}) rotate(${L.returnLabel[2]})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
        >
          answer / done
        </motion.text>
      </g>

      {/* boxes */}
      {ids.map((id, i) => {
        const [x, y, w, h] = L.boxes[id];
        const on = active.has(id);
        const isMcp = id === "mcp";
        return (
          <g
            key={id}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            className="cursor-default"
          >
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={on ? "rgba(242,222,107,0.55)" : isMcp ? "rgba(250,247,240,0.95)" : "rgba(250,247,240,0.8)"}
              style={{ transition: "fill 200ms ease" }}
            />
            <g className="text-ink" stroke="currentColor">
              <DrawPath
                d={roughRect(x, y, w, h, 60 + i, 1.6)}
                delay={0.1 + i * 0.1}
                duration={0.9}
                strokeWidth={on || isMcp ? 2.1 : 1.4}
              />
            </g>
            <text
              x={x + 14}
              y={y + h / 2 - 4}
              className="fill-ink"
              style={{ font: '600 15.5px "IBM Plex Sans", sans-serif' }}
            >
              {NODE_TEXT[id][0]}
            </text>
            <text
              x={x + 14}
              y={y + h / 2 + 17}
              className="fill-fountain"
              style={{ font: '400 15px "Kalam", cursive' }}
            >
              {NODE_TEXT[id][1]}
            </text>
          </g>
        );
      })}

      {/* the bit that's mine */}
      <motion.text
        x={L.mine[0]}
        y={L.mine[1]}
        className="fill-vermilion"
        style={{ font: '700 20px "Kalam", cursive' }}
        transform={`rotate(-6 ${L.mine[0]} ${L.mine[1]})`}
        initial={{ opacity: 0, y: reduce ? 0 : 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 0.4 }}
      >
        {L.mine[2]}
      </motion.text>
    </svg>
  );
}

/* --------------------------------- notes --------------------------------- */

function Note({
  note,
  index,
  on,
  onHover,
}: {
  note: AINote;
  index: number;
  on: boolean;
  onHover: (id: AINote["id"] | null) => void;
}) {
  return (
    <li
      onMouseEnter={() => onHover(note.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(note.id)}
      onBlur={() => onHover(null)}
      tabIndex={note.nodes.length ? 0 : -1}
      className={`relative rounded-[2px] py-4 pl-10 pr-3 transition-colors duration-200 ${
        on ? "bg-[rgba(242,222,107,0.28)]" : ""
      }`}
    >
      <span className="hand absolute left-2 top-3.5 text-[22px] text-vermilion" aria-hidden>
        {String.fromCharCode(97 + index)}.
      </span>
      <h3 className="text-[23px] font-[560] leading-tight tracking-[-0.01em]">{note.title}</h3>
      <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-muted">{note.body}</p>
      <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12.5px] text-ink">
        {note.metrics.map((m, i) => (
          <Highlight key={m} delay={200 + i * 150}>
            {m}
          </Highlight>
        ))}
      </p>
    </li>
  );
}

/* ------------------------------- principles ------------------------------- */

/** Hand-ticked box. Every instance gets its own wobble, tilt and size, so none are clip-art twins. */
function Checkbox({ seed }: { seed: number }) {
  const r = rng(seed * 7 + 3);
  const j = () => (r() - 0.5) * 3;
  const tick = `M${5 + j()} ${14 + j()} Q${9 + j()} ${17 + j()} ${11 + j() * 0.5} ${21 + j() * 0.5} Q${16 + j()} ${9 + j()} ${25 + j()} ${3 + j()}`;
  const tilt = (r() - 0.5) * 12;
  const scale = 0.92 + r() * 0.16;
  return (
    <svg
      viewBox="0 0 28 28"
      className="mt-1 h-7 w-7 shrink-0 overflow-visible"
      style={{ transform: `rotate(${tilt}deg) scale(${scale})` }}
      aria-hidden
    >
      <g className="text-ink" stroke="currentColor">
        <path d={roughRect(2, 6, 18, 18, seed, 1)} fill="none" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <DrawPath d={tick} stroke="var(--vermilion)" strokeWidth={2.4} duration={0.45} delay={0.3} />
    </svg>
  );
}

/* --------------------------------- section --------------------------------- */

export default function AIWork() {
  const [hoverNote, setHoverNote] = useState<AINote["id"] | null>(null);
  const [hoverNode, setHoverNode] = useState<NodeId | null>(null);

  const activeNodes = new Set<string>(
    hoverNote ? aiNotes.find((n) => n.id === hoverNote)?.nodes ?? [] : hoverNode ? [hoverNode] : [],
  );
  const noteOn = (n: AINote) =>
    hoverNote === n.id || (!!hoverNode && n.nodes.includes(hoverNode));

  return (
    <section id="ai" aria-labelledby="ai-title" className="relative scroll-mt-16 pb-4 pt-16 md:pt-24">
      <div className="page">
        <SectionHeader id="ai-title" index="01" label="AI work" title={aiIntro.title}>
          {aiIntro.body}
        </SectionHeader>

        <Reveal>
          <div className="paper-graph relative rounded-[2px] p-5 shadow-sheet sm:p-8 md:p-10">
            <Tape className="-left-6 -top-3" rotate={-34} />
            <Tape className="-right-6 -top-3" rotate={36} />
            {/* fold crease */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[46%] h-6"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(74,58,34,.07) 45%, rgba(255,255,255,.5) 52%, transparent)",
              }}
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
              <div>
                <p className="label mb-4 text-[11.5px]">fig. 2 — the pattern I build (simplified)</p>
                <div className="hidden sm:block">
                  <Diagram layout="wide" active={activeNodes} onHover={setHoverNode} />
                </div>
                <div className="mx-auto max-w-[360px] sm:hidden">
                  <Diagram layout="tall" active={activeNodes} onHover={setHoverNode} />
                </div>
              </div>

              <ol className="m-0 list-none space-y-1 self-center p-0">
                {aiNotes.map((n, i) => (
                  <Note key={n.id} note={n} index={i} on={noteOn(n)} onHover={setHoverNote} />
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <h3 className="text-[clamp(26px,3vw,36px)] font-[560] leading-tight tracking-[-0.015em]">
              How I build with AI
            </h3>
            <p className="hand mt-3 -rotate-2 text-[20px]">my working rules ↘</p>
          </Reveal>
          <ul className="m-0 max-w-[720px] list-none divide-y divide-dashed divide-ink/20 p-0">
            {principles.map((p, i) => (
              <motion.li
                key={p.title}
                className="flex gap-5 py-6 first:pt-2"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 3) * 0.05 }}
              >
                <Checkbox seed={80 + i} />
                <div>
                  <p className="font-display text-[21px] font-[560] leading-snug tracking-[-0.01em]">{p.title}</p>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* hand-drawn divider */}
      <svg aria-hidden viewBox="0 0 1200 8" className="page mt-16 block h-2 text-ink/20 md:mt-24" preserveAspectRatio="none">
        <path d={roughLine(0, 4, 1200, 4, 99, 2)} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </section>
  );
}
