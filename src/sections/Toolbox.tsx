import { motion } from "framer-motion";
import { aiTools, toolGroups } from "../data/portfolioData";
import { HandCircle, Reveal, SectionHeader } from "../components/ink";

export default function Toolbox() {
  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="relative scroll-mt-16 py-14 md:py-20">
      <div className="page">
        <SectionHeader id="toolbox-title" index="04" label="Toolbox" title="What I reach for" />

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <Reveal rotate={-0.8}>
            <div className="paper-graph relative rounded-[2px] p-6 shadow-sheet sm:p-7">
              <h3 className="m-0 text-[24px] font-[560]">
                <HandCircle seed={31} padX={0.35} padY={0.35} delay={0.4}>
                  {aiTools.name}
                </HandCircle>
              </h3>
              <p className="hand mt-3 text-[19px]">start here ↓</p>
              <ul className="mt-3 list-none space-y-1.5 p-0 font-mono text-[14.5px]">
                {aiTools.items.map((t) => (
                  <li key={t} className="flex items-baseline gap-2.5">
                    <span aria-hidden className="text-vermilion">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3">
            {toolGroups.map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.07 }}
              >
                <dt className="label border-b border-dashed border-ink/25 pb-2 text-[11.5px]">{g.name}</dt>
                <dd className="m-0 mt-3">
                  <ul className="m-0 list-none space-y-1 p-0 font-mono text-[14px] text-ink">
                    {g.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
