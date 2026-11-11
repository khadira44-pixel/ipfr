import type { ShowcaseItem } from "@/types/content";

export const showcaseItems: readonly ShowcaseItem[] = [
  {
    id: "boxing",
    title: "The Main Event",
    meta: "Las Vegas · Uncompressed feed",
    image: "/images/showcase-boxing.webp",
    imageAlt: "Heavyweight boxing title fight broadcast in 8K",
    badge: "PPV · LIVE",
    format: "8K · DOLBY VISION",
    accent: "gold",
  },
  {
    id: "basketball",
    title: "Courtside",
    meta: "Game 7 · Floor camera",
    image: "/images/showcase-basketball.webp",
    imageAlt: "Professional basketball slam dunk during the finals",
    badge: "NBA FINALS",
    format: "HDR10+",
    accent: "mint",
  },
  {
    id: "football",
    title: "The Beautiful Game",
    meta: "Champions League · Semi-final",
    image: "/images/hero-broadcast.webp",
    imageAlt: "UEFA Champions League semi-final broadcast in 8K",
    badge: "UCL · LIVE",
    format: "8K HDR",
    accent: "mint",
  },
];
