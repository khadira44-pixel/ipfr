import type { LucideIcon } from "lucide-react";

export type Accent = "gold" | "mint";

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  badge: string;
  stats: string;
  icon: LucideIcon;
  accent: Accent;
}

export interface Platform {
  name: string;
  detail: string;
  icon: LucideIcon;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  meta: string;
  image: string;
  imageAlt: string;
  badge: string;
  format: string;
  accent: Accent;
}

export interface FooterLinkGroup {
  title: string;
  links: readonly NavItem[];
}
