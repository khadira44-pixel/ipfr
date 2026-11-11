import { networks } from "@/content/networks";
import { NetworkMark } from "@/components/sections/NetworkMark";

function NetworkTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
      aria-hidden={duplicate || undefined}
    >
      {networks.map((network) => (
        <div
          key={`${duplicate ? "duplicate" : "primary"}-${network}`}
          className="flex shrink-0 cursor-default items-center justify-center opacity-55 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
        >
          <NetworkMark name={network} />
        </div>
      ))}
    </div>
  );
}

export function MarqueeBanner() {
  return (
    <section
      aria-label="Networks available on StreamVault"
      className="marquee-wrapper relative w-full select-none overflow-hidden border-b border-hairline bg-obsidian-950 py-5"
    >
      <input id="marquee-toggle" type="checkbox" className="marquee-toggle sr-only" />

      <label
        htmlFor="marquee-toggle"
        className="marquee-toggle-label absolute right-5 top-4 z-20 cursor-pointer rounded-full border border-hairline bg-obsidian-900/80 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted transition hover:border-gold/30 hover:text-ink sm:right-8"
      >
        <span className="marquee-pause-text">Pause</span>
        <span className="marquee-play-text">Play</span>
      </label>

      <p className="container-page pb-4 font-mono text-[8px] uppercase tracking-[0.26em] text-ink-muted">
        The networks you already love
      </p>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 top-1/2 h-[120px] w-[360px] -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[80px]" />
        <div className="absolute right-1/4 top-1/2 h-[120px] w-[360px] -translate-y-1/2 rounded-full bg-mint/[0.035] blur-[80px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-obsidian-950 to-transparent sm:w-32"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-obsidian-950 to-transparent sm:w-32"
        aria-hidden="true"
      />

      <div className="marquee-track flex w-max items-center pt-3">
        <NetworkTrack />
        <NetworkTrack duplicate />
      </div>
    </section>
  );
}
