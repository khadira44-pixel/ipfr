import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Features } from "@/components/sections/Features";
import { GuaranteeBanner } from "@/components/sections/GuaranteeBanner";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { Pricing } from "@/components/sections/Pricing";
import { Showcase } from "@/components/sections/Showcase";
import { TrustBar } from "@/components/sections/TrustBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { plans } from "@/content/plans";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "StreamVault IPTV Subscription",
  description: siteConfig.description,
  brand: {
    "@type": "Brand",
    name: siteConfig.name,
  },
  offers: plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.description,
    price: plan.price.toFixed(2),
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${siteConfig.url}/#pricing`,
  })),
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <TrustBar />
        <MarqueeBanner />
        <Showcase />
        <Manifesto />
        <Features />
        <Pricing />
        <GuaranteeBanner />
      </main>
      <Footer />
      <JsonLd data={productJsonLd} />
    </>
  );
}
