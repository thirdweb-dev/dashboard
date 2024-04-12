import { Box, Container, Flex } from "@chakra-ui/react";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingPlan } from "components/landing-pages/plan";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Text, TrackedLink, TrackedLinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "chains-landing";

const SolutionsChains: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Instant Dev Tools & Infrastructure on your Chain",
        description:
          "The easiest way for developers to build apps on your EVM chain — with the complete web3 development stack: wallets, contracts, payments, & infra.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/chains-solutions.png`,
              width: 1200,
              height: 630,
              alt: "Instant Dev Tools & Infrastructure on your Chain",
            },
          ],
        },
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "60px", md: "180px" }}
      >
        <LandingHeroWithSideImage
          miniTitle="Chains"
          miniImage={require("../../../public/assets/solutions-pages/chains/mini-icon.png")}
          title="Infrastructure for your chain,"
          titleWithGradient="instantly"
          subtitle="The easiest way for developers to build on your EVM chain — with wallets, contracts, payments, and infrastructure to scale their web3 apps."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/contact-us"
          noContactUs
          gradient="linear(to-r,  #F856C8, #F856C8)"
          ctaText="Contact Us"
          image={require("../../../public/assets/product-pages/hero/desktop-hero-chains.png")}
          mobileImage={require("../../../public/assets/product-pages/hero/mobile-hero-chains.png")}
        />

        <Flex position="relative" w="full">
          <Box zIndex={1} position="relative">
            <LandingGridSection>
              <LandingIconSectionItem
                icon={require("../../../public/assets/solutions-pages/icons/icon-grow.svg")}
                title="Add to your stack easily"
                description="Composable products that you can integrate flexibly. Use our production-grade managed infrastructure or bring your own permissioned RPCs."
              />
              <LandingIconSectionItem
                icon={require("../../../public/assets/solutions-pages/icons/icon-scale.svg")}
                title="Grow your ecosystem"
                description="Empower developers to build on your chain with smart contracts, wallets, payments, infra, & everything they need to scale their web3 apps."
              />
              <LandingIconSectionItem
                icon={require("../../../public/assets/solutions-pages/icons/icon-fee.svg")}
                title="Offer the best DX"
                description="SDKs in every language, personalized dashboards, and onchain analytics for developers to manage their web3 apps — out of the box."
              />
            </LandingGridSection>
          </Box>
        </Flex>

        <LandingGridSection desktopColumns={3}>
          <LandingPlan
            title="Silver"
            description="Support for thirdweb products with public infrastructure."
            list={[
              "Smart Contract Deployment",
              "Cross-Platform Connect Integration",
              "In-App Wallets: Email, Social, Phone",
              "thirdweb Engine: Backend Wallets & Nonce Management",
              <Text key="chainlist" size="body.lg" color="#646D7A">
                Added to{" "}
                <TrackedLink
                  href="/chainlist"
                  isExternal
                  category={TRACKING_CATEGORY}
                  label="thirdweb_chainlist"
                  textDecoration="underline"
                >
                  thirdweb Chainlist
                </TrackedLink>
              </Text>,
            ]}
            btnTitle="Contact us"
            btnHref="/contact-us"
            iconImage={require("../../../public/assets/solutions-pages/chains/silver-tier.png")}
            trackingCategory={TRACKING_CATEGORY}
          />

          <LandingPlan
            title="Gold"
            description="Production grade infrastructure to kickstart your chain & attract devs."
            listTitle="Everything in Silver tier, plus:"
            list={[
              "Production-Grade Infrastructure",
              "Higher Rate Limits for RPCs",
              "Custom Technical Documentation",
              "Smart Contract Analytics",
              "thirdweb Startup Program For Your Ecosystem",
              "App Chain Registry API",
            ]}
            btnTitle="Contact us"
            btnHref="/contact-us"
            iconImage={require("../../../public/assets/solutions-pages/chains/gold-tier.png")}
            trackingCategory={TRACKING_CATEGORY}
          />

          <LandingPlan
            title="Platinum"
            description="The complete thirdweb product suite and first-class support for your chain."
            listTitle="Everything in the Gold tier, plus?"
            list={[
              "Account Abstraction Infrastructure: Smart Accounts, Bundler, Paymaster",
              "Point-of-Sale Payments: On-Ramp, Swap, Bridge, Checkout",
              "99.9% Infrastructure uptime SLAs",
              "24 hour customer support SLAs",
              "Dedicated Slack support channel",
              "Premium placements for your chain",
              "thirdweb Indexer (Coming in Q2)",
            ]}
            btnTitle="Contact us"
            btnHref="/contact-us"
            iconImage={require("../../../public/assets/solutions-pages/chains/plat-tier.png")}
            trackingCategory={TRACKING_CATEGORY}
          />
        </LandingGridSection>

        <LandingGridSection
          title={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="full"
              marginBottom="38px"
            >
              <LandingSectionHeading
                title="Your chain's application layer, solved"
                blackToWhiteTitle=""
              />
            </Box>
          }
          desktopColumns={4}
        >
          <LandingCardWithImage
            title="Connect"
            description="The complete web3 wallet toolkit — with Connect Wallet UI components, embedded wallets, auth, and account abstraction out of the box.​"
            image={require("../../../public/assets/landingpage/account-abstraction-desktop.png")}
            mobileImage={require("../../../public/assets/landingpage/account-abstraction-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/connect"
            direction="horizontal"
          />

          <LandingCardWithImage
            title="Smart Contracts"
            description="Deploy, read, & write to any smart contract across any EVM-compatible blockchain — and build with thirdweb's audited smart contracts."
            image={require("../../../public/assets/landingpage/smart-contract-audits-desktop.png")}
            mobileImage={require("../../../public/assets/landingpage/smart-contract-audits-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/explore"
          />

          <LandingCardWithImage
            title="Gasless Transactions"
            description="Onboard users in an instant & create seamless web3 UX by sponsoring gas fees — for any & all transactions."
            image={require("../../../public/assets/landingpage/transaction-fee-desktop.png")}
            mobileImage={require("../../../public/assets/landingpage/transaction-fee-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/sponsored-transactions"
            colSpan={1}
          />
          <LandingCardWithImage
            title="Infrastructure"
            description="Built-in infrastructure so you don't have to worry about RPCs, storage, bundlers or paymasters — or bring your own providers."
            image={require("../../../public/assets/landingpage/infastructure-desktop.png")}
            mobileImage={require("../../../public/assets/landingpage/infastructure-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/rpc-edge"
            direction="horizontal"
          />
          <LandingCardWithImage
            title="Account Abstraction"
            description="A best-in-class SDK, full wallet customizability, and managed infra for ERC-4337."
            image={require("../../../public/assets/landingpage/desktop-account-abstraction.png")}
            mobileImage={require("../../../public/assets/landingpage/mobile-account-abstraction.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/account-abstraction"
            colSpan={1}
          />
        </LandingGridSection>

        <Flex flexDirection="column" alignItems="center">
          <LandingEndCTA
            title="Grow your ecosystem."
            description="The complete SDK to add any smart contract into your app — and call functions for any type of onchain interaction."
            titleWithGradient=""
            trackingCategory={TRACKING_CATEGORY}
            ctaLink="https://portal.thirdweb.com/unity"
            gradient="linear(to-r, #F213A4, #F97CCE)"
            noCta
            noContactUs
            customEndCta={
              <Flex alignItems="center" justifyContent="center">
                <TrackedLinkButton
                  width="full"
                  maxW="244px"
                  colorScheme="primary"
                  category={TRACKING_CATEGORY}
                  label="contact_us_end_cta"
                  href="/contact-us"
                  borderRadius="lg"
                  py={6}
                  px={6}
                  bgColor="white"
                  _hover={{
                    bgColor: "white",
                    opacity: 0.8,
                  }}
                  size="md"
                  color="black"
                >
                  Contact Us
                </TrackedLinkButton>
              </Flex>
            }
          />
        </Flex>
      </Container>
    </LandingLayout>
  );
};

SolutionsChains.pageId = PageId.SolutionsChains;

export default SolutionsChains;
