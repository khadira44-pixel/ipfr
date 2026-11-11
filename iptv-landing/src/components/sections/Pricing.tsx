import { Lock, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PricingCard } from "@/components/sections/PricingCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { plans } from "@/content/plans";

const assurances = [
  { icon: ShieldCheck, label: "30-day money-back guarantee" },
  { icon: Zap, label: "Activation in under 60 seconds" },
  { icon: Lock, label: "256-bit secure checkout" },
] as const;

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative border-t border-hairline bg-obsidian-950 pb-16 pt-24 sm:pb-20 sm:pt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[150px]" />
      </div>

      <div className="container-page relative z-10">
        <SectionHeader
          align="center"
          index="04"
          eyebrow="Membership"
          title={
            <>
              Choose your <em className="text-gradient-gold italic">seat.</em>
            </>
          }
          description="Three ways into the vault. Every one includes the full channel library, instant activation and a human on the other end of the line."
          titleId="pricing-heading"
        />

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 110} className="h-full">
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <ul className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-hairline pt-8">
          {assurances.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-muted"
            >
              <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
