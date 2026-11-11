import { ArrowDownRight, ArrowUpRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { CheckoutTrigger } from "@/components/checkout/CheckoutTrigger";
import { HeroPreview } from "@/components/sections/HeroPreview";
import { ActionLink } from "@/components/ui/ActionLink";
import { featuredPlanId } from "@/content/plans";
import { siteConfig } from "@/content/site";

const proof = [
  { value: siteConfig.claims.channels, label: "Live channels" },
  { value: "4K / 8K", label: "Reference picture" },
  { value: siteConfig.claims.uptime, label: "Measured uptime" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-obsidian">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-gold/[0.07] blur-[130px]" />
        <div className="absolute -right-52 top-1/3 h-[560px] w-[560px] rounded-full bg-mint/[0.045] blur-[140px]" />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      <div className="container-page relative z-10 pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="hero-enter lg:col-span-6 xl:col-span-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-0.5 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-3 w-3 fill-current" />
                ))}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-hairline-strong" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                {siteConfig.claims.customers} members worldwide
              </span>
            </div>

            <h1 className="display mt-7 text-balance text-[clamp(3rem,6.3vw,6.3rem)] leading-[0.9] text-ink">
              The world&apos;s finest television,{" "}
              <em className="text-gradient-gold italic">beautifully delivered.</em>
            </h1>

            <p className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-ink-muted sm:text-[15px]">
              A private IPTV membership with {siteConfig.claims.channels} live channels, uncompressed
              4K &amp; 8K sport and a concierge who answers. One membership. Every screen.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CheckoutTrigger
                planId={featuredPlanId}
                className="px-7 py-4 text-[11px] normal-case tracking-[0.12em]"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Begin your 7-day trial
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </CheckoutTrigger>
              <ActionLink href="#pricing" className="px-7 py-4 text-[11px] normal-case tracking-[0.12em]">
                Explore membership
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </ActionLink>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-hairline border-t border-hairline pt-6">
              {proof.map((item, index) => (
                <div key={item.label} className={index === 0 ? "pr-4" : "px-4"}>
                  <p className="display text-2xl text-ink sm:text-[28px]">{item.value}</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-[11px] text-ink-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              30-day guarantee · No contracts · Cancel in one click
            </p>
          </div>

          <div className="hero-enter-delayed lg:col-span-6 xl:col-span-6">
            <div className="mx-auto max-w-[620px] lg:ml-auto">
              <HeroPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
