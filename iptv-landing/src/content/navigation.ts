import type { FooterLinkGroup, NavItem } from "@/types/content";

export const mainNav: readonly NavItem[] = [
  { label: "The Collection", href: "#collection" },
  { label: "The Standard", href: "#standard" },
  { label: "Membership", href: "#pricing" },
  { label: "The Promise", href: "#guarantee" },
];

export const footerGroups: readonly FooterLinkGroup[] = [
  {
    title: "The Vault",
    links: [
      { label: "The Collection", href: "#collection" },
      { label: "4K / 8K Architecture", href: "#features" },
      { label: "Latency & Routing", href: "#features" },
      { label: "Membership", href: "#pricing" },
    ],
  },
  {
    title: "Supported Hardware",
    links: [
      { label: "Apple TV 4K & iOS", href: "#compatibility" },
      { label: "Amazon Fire TV 4K", href: "#compatibility" },
      { label: "Android TV & TiviMate", href: "#compatibility" },
      { label: "Samsung & LG Smart TV", href: "#compatibility" },
    ],
  },
  {
    title: "Trust & Concierge",
    links: [
      { label: "30-Day Guarantee", href: "#guarantee" },
      { label: "Instant Auto-Delivery", href: "#guarantee" },
      { label: "Zero-Log Privacy", href: "#guarantee" },
      { label: "24/7 Telegram & WhatsApp", href: "#pricing" },
    ],
  },
];

export const paymentMethods = [
  "Visa",
  "Mastercard",
  "Apple Pay",
  "PayPal",
  "Bitcoin",
  "Ethereum",
  "USDT",
] as const;
