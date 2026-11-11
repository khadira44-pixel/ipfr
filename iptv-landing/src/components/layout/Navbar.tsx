"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/ui/Brand";
import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { mainNav } from "@/content/navigation";
import { featuredPlanId } from "@/content/plans";
import { siteConfig } from "@/content/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMenuOpen = mobileMenuOpen && !isDesktop;
  const { openCheckout } = useCheckout();

  useScrollLock(isMenuOpen);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-hairline bg-obsidian-950">
        <div className="container-page flex h-9 items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
          <p className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            <span className="truncate text-ink-muted/90">
              <span className="sm:hidden">Live tonight · UCL in 8K</span>
              <span className="hidden sm:inline">Live tonight · Champions League semi-final in 8K</span>
            </span>
          </p>
          <a
            href="#pricing"
            className="hidden shrink-0 items-center gap-1.5 text-gold transition-colors hover:text-gold-soft sm:inline-flex"
          >
            7-day trial
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="border-b border-hairline bg-obsidian-950/75 backdrop-blur-2xl">
        <div className="container-page">
          <div className="flex h-[76px] items-center justify-between gap-6">
            <Link
              href="/"
              aria-label="StreamVault home"
              className="rounded-full transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <Brand />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
              {mainNav.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-5 md:flex">
              <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted lg:flex">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-mint" />
                All systems nominal
              </span>
              <button
                type="button"
                onClick={() => openCheckout(featuredPlanId)}
                className="btn-primary px-5 py-2.5 text-[10px]"
              >
                Start free trial
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white/[0.03] text-ink transition hover:border-gold/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold md:hidden"
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300",
                    isMenuOpen && "top-1/2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300",
                    isMenuOpen && "bottom-1/2 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-7.25rem)] overflow-y-auto border-b border-hairline bg-obsidian-950/95 shadow-2xl shadow-black/60 backdrop-blur-2xl md:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-6">
            <ul>
              {mainNav.map((item, index) => (
                <li key={item.href} className="border-b border-hairline">
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-5 focus-visible:outline-none"
                  >
                    <span className="font-mono text-[9px] tracking-[0.2em] text-gold/60">
                      0{index + 1}
                    </span>
                    <span className="display text-4xl text-ink transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openCheckout(featuredPlanId);
              }}
              className="btn-primary mt-6 w-full py-3.5 text-[11px]"
            >
              Start free trial
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="mt-5 flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink"
            >
              <Mail className="h-3 w-3 text-gold" aria-hidden="true" />
              {siteConfig.supportEmail}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
