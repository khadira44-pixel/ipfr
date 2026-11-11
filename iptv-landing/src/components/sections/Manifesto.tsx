import { Reveal } from "@/components/motion/Reveal";
import { manifesto } from "@/content/manifesto";

export function Manifesto() {
  return (
    <section
      id="standard"
      aria-labelledby="standard-heading"
      className="relative overflow-hidden border-b border-hairline bg-obsidian-950/50 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[130px]" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
              <span className="text-gold">{manifesto.index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
              <span>{manifesto.eyebrow}</span>
            </p>
            <h2
              id="standard-heading"
              className="display mt-7 text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.96] text-ink"
            >
              Television, <em className="text-gradient-gold italic">considered.</em>
            </h2>
            <p className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-ink-muted sm:text-base">
              {manifesto.lead}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:pt-2">
            <div className="max-w-xl space-y-5 text-sm leading-relaxed text-ink-muted">
              {manifesto.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-4">
              {manifesto.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-2">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-muted">
                    {stat.label}
                  </dt>
                  <dd className="display text-[clamp(1.8rem,3vw,2.5rem)] leading-none text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
              <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
              A quieter kind of luxury
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
