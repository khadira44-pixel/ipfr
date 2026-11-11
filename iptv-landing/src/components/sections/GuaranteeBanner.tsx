import Image from "next/image";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { CheckoutTrigger } from "@/components/checkout/CheckoutTrigger";
import { ActionLink } from "@/components/ui/ActionLink";
import { featuredPlanId } from "@/content/plans";
import { siteConfig } from "@/content/site";

const promises = [
  { icon: ShieldCheck, label: "30-day money-back guarantee" },
  { icon: Zap, label: "Instant activation" },
  { icon: Sparkles, label: "No contracts, ever" },
] as const;

export function GuaranteeBanner() {
  return (
    <section
      id="guarantee"
      aria-labelledby="guarantee-heading"
      className="relative pb-16 pt-12 sm:pb-20 sm:pt-16"
    >
      <div className="container-page">
        <div className="gold-frame">
          <div className="relative isolate overflow-hidden rounded-[23px] bg-obsidian-900 px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <Image
              src="/images/ambient-night.webp"
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              quality={60}
              className="object-cover opacity-[0.16] [filter:grayscale(1)_contrast(1.1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/70 via-obsidian-950/85 to-obsidian-950" />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-gold/[0.12] blur-[110px]"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                <span className="text-gold">05</span>
                <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
                <span>The promise</span>
              </p>

              <h2
                id="guarantee-heading"
                className="display mt-7 text-balance text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.96] text-ink"
              >
                Seven days to fall in love.{" "}
                <em className="text-gradient-gold italic">Thirty to change your mind.</em>
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-pretty text-sm leading-relaxed text-ink-muted">
                Try the full vault for seven days. If the picture, the sport or the service is not
                everything we promised, you have thirty days to walk away — no forms, no friction.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CheckoutTrigger
                  planId={featuredPlanId}
                  className="px-7 py-4 text-[10px] normal-case tracking-[0.12em]"
                >
                  Begin your trial
                </CheckoutTrigger>
                <ActionLink
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="px-7 py-4 text-[10px] normal-case tracking-[0.12em]"
                >
                  Speak to the concierge
                </ActionLink>
              </div>

              <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                {promises.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-muted"
                  >
                    <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
