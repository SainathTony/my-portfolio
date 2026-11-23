import { motion, useReducedMotion } from "framer-motion";
import { about } from "../data/portfolioData";
import { Reveal, SectionHeader, Tape } from "../components/ink";
// 640px web copy of My_pic.png (the 1254px original stays as the source)
import MyPic from "../assets/images/my-portrait-640.jpg";

function StickyNote() {
  const reduce = useReducedMotion();
  return (
    <motion.aside
      aria-label="Ask me about"
      className="relative w-[250px] bg-sticky px-5 pb-6 pt-7 font-hand text-[19px] leading-snug text-ink shadow-sticky"
      style={{ backgroundImage: "var(--grain)" }}
      initial={{ rotate: 3 }}
      whileHover={reduce ? undefined : { rotate: 1, y: -3, boxShadow: "0 2px 2px rgba(0,0,0,.05), 0 20px 26px -12px rgba(74,58,34,.42)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-3} width={78} />
      <p className="m-0 font-bold">Ask me about:</p>
      <ul className="m-0 mt-1 list-none p-0">
        {about.askMeAbout.map((t) => (
          <li key={t}>→ {t}</li>
        ))}
      </ul>
    </motion.aside>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16 py-14 md:py-20">
      <div className="page">
        <div className="grid items-start gap-12 md:grid-cols-[300px_1fr] md:gap-16">
          <Reveal rotate={-2.2} className="mx-auto w-[240px] md:mx-0 md:mt-24 md:w-[270px]">
            <figure className="relative m-0 bg-paper-raised p-3 pb-12 shadow-lifted" style={{ backgroundImage: "var(--grain)" }}>
              <Tape className="-top-3 left-6" rotate={-8} width={84} />
              <Tape className="-top-3 right-4" rotate={10} width={70} />
              <img
                src={MyPic}
                alt="Sainath Bottupally"
                width={640}
                height={640}
                loading="lazy"
                className="block aspect-square w-full object-cover"
                style={{ filter: "grayscale(.3) sepia(.15) contrast(1.03)" }}
              />
              <figcaption className="hand absolute bottom-3 left-0 right-0 text-center text-[19px]">
                Sainath, Hyderabad
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <SectionHeader id="about-title" index="05" label="About" title="Hi, I'm Sainath." />
            <Reveal>
              <div className="max-w-prose space-y-5 text-[18px] leading-relaxed md:text-[19px]">
                {about.paragraphs.map((p) => (
                  <p key={p} className="m-0">
                    {p}
                  </p>
                ))}
                <p className="m-0 text-ink-muted">{about.languages}</p>
              </div>
            </Reveal>
            <Reveal className="mt-10" delay={0.1}>
              <StickyNote />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
