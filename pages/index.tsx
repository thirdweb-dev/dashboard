import HomePageCard from "components/homepage/sections/HomePageCard";
import { Box, DarkMode, Flex } from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { HeroSection } from "components/homepage/sections/HeroSection";
import { StatsSection } from "components/homepage/sections/StatsSection";
import { PartnerCarousel } from "components/partners/carousel";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { PageId } from "page-id";
import { Suspense } from "react";
import { ThirdwebNextPage } from "utils/types";
import { AnimatedCLICommand } from "../components/homepage/AnimatedCLICommand/AnimatedCLICommand";

const TRACKING_CATEGORY = "homepage";

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
        <Box mt="-80px" pt={{ base: "100px", xl: "40px" }} overflowX="hidden">
          <HeroSection TRACKING_CATEGORY={TRACKING_CATEGORY} />
          <PartnerCarousel />
          <StatsSection />
          <HomePageCard
            title="Client-side SDKs to connect users to web3"
            description="Onboard any user, connect to any wallet, and facilitate any transaction. Generate revenue with payments and build seamless apps with Account Abstraction."
            miniTitle="Frontend"
            miniDescription="CONNECT"
            miniImage={require("public/assets/landingpage/connect-icon.png")}
            customContactUsComponent={<AnimatedCLICommand />}
            ctaText="Learn more"
            ctaLink="/connect"
            image={require("public/assets/landingpage/connect-hero.png")}
            mobileImage={require("public/assets/landingpage/connect-hero.png")}
            partnersImages={[
              require("public/assets/landingpage/treasure.png"),
              require("public/assets/landingpage/courtyard.png"),
              require("public/assets/landingpage/myna.png"),
              require("public/assets/landingpage/aavegotchi.png"),
              require("public/assets/landingpage/ztx.png"),
              require("public/assets/landingpage/torque.png"),
            ]}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="Complete, scalable web3 backend"
            description="Scalable smart contract APIs backed by secure wallets. Create and interact with backend developer wallets, enabling high throughput with automatic nonce and gas management."
            miniTitle="Backend"
            miniDescription="ENGINE"
            miniImage={require("public/assets/landingpage/engine-icon.png")}
            ctaText="Learn more"
            ctaLink="/connect"
            contactUsText="Dashboard"
            contactUsLink="/dashboard"
            contactUsButtonMaxWidth="186px"
            image={require("public/assets/landingpage/engine-hero.png")}
            mobileImage={require("public/assets/landingpage/engine-hero.png")}
            partnersImages={[
              require("public/assets/landingpage/coinbase-v2.png"),
              require("public/assets/landingpage/layer3.png"),
              require("public/assets/landingpage/coolcats.png"),
              require("public/assets/landingpage/treasure.png"),
              require("public/assets/landingpage/infinigods.png"),
              require("public/assets/landingpage/avacloud.png"),
            ]}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <HomePageCard
            title="End-to-end tools for smart contracts"
            description="Everything you need to build, deploy and integrate smart contracts into your app. Browse the largest library of published smart contracts and securely deploy to any EVM chain."
            miniTitle="Onchain"
            miniDescription="CONTRACTS"
            miniImage={require("public/assets/landingpage/contracts-icon.png")}
            ctaText="Learn more"
            ctaLink="/connect"
            contactUsText="Explore Contracts"
            contactUsLink="/contracts"
            contactUsButtonMaxWidth="254px"
            image={require("public/assets/landingpage/contracts-hero.png")}
            mobileImage={require("public/assets/landingpage/contracts-hero.png")}
            partnersImages={[
              require("public/assets/landingpage/animoca.png"),
              require("public/assets/landingpage/rarible.png"),
              require("public/assets/landingpage/mcfarlane.png"),
              require("public/assets/landingpage/pixels-v2.png"),
              require("public/assets/landingpage/gala.png"),
              require("public/assets/landingpage/mirror-v2.png"),
            ]}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />

          {/* <Box px={4}>
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
          <ValuesSection /> */}
          <Suspense>
            {/*  <SDKSection />
            <AnyEVMSection />
            <PricingSection trackingCategory={TRACKING_CATEGORY} onHomepage />
            <SolutionsSection />
            <GetStartedSection />
            <NewsletterSection /> */}
            <HomepageFooter />
          </Suspense>
        </Box>
      </Flex>
    </DarkMode>
  );
};

HomePage.pageId = PageId.Homepage;

export default HomePage;
