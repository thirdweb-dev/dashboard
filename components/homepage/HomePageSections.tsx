import { CLISection } from "./sections/CLISection";
import { ContractsSection } from "./sections/ContractsSection";
import { DashboardFeaturesSection } from "./sections/DashboardFeaturesSection";
import { ExamplesSection_HomePage } from "./sections/ExamplesSection_HomePage";
import { GetStartedSection } from "./sections/GetStartedSection";
import { HeroSection } from "./sections/HeroSection";
import { NewsLetterSection } from "./sections/NewsLetterSection";
import { NetworksSection } from "./sections/NextworksSection";
import { PricingSection } from "./sections/PricingSection";
import { SDKSection } from "./sections/SDKSection";
import { PartnerCarousel } from "components/partners/carousel";

// @TODO: use dynamic import for bottom sections to reduce initial bundle size and main thread blocking

export function HomePageSections() {
  return (
    <>
      <HeroSection />
      <PartnerCarousel />
      <ContractsSection />
      <NewsLetterSection />
      <SDKSection />
      <CLISection />
      <DashboardFeaturesSection />
      <NetworksSection />
      <PricingSection />
      <ExamplesSection_HomePage />
      <GetStartedSection />
    </>
  );
}
