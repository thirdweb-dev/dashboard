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
        <button
          onClick={() => {
            fetch(
              "https://thirdweb-3vkx12zef.thirdweb-preview.com/api/frame/redirect",
              {
                method: "POST",
                body: JSON.stringify({
                  trustedData: {
                    messageBytes:
                      "0a50080d10aa970f1895dab12e20018201400a2068747470733a2f2f6672616d65732e74686972647765622e636f6d2f6d696e7410011a1a08ce920e121421620f9e36e8223425a762fbdd8ae632f8216a7512144df52e9e3cea5abf29b27d47d1d875b8e8c98adb18012240585a2a20a2e94a602ecab72d454407832f82613ff52dd4224859f8e7f02e5630d1e85d2202ebed80236b2256d26dd967b800320e1dc47696e63cc97dfa8d640528013220b0f7a4ff8e5264eef90a822199dc84966fa7474b673faf935b0ceb86a0f5ca3c",
                  },
                }),
              },
            );
          }}
        >
          Hey
        </button>
        <HomepageTopNav />
        <Box mt="-80px" pt="100px" overflowX="hidden">
          <HeroSection />
          <PartnerCarousel />
          <StatsSection />
          <HomePageCard
            title="Onboard everyone to web3, instantly"
            description="The complete web3 wallet stack — with a customizable Connect Wallet modal, embedded wallets for flexible sign-in options, and account abstraction for the smoothest user experiences."
            introductionTitle="WALLET PRODUCTS"
            image={require("public/assets/bear-market-airdrop/desktop-wallets.png")}
            mobileImage={require("public/assets/bear-market-airdrop/mobile-wallets.png")}
            products={filterProducts("wallets")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="Build smart contracts, deploy on any EVM"
            description="The smart contract development toolkit — with a powerful Solidity SDK to build custom contracts, a library of pre-built & audited contracts, and a 1-click deployment flow to any EVM-compatible blockchains."
            introductionTitle="CONTRACT PRODUCTS"
            image={require("public/assets/bear-market-airdrop/desktop-contracts.png")}
            mobileImage={require("public/assets/bear-market-airdrop/mobile-contracts.png")}
            products={filterProducts("contracts")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="Scale with enterprise-grade infrastructure"
            description="The production-grade server for scalable web3 apps — with backend wallet creation, nonce management, smart contract interactions, account abstraction support, gasless transactions, and managed infrastructure."
            introductionTitle="INFRASTRUCTURE PRODUCT"
            image={require("public/assets/bear-market-airdrop/desktop-engine.png")}
            mobileImage={require("public/assets/bear-market-airdrop/mobile-engine.png")}
            products={filterProducts("infrastructure")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="Simplify NFT purchases with fiat checkouts"
            description="The most powerful NFT checkout — with worldwide availability, support for major payment methods, and full compliance for enterprise-grade apps. Built to onboard everyone, even if they've never created a web3 wallet or bought crypto."
            introductionTitle="CHECKOUT PRODUCT"
            image={require("public/assets/bear-market-airdrop/desktop-checkout.png")}
            mobileImage={require("public/assets/bear-market-airdrop/mobile-checkout.png")}
            products={filterProducts("payments")}
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
