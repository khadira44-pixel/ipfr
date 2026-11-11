import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { showcaseItems } from "@/content/showcase";
import { cn } from "@/lib/utils";
import type { ShowcaseItem } from "@/types/content";

function ShowcaseCard({
  item,
  index,
  large = false,
}: {
  item: ShowcaseItem;
  index: number;
  large?: boolean;
}) {
  const isMint = item.accent === "mint";

  return (
    <article
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-hairline bg-surface",
        large ? "min-h-[420px] sm:min-h-[560px]" : "min-h-[250px] sm:min-h-[270px]",
      )}
    >
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        loading="lazy"
        sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
        quality={75}
        className="object-cover [filter:saturate(0.82)_contrast(1.06)] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/15 to-obsidian-950/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/35 to-transparent" />

      <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-4 sm:p-5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] font-medium uppercase tracking-[0.16em] backdrop-blur-md",
            isMint
              ? "border-mint/30 bg-mint/10 text-mint"
              : "border-gold/30 bg-gold/10 text-gold",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("h-1 w-1 rounded-full", isMint ? "bg-mint" : "bg-gold")}
          />
          {item.badge}
        </span>
        <span className="rounded-full border border-white/10 bg-obsidian-950/35 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft/90 backdrop-blur-md">
          {item.format}
        </span>
      </div>

      <div className="absolute bottom-0 right-0 p-4 sm:p-5">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-obsidian-950/25 text-ink-soft opacity-0 backdrop-blur-md transition duration-500 group-hover:border-gold/40 group-hover:text-gold group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 pr-16 sm:p-7 sm:pr-20">
        <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-gold/90">
          {String(index + 1).padStart(2, "0")} · Live
        </p>
        <h3
          className={cn(
            "display mt-2 text-ink",
            large ? "text-4xl sm:text-5xl" : "text-2xl sm:text-[28px]",
          )}
        >
          {item.title}
        </h3>
        <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-muted">
          {item.meta}
        </p>
      </div>
    </article>
  );
}

export function Showcase() {
  const [featured, ...rest] = showcaseItems;

  if (!featured) return null;

  return (
    <section id="collection" aria-labelledby="collection-heading" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            index="01"
            eyebrow="The collection"
            title={
              <>
                Tonight, in <em className="text-gradient-gold italic">extraordinary</em> detail.
              </>
            }
            description="A live window into the vault: the fights, the finals and the quiet Sunday classics — all in reference-grade 4K and 8K."
            titleId="collection-heading"
            className="mb-0 sm:mb-0"
          />
          <a
            href="#pricing"
            className="group mb-1 hidden shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-gold sm:inline-flex"
          >
            Explore membership
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Parallax className="lg:col-span-7" offset={26}>
            <Reveal>
              <ShowcaseCard item={featured} index={0} large />
            </Reveal>
          </Parallax>

          <div className="grid gap-4 lg:col-span-5">
            {rest.map((item, index) => (
              <Parallax key={item.id} offset={18}>
                <Reveal delay={(index + 1) * 100}>
                  <ShowcaseCard item={item} index={index + 1} />
                </Reveal>
              </Parallax>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
