import { alsoBuilt, caseStudies } from "../data/portfolioData";
import type { CaseStudy } from "../types/portfolio";
import { Reveal, SectionHeader, Stamp } from "../components/ink";
import TiltCard from "../components/TiltCard";

function AISticker() {
  return (
    <span
      aria-label="Uses AI"
      className="absolute -left-5 -top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-fountain font-hand text-[17px] font-bold text-paper-raised shadow-sticky"
      style={{ transform: "rotate(-12deg)" }}
    >
      AI
    </span>
  );
}

function Row({ label, children, strong = false }: { label: string; children: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[92px_1fr]">
      <dt className="font-mono text-[11px] uppercase leading-[30px] tracking-[0.08em] text-ink-faint">{label}</dt>
      <dd className={`m-0 text-[16.5px] leading-[30px] ${strong ? "font-medium text-ink" : "text-ink-muted"}`}>
        {children}
      </dd>
    </div>
  );
}

function Card({ c, wide = false }: { c: CaseStudy; wide?: boolean }) {
  return (
    <article className="index-card h-full shadow-none" aria-labelledby={`case-${c.id}`}>
      {c.ai && <AISticker />}
      {/* header sits above the red line (77px) */}
      <header className="relative flex h-[77px] flex-col justify-end px-6 pb-2.5 sm:px-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">{c.context}</p>
        <h3 id={`case-${c.id}`} className="mt-0.5 truncate text-[28px] font-[560] leading-[1.1] tracking-[-0.015em]">
          {c.title}
        </h3>
        <Stamp
          text={c.stamp}
          size="sm"
          rotate={c.id === "canva-nova" ? 7 : -7}
          className="absolute right-4 top-3 hidden sm:block"
        />
      </header>

      <div className={`px-6 pb-[30px] sm:px-7 ${wide ? "md:grid md:grid-cols-[1fr_260px] md:gap-10" : ""}`}>
        <dl className="m-0">
          <Row label="Problem">{c.problem}</Row>
          <Row label="Built">{c.built}</Row>
          <Row label="Outcome" strong>
            {c.outcome}
          </Row>
        </dl>
        <div className={wide ? "md:border-l md:border-dashed md:border-ink/20 md:pl-6" : ""}>
          <p className="m-0 font-mono text-[12px] leading-[30px] text-ink">
            <span className="text-ink-faint">stack · </span>
            {c.stack.join(" · ")}
          </p>
          {c.link && (
            <a
              href={c.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink font-mono text-[12.5px] leading-[30px]"
            >
              {c.link.label} <span aria-hidden>↗</span>
            </a>
          )}
          <Stamp text={c.stamp} size="sm" rotate={-6} className="mt-2 sm:hidden" />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [first, ...rest] = caseStudies;
  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-16 py-14 md:py-20">
      <div className="page">
        <SectionHeader id="work-title" index="02" label="Work" title="Things I've shipped">
          Written the way I'd explain them in an interview: the problem, what I built, and what changed.
        </SectionHeader>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Reveal className="md:col-span-2 md:-translate-x-1.5">
            <TiltCard rest={0} max={2.5}>
              <Card c={first} wide />
            </TiltCard>
          </Reveal>
          {rest.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.07} className={i % 2 ? "md:mt-12 md:-translate-x-1" : "md:translate-x-1.5"}>
              <TiltCard>
                <Card c={c} />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="sheet px-6 py-5 sm:px-7">
            <p className="label text-[11.5px]">Also built</p>
            <ul className="mt-3 grid list-none gap-4 p-0 md:grid-cols-2 md:gap-10">
              {alsoBuilt.map((a) => (
                <li key={a.title} className="text-[15.5px] leading-relaxed">
                  <span className="font-medium text-ink">{a.title}.</span>{" "}
                  <span className="text-ink-muted">{a.note}</span>{" "}
                  {a.link && (
                    <a
                      href={a.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-ink whitespace-nowrap font-mono text-[12.5px]"
                    >
                      {a.link.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
