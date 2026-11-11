import { Lock, Mail } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { footerGroups, paymentMethods } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-obsidian-950">
      <div className="container-page relative z-10 pt-16 sm:pt-20">
        <div className="grid gap-12 border-b border-hairline pb-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Brand />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              A private cinema for the modern home. Uncompressed 4K &amp; 8K, dedicated fibre routing
              and a concierge who knows the difference.
            </p>

            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
              {siteConfig.supportEmail}
            </a>

            <p className="mt-6 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-muted">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-mint" />
              {siteConfig.claims.edgeClusters} edge clusters operational · 99.9% SLA
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:gap-10">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-gold/80">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] text-ink-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 py-7 sm:flex-row">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink-muted">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-2"
            aria-label="Payment methods accepted"
          >
            <Lock className="mr-1 h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-full border border-hairline bg-white/[0.02] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-ink-muted"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.16em] whitespace-nowrap text-center font-serif text-[clamp(5rem,18vw,16rem)] leading-[0.72] tracking-[-0.03em] text-ink/[0.03]">
          StreamVault
        </p>
      </div>
    </footer>
  );
}
