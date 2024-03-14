import HomePageCard from "components/homepage/sections/HomePageCard";
import { AnyEVMSection } from "../components/homepage/sections/AnyEVM";
import { Box, Center, DarkMode, Flex } from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { GetStartedSection } from "components/homepage/sections/GetStartedSection";
import { HeroSection } from "components/homepage/sections/HeroSection";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { PricingSection } from "components/homepage/sections/PricingSection";
import { SDKSection } from "components/homepage/sections/SDKSection";
import { SolutionsSection } from "components/homepage/sections/Solutions";
import { StatsSection } from "components/homepage/sections/StatsSection";
import { ValuesSection } from "components/homepage/sections/ValuesSection";
import { WithoutThirdwebSection } from "components/homepage/sections/WithoutThirdwebSection";
import { PartnerCarousel } from "components/partners/carousel";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { PageId } from "page-id";
import { Suspense } from "react";
import { ThirdwebNextPage } from "utils/types";
import { PRODUCTS, metrics } from "components/product-pages/common/nav/data";
import { Heading, Text } from "tw-components";
import LandingCardWithMetrics from "components/landing-pages/card-with-metrics";

const TRACKING_CATEGORY = "homepage";

const HomePage: ThirdwebNextPage = () => {
  const filterProducts = (section: string) => {
    return PRODUCTS.filter(
      (p) => p.section === section && !!p.inLandingPage && !!p.link,
    );
  };

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
        <Box mt="-80px" pt={{ base: "100px", xl: "40px" }} overflowX="hidden">
          <HeroSection TRACKING_CATEGORY={TRACKING_CATEGORY} />
          <PartnerCarousel />
          <StatsSection />
          <HomePageCard
            title="Build web3 apps that anyone can use"
            description="Client-side SDKs to connect & onboard users to web3 — with customizable Connect Wallet flows, in-app wallets with web2 logins, account abstraction for seamless UX, and crypto & fiat payments."
            introductionTitle="WALLET PRODUCTS"
            image={require("public/assets/bear-market-airdrop/desktop-wallets.png")}
            mobileImage={require("public/assets/bear-market-airdrop/mobile-wallets.png")}
            products={filterProducts("connect")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="Deploy smart contracts to any EVM chain"
            description="Everything you need to build, deploy, and integrate smart contracts into your app — with a powerful Solidity SDK to build custom contracts, a library of pre-built contracts to reduce development time, and secure 1-click deployment flows."
            introductionTitle="CONTRACT PRODUCTS"
            image={require("public/assets/bear-market-airdrop/desktop-contracts.png")}
            mobileImage={require("public/assets/bear-market-airdrop/mobile-contracts.png")}
            products={filterProducts("contracts")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="Scale your app with a production-grade web3 backend"
            description="Smart contract APIs for any EVM chain. Create & manage secure backend wallets with automatic nonce queueing, gas-optimized retries, and high transaction throughput."
            introductionTitle="INFRASTRUCTURE PRODUCT"
            image={require("public/assets/bear-market-airdrop/desktop-engine.png")}
            mobileImage={require("public/assets/bear-market-airdrop/mobile-engine.png")}
            products={filterProducts("infrastructure")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />

          <Box px={4}>
            <LandingCardWithMetrics
              title={
                <Center flexDir="column" textAlign="center">
                  <Heading size="display.sm" color="white">
                    Trusted by the best
                  </Heading>

                  <Text size="body.lg" mt={6}>
                    Powering web3 apps across verticals — from onchain games to
                    creator platforms.
                  </Text>
                </Center>
              }
              desktopColumns={3}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              metrics={metrics}
            />
          </Box>

          <WithoutThirdwebSection />
          <ValuesSection />
          <Suspense>
            <SDKSection />
            <AnyEVMSection />
            <PricingSection trackingCategory={TRACKING_CATEGORY} onHomepage />
            <SolutionsSection />
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
