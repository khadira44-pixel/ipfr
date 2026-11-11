import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { features } from "@/content/features";
import { cn } from "@/lib/utils";

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="container-page">
        <SectionHeader
          index="03"
          eyebrow="The engineering"
          title={
            <>
              Built like a <em className="text-gradient-gold italic">private cinema.</em>
            </>
          }
          description="The picture, the routing and the people behind it — considered as one experience, not a list of features."
          titleId="features-heading"
        />

        <div className="grid gap-4 md:grid-cols-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isMint = feature.accent === "mint";
            const span = index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5";

            return (
              <Reveal key={feature.title} delay={index * 80} className={cn("h-full", span)}>
                <article
                  data-spotlight
                  className="group surface-card relative h-full min-h-[320px] p-7 sm:p-9"
                >
                  <Icon
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 -right-6 h-44 w-44 text-ink/[0.025] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-3"
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                        0{index + 1}
                      </span>
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em]",
                          isMint
                            ? "border-mint/25 bg-mint/[0.07] text-mint"
                            : "border-gold/25 bg-gold/[0.07] text-gold",
                        )}
                      >
                        {feature.badge}
                      </span>
                    </div>

                    <div className="mt-auto pt-16">
                      <span
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500",
                          isMint
                            ? "border-mint/20 bg-mint/[0.05] text-mint group-hover:border-mint/40"
                            : "border-gold/20 bg-gold/[0.05] text-gold group-hover:border-gold/40",
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <h3 className="display mt-5 text-3xl leading-tight text-ink sm:text-4xl">
                        {feature.title}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
                        {feature.description}
                      </p>
                      <p className="mt-6 border-t border-hairline pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-muted">
                        {feature.stats}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
