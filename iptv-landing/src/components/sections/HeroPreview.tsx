import Image from "next/image";
import { Play, Signal, Volume2 } from "lucide-react";

/**
 * Decorative product mock. Assistive technology sees one labelled image, not
 * a set of fake player controls.
 */
export function HeroPreview() {
  return (
    <div
      role="img"
      aria-label="Preview of the StreamVault player showing a live UEFA Champions League match in 8K with Dolby Atmos"
      className="relative"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,185,140,0.14),transparent_65%)]"
      />

      <div className="relative rounded-[28px] border border-gold/15 bg-obsidian-900/80 p-2 shadow-card backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.22em] text-ink-muted">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            StreamVault · Live
          </span>
          <span className="rounded-full border border-gold/25 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-gold">
            8K · Dolby Vision
          </span>
        </div>

        <div className="relative aspect-[16/11] overflow-hidden rounded-[20px] border border-hairline bg-black">
          <Image
            src="/images/hero-broadcast.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw"
            quality={75}
            className="kenburns object-cover [filter:contrast(1.06)_saturate(0.92)_brightness(0.94)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-obsidian-950/10 to-obsidian-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,8,0.55))]" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-gold">
                Live · Semi-final
              </p>
              <p className="display mt-1.5 text-xl leading-tight text-ink sm:text-2xl">
                UEFA Champions League
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-obsidian-950/30 backdrop-blur-md">
              <Play className="ml-0.5 h-5 w-5 fill-gold text-gold" aria-hidden="true" />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
            <div className="h-px w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft" />
            </div>
            <div className="flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft/80">
              <span>74:18 · Second half</span>
              <span className="text-gold">Dolby Atmos 7.1.4</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-hairline px-1 py-3 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-muted">
          <span className="flex items-center justify-center gap-1.5">
            <Signal className="h-3 w-3 text-mint" aria-hidden="true" />
            0 dropped
          </span>
          <span className="text-center">92.4 Mbps</span>
          <span className="flex items-center justify-center gap-1.5">
            <Volume2 className="h-3 w-3 text-gold" aria-hidden="true" />
            Atmos
          </span>
        </div>
      </div>

      <div className="float-soft absolute -bottom-9 -left-4 hidden w-[180px] rounded-2xl border border-hairline bg-obsidian-900/90 p-4 shadow-card backdrop-blur-xl sm:block lg:-left-10">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-muted">Edge routing</p>
        <p className="display mt-1 text-3xl text-ink">
          0.04<span className="text-base text-gold">s</span>
        </p>
        <p className="mt-1 text-[10px] leading-snug text-ink-muted">142 clusters. Zero excuses.</p>
      </div>

      <div className="absolute -right-4 top-20 hidden w-[168px] rounded-2xl border border-hairline bg-obsidian-900/90 p-4 shadow-card backdrop-blur-xl sm:block lg:-right-8">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-muted">Live now</p>
        <p className="display mt-1 text-3xl text-ink">20k+</p>
        <p className="mt-1 text-[10px] leading-snug text-ink-muted">Channels, films and fixtures.</p>
      </div>
    </div>
  );
}
