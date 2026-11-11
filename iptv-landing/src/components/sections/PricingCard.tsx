import { ArrowUpRight, Check } from "lucide-react";
import { CheckoutTrigger } from "@/components/checkout/CheckoutTrigger";
import { cn, formatUsd } from "@/lib/utils";
import type { Plan } from "@/types/plans";

export function PricingCard({ plan }: { plan: Plan }) {
  const highlighted = plan.highlighted;

  const content = (
    <div className="relative flex h-full flex-col">
      {highlighted ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,185,140,0.1),transparent_55%)]"
        />
      ) : null}

      <div className="relative flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
          {plan.duration}
        </span>
        {highlighted && plan.badge ? (
          <span className="rounded-full border border-gold/30 bg-gold/[0.08] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-gold">
            {plan.badge}
          </span>
        ) : (
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-muted/50">
            Open term
          </span>
        )}
      </div>

      <h3 className="display relative mt-6 text-[32px] leading-none text-ink sm:text-4xl">
        {plan.name}
      </h3>
      <p className="relative mt-3 min-h-[40px] text-[13px] leading-relaxed text-ink-muted">
        {plan.description}
      </p>

      <div className="relative mt-7 flex items-end gap-2 border-t border-hairline pt-6">
        <span className="display text-[clamp(2.8rem,4vw,3.6rem)] leading-none text-ink">
          {formatUsd(plan.price)}
        </span>
        <span className="pb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
          / month
        </span>
      </div>
      <p
        className={cn(
          "relative mt-2 font-mono text-[9px] tracking-[0.04em]",
          highlighted ? "text-gold" : "text-ink-muted",
        )}
      >
        {plan.billing}
      </p>

      <ul className="relative mt-7 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-soft">
            <span
              className={cn(
                "mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                highlighted
                  ? "border-gold/35 bg-gold/[0.08] text-gold"
                  : "border-hairline bg-white/[0.03] text-ink-muted",
              )}
            >
              <Check className="h-2.5 w-2.5" aria-hidden="true" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8">
        <CheckoutTrigger
          planId={plan.id}
          variant={highlighted ? "primary" : "secondary"}
          className="w-full py-3.5 text-[10px]"
        >
          {plan.cta}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </CheckoutTrigger>
        <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-ink-muted/70">
          Instant activation · Secure checkout
        </p>
      </div>
    </div>
  );

  if (highlighted) {
    return (
      <article className="gold-frame h-full">
        <div className="flex h-full flex-col bg-obsidian-900 p-7 sm:p-9">{content}</div>
      </article>
    );
  }

  return (
    <article data-spotlight className="surface-card h-full p-7 sm:p-9">
      {content}
    </article>
  );
}
