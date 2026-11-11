import { Headphones, Smartphone, Tv, Zap } from "lucide-react";
import type { Feature } from "@/types/content";

export const features: readonly Feature[] = [
  {
    icon: Tv,
    title: "Reference-grade picture",
    description:
      "True 4K and 8K HDR with BT.2020 colour, delivered at the bitrate the director intended.",
    badge: "8K · DOLBY VISION",
    stats: "10-bit colour · 120 fps native",
    accent: "gold",
  },
  {
    icon: Zap,
    title: "Latency, engineered away",
    description:
      "Dedicated edge routing keeps the decisive moment live — no buffers, no apologies.",
    badge: "< 0.04S ROUTING",
    stats: "142 edge clusters · 0 dropped frames",
    accent: "mint",
  },
  {
    icon: Smartphone,
    title: "Every screen. One membership.",
    description:
      "Your living room, your phone and the match abroad — synchronised in a single, elegant app.",
    badge: "5 SCREENS",
    stats: "Apple · Android · Fire TV · Tizen · webOS",
    accent: "mint",
  },
  {
    icon: Headphones,
    title: "A concierge, not a queue",
    description:
      "Real people on WhatsApp and Telegram, around the clock, for anything from setup to subtitles.",
    badge: "24/7 CONCIERGE",
    stats: "Average first reply under 60 seconds",
    accent: "gold",
  },
];
