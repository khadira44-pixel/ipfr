import { Reveal } from "@/components/motion/Reveal";
import { platforms } from "@/content/platforms";

export function TrustBar() {
  return (
    <section
      id="compatibility"
      aria-labelledby="compatibility-heading"
      className="relative border-b border-hairline bg-obsidian-950/60"
    >
      <div className="container-page py-10 sm:py-12">
        <Reveal className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-gold">
              Compatibility
            </p>
            <h2
              id="compatibility-heading"
              className="display mt-3 text-[28px] leading-[1.02] text-ink sm:text-3xl"
            >
              One membership.
              <br />
              Every screen.
            </h2>
          </div>

          <ul className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <li key={platform.name} className="group flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline bg-white/[0.025] text-ink-muted transition duration-300 group-hover:border-gold/30 group-hover:text-gold">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold tracking-tight text-ink-soft">
                      {platform.name}
                    </span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.12em] text-ink-muted">
                      {platform.detail}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
