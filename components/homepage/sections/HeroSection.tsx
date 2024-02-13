import { Aurora } from "../Aurora";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";

interface HeroSectionProps {
  TRACKING_CATEGORY: string;
}

export const HeroSection = ({ TRACKING_CATEGORY }: HeroSectionProps) => {
  return (
    <HomepageSection position="relative" zIndex={2}>
      {/* left */}
      <Aurora
        pos={{ left: "50%", top: "-150px" }}
        size={{ width: "2050px", height: "1200px" }}
        color="hsl(290deg 92% 54% / 20%)"
      />

      <LandingHeroWithSideImage
        titleWithGradient=""
        title="Build web3 apps fast, on any EVM"
        subtitle="The full stack web3 development platform. Onboard users with wallets, build & deploy smart contracts, accept fiat with payments, and scale apps with infrastructure."
        trackingCategory={TRACKING_CATEGORY}
        ctaLink="/dashboard/engine"
        ctaText="Get started"
        contactUsTitle="Book a demo"
        gradient="linear(to-r, #9786DF, #9786DF)"
        image={require("public/assets/landingpage/desktop/hero.png")}
        mobileImage={require("public/assets/landingpage/mobile/hero.png")}
        noContactUs
        mt={{ base: 4, md: 20 }}
      />
    </HomepageSection>
  );
};
