import type { NetworkName } from "@/content/networks";

/** Hand-set wordmarks so the ticker needs zero external logo assets. */
export function NetworkMark({ name }: { name: NetworkName }) {
  switch (name) {
    case "beIN SPORTS":
      return (
        <span className="flex items-center gap-1.5 text-xl font-black tracking-tighter sm:text-2xl">
          <span className="text-ink-soft">beIN</span>
          <span className="rounded bg-gold px-1.5 py-0.5 text-[10px] font-extrabold tracking-normal text-obsidian-950">
            SPORTS
          </span>
        </span>
      );
    case "NETFLIX":
      return (
        <span className="font-serif text-2xl tracking-[0.08em] text-ink-soft sm:text-[28px]">
          NETFLIX
        </span>
      );
    case "SKY SPORTS":
      return (
        <span className="flex items-center gap-1 text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="text-ink-soft">sky</span>
          <span className="border-l border-ink/25 pl-1.5 text-[11px] font-light uppercase tracking-[0.14em] text-ink-soft">
            sports
          </span>
        </span>
      );
    case "CNN":
      return (
        <span className="rounded border border-ink/50 px-2.5 py-0.5 text-2xl font-black tracking-widest text-ink-soft sm:text-3xl">
          CNN
        </span>
      );
    case "BBC":
      return (
        <span className="flex items-center gap-1" role="img" aria-label="BBC">
          {["B", "B", "C"].map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              aria-hidden="true"
              className="grid h-6 w-6 place-items-center bg-ink text-[11px] font-black text-obsidian-950 sm:h-7 sm:w-7 sm:text-xs"
            >
              {letter}
            </span>
          ))}
        </span>
      );
    case "CANAL+":
      return (
        <span className="flex items-center text-xl font-black tracking-tight text-ink-soft sm:text-2xl">
          <span>CANAL</span>
          <span className="ml-0.5 text-2xl font-black text-gold">+</span>
        </span>
      );
    case "ESPN":
      return (
        <span className="border-b border-ink/60 pb-0.5 text-2xl font-black italic tracking-widest text-ink-soft sm:text-3xl">
          ESPN
        </span>
      );
    case "HBO MAX":
      return (
        <span className="flex items-center gap-1.5 text-xl font-black tracking-tighter sm:text-2xl">
          <span className="text-ink-soft">HBO</span>
          <span className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
            MAX
          </span>
        </span>
      );
    case "DAZN":
      return (
        <span className="rounded-md border border-ink/30 px-2.5 py-0.5 text-xl font-black tracking-tighter text-ink-soft sm:text-2xl">
          DAZN
        </span>
      );
    case "EUROSPORT":
      return (
        <span className="flex items-center gap-1 text-lg font-black tracking-wider text-ink-soft sm:text-xl">
          <span aria-hidden="true" className="text-gold">
            ★
          </span>
          <span>EUROSPORT</span>
        </span>
      );
    case "FOX SPORTS":
      return (
        <span className="flex items-center gap-1 text-xl font-black tracking-tighter sm:text-2xl">
          <span className="font-extrabold text-ink-soft">FOX</span>
          <span className="rounded border border-gold/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-gold">
            SPORTS
          </span>
        </span>
      );
    default:
      return <span className="text-xl font-bold text-ink-soft">{name}</span>;
  }
}
