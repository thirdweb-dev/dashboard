import { Box, DarkMode, Flex } from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { CLISection } from "components/homepage/sections/CLISection";
import { ContractsSection } from "components/homepage/sections/ContractsSection";
import { DashboardFeaturesSection } from "components/homepage/sections/DashboardFeaturesSection";
// import { ExamplesSectionHomepage } from "components/homepage/sections/ExamplesSectionHomePage";
import { GetStartedSection } from "components/homepage/sections/GetStartedSection";
import { HeroSection } from "components/homepage/sections/HeroSection";
import { KeyFeatures } from "components/homepage/sections/KeyFeatures";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { NetworksSection } from "components/homepage/sections/NextworksSection";
import { PricingSection } from "components/homepage/sections/PricingSection";
import { SDKSection } from "components/homepage/sections/SDKSection";
import { SolutionsSection } from "components/homepage/sections/Solutions";
import { StatsSection } from "components/homepage/sections/StatsSection";
import { PartnerCarousel } from "components/partners/carousel";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { PageId } from "page-id";
import { Suspense } from "react";
import { ThirdwebNextPage } from "utils/types";

const HomePage: ThirdwebNextPage = () => {
  return (
    <DarkMode>
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
        bg="#000"
      >
        <HomepageTopNav />
        <Box mt="-80px" pt="100px" overflowX="hidden">
          <HeroSection />
          <PartnerCarousel />
          <StatsSection />
          <KeyFeatures />
          <ContractsSection />
          <Suspense>
            <SDKSection />
            <CLISection />
            <DashboardFeaturesSection />
            <NetworksSection />
            <PricingSection />
            <SolutionsSection />
            {/* <ExamplesSectionHomepage /> */}
            <GetStartedSection />
            <NewsletterSection />
            <HomepageFooter />
          </Suspense>
        </Box>
      </Flex>
    </DarkMode>
  );
};

HomePage.pageId = PageId.Homepage;

export default HomePage;
