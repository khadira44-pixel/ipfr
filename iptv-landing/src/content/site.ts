import { publicEnv } from "@/lib/env";

export const siteConfig = {
  name: "StreamVault",
  legalName: "StreamVault Technologies",
  title: "StreamVault™ | Private 4K & 8K IPTV Cinema",
  shortTitle: "StreamVault | Private IPTV Cinema",
  description:
    "A private 4K & 8K IPTV membership for people who take television seriously. 20,000+ live channels, uncompressed sport, Dolby Atmos and 99.9% uptime — delivered in under 60 seconds.",
  url: publicEnv.siteUrl,
  supportEmail: publicEnv.supportEmail,
  locale: "en_US",
  keywords: [
    "IPTV",
    "private IPTV",
    "4K streaming",
    "8K streaming",
    "live sports streaming",
    "premium TV channels",
    "StreamVault",
  ],
  claims: {
    customers: "50,000+",
    channels: "20,000+",
    uptime: "99.9%",
    edgeClusters: "142",
  },
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  email: siteConfig.supportEmail,
  description: siteConfig.description,
  slogan: "Television, considered.",
} as const;
