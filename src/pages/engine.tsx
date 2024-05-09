import { Center, Box, Container, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { LandingHero } from "components/landing-pages/hero";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingGridSection } from "components/landing-pages/grid-section";
import LandingImageSectionItem from "components/landing-pages/image-section-item";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import LandingCardWithMetrics from "components/landing-pages/card-with-metrics";
import { LandingGuidesShowcase } from "components/landing-pages/guide-showcase";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { PricingEngine } from "components/homepage/sections/PricingEngine";
import Head from "next/head";
import { engineFrames } from "lib/engine-frames";

const TRACKING_CATEGORY = "engine-landing";

export const metrics = [
  {
    title: "Coinbase Wallet",
    description:
      "Bringing onchain experiences to the real world — with seamless NFT creation, delivery, & transaction management via the Coinbase Wallet app.",
    image: require("../../public/assets/product-pages/engine/casestudy-image-coinbase-wallet.png"),
    mobileImage: require("../../public/assets/product-pages/engine/casestudy-image-coinbase-wallet.png"),
    items: [
      {
        title: "50,000+",
        description: "Smart accounts created",
        colSpan: 4,
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life/",
    hoverBackground: "#622AFF",
  },
  {
    title: "InfiniGods",
    description:
      "Building a free-to-play web3 game universe for everyone — with NFT avatars, tokens, and  that everyone canTorque Motorsport is a racing game with in-game items as NFTs from Nissan, Subaru, & Mazda.",
    image: require("../../public/assets/product-pages/engine/casestudy-image-infinigods.png"),
    mobileImage: require("../../public/assets/product-pages/engine/casestudy-image-infinigods.png"),
    items: [
      {
        title: "330,000+",
        description: "Players Onboarded",
        colSpan: 4,
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/king-of-destiny-launches-avatar-nfts-thirdweb-engine/",
    hoverBackground: "#0053FF",
  },
  {
    title: "Stand With Crypto",
    description:
      "A tokenization and marketplace app for anyone to buy, trade, & own collectibles onchain — with fiat & crypto checkouts.",
    image: require("../../public/assets/landingpage/case-study-courtyard.png"),
    mobileImage: require("../../public/assets/landingpage/case-study-courtyard.png"),
    items: [
      {
        title: "1,000+",
        description: "Real-World Transactions",
      },
      {
        title: "4 Weeks",
        description: "Total Development Time",
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life/",
    hoverBackground: "#0053FF",
  },
];

const GUIDES = [
  {
    title: "The Quick-Start Guide to thirdweb Connect",
    image: require("/public/assets/product-pages/connect/get-started.png"),
    link: "https://portal.thirdweb.com/react/latest/components/ConnectWallet",
  },
  {
    title: "Add a Connect Wallet Button to Your App or Website",
    image: require("/public/assets/product-pages/connect/connect-wallet.png"),
    link: "https://blog.thirdweb.com/guides/add-connectwallet-to-your-website/",
  },
  {
    title: "Create Your Own Custom Connect Wallet Button",
    image: require("/public/assets/product-pages/connect/custom-connect.png"),
    link: "https://blog.thirdweb.com/guides/create-a-custom-connect-wallet-button/",
  },
];

const EngineLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      py={0}
      seo={{
        title: "Engine: Open-Source Server for Scalable Web3 Apps",
        description:
          "A production-grade HTTP server to generate backend wallets on any EVM blockchain—with smart contracts, auth, gasless transactions, & managed infra. Get started.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/engine.png`,
              width: 1200,
              height: 630,
              alt: "thirdweb Engine",
            },
          ],
        },
      }}
    >
      {/* Farcaster frames headers */}
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={engineFrames["1"].imageUrl} />
        <meta
          property="fc:frame:post_url"
          content={`${getAbsoluteUrl()}/api/frame/engine?step=1`}
        />
        <meta property="fc:frame:button:1" content="Features →" />
        <meta property="fc:frame:button:2" content="Start building" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:2:action" content="post_redirect" />
      </Head>

      <Head>
        <style>
          {`
          .slider {
            padding: 12px 0 !important;
          }
          
           .slide:first-child, .slide:nth-child(2) {
            padding-right: 16px !important;
          }

         .slide:nth-child(3) {
            padding-right: 6px !important;
          }

          .slide:nth-child(1) {
            padding-left: 6px !important;
          }
          `}
        </style>
      </Head>

      <Flex
        position="relative"
        flexDir="column"
        width="100%"
        overflow="hidden"
        py={{ base: "120px", md: "80px" }}
      >
        <Container
          zIndex={3}
          position="relative"
          maxW="container.page"
          as={Flex}
          flexDir="column"
          gap={{ base: "80px", md: "180px" }}
        >
          <LandingHeroWithSideImage
            titleWithGradient="web3 apps & games"
            miniTitle="Engine"
            title="Dedicated APIs for"
            subtitle="Scalable smart contract APIs backed by secure wallets, with automatic nonce queuing & gas-optimized retries."
            trackingCategory={TRACKING_CATEGORY}
            ctaLink="/dashboard/engine"
            ctaText="Get started"
            contactUsTitle="Book a demo"
            gradient="linear(to-r, #9786DF, #9786DF)"
            lottie={require("../../public/assets/product-pages/engine/lottie.json")}
            mobileImage={require("../../public/assets/product-pages/engine/mobile-hero.png")}
            miniImage={require("../../public/assets/product-icons/engine.png")}
            contactUsBg="#0E0E0E"
            contactUsHover={{ background: "#0E0E0E" }}
          />
          <LandingHero
            title="Scale your app,"
            titleWithGradient="without the complexity"
            subtitle="Mint tokens and perform onchain actions with robust backend wallets — equipped with automatic nonce management, transaction queueing, and gas-optimized retries."
            trackingCategory={TRACKING_CATEGORY}
            gradient="linear(to-r, #9786DF, #9786DF)"
            lottie={require("../../public/assets/product-pages/engine/lottie2.json")}
            image={require("../../public/assets/product-pages/engine/engine-splash.png")}
            mobileImage={require("../../public/assets/product-pages/engine/engine-splash.png")}
          />
          <LandingGridSection
            desktopColumns={3}
            title={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom={{ base: "35px", md: "55px" }}
              >
                <Box width="full" maxWidth="1000px" textAlign="center">
                  <LandingSectionHeading
                    title="Scale your app without sacrificing performance or security"
                    blackToWhiteTitle=""
                  />
                </Box>
              </Box>
            }
          >
            <LandingImageSectionItem
              image={require("../../public/assets/landingpage/mobile/backend-queue.png")}
              mobileImage={require("../../public/assets/landingpage/mobile/backend-queue.png")}
              title="Backend Wallets"
              description="Sign & send transactions at scale. Eliminate stuck transactions and scale your app with automatic nonce management and gas-optimized transaction retries."
              justifyContent="flex-end"
              pr="0!important"
              pl="36px!important"
              maxHeightImage={{ base: "100%", md: "327px" }}
            />

            <LandingImageSectionItem
              image={require("../../public/assets/landingpage/desktop/web3warriors.png")}
              mobileImage={require("../../public/assets/landingpage/desktop/web3warriors.png")}
              title="Seamless UX"
              description="Create seamless UX by sponsoring gas fees — for any & all transaction, removing gas fees and transaction signing. Powered by Account Abstraction."
            />

            <LandingImageSectionItem
              image={require("../../public/assets/landingpage/desktop/infra.png")}
              mobileImage={require("../../public/assets/landingpage/desktop/infra.png")}
              title="Infrastructure handled"
              description="Focus on building your app with complete web3 infrastructure out-of-the box with RPC, IPFS, and Account Abstraction."
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
                  title="Solutions for every web3-powered feature"
                  blackToWhiteTitle=""
                />
              </Box>
            }
            desktopColumns={4}
          >
            <LandingCardWithImage
              title="Wallet Management"
              description="Create backend wallets you can programatically use with automatic nonce and gas management. Eliminate gas spikes, stuck transactions and network instability."
              image={require("../../public/assets/landingpage/account-abstraction-desktop.png")}
              mobileImage={require("../../public/assets/landingpage/account-abstraction-mobile.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/wallet-sdk/latest"
              direction="horizontal"
            />
            <LandingCardWithImage
              title="Smart Contracts"
              description="Deploy, read, & write to any smart contract across any EVM-compatible blockchain — and build with thirdweb's audited smart contracts."
              image={require("../../public/assets/landingpage/smart-contract-audits-desktop.png")}
              mobileImage={require("../../public/assets/landingpage/smart-contract-audits-mobile.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/contracts"
              colSpan={2}
            />

            <LandingCardWithImage
              title="Web3 Auth"
              description="Create permissions to enable users' wallets to directly interact with certain endpoints on the thirdweb Engine."
              image={require("../../public/assets/product-pages/connect/desktop-auth.png")}
              mobileImage={require("../../public/assets/product-pages/connect/mobile-auth.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/auth"
              colSpan={1}
            />
            <LandingCardWithImage
              title="Account Abstraction"
              description="Deploy and manage smart wallets, use session keys for access controls, and transact on behalf of your users."
              image={require("../../public/assets/landingpage/account-desktop.png")}
              mobileImage={require("../../public/assets/landingpage/account-mobile.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/account-abstraction"
              direction="horizontal"
            />
            <LandingCardWithImage
              title="Gasless Transactions"
              description="Sponsor user transactions with gasless relayers and user operations."
              image={require("../../public/assets/landingpage/transaction-fee-desktop.png")}
              mobileImage={require("../../public/assets/landingpage/transaction-fee-mobile.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/sponsored-transactions"
              colSpan={1}
            />
            <LandingCardWithImage
              title="High transaction throughput"
              description="Blockchain transactions are processed in parallel with nonce management, and stuck transactions are automatically retried."
              image={require("../../public/assets/landingpage/desktop/happy-people.png")}
              mobileImage={require("../../public/assets/landingpage/mobile/happy-people.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/engine/features/backend-wallets"
            />
            <LandingCardWithImage
              title="Any EVM chain"
              description="Engine supports contract calls on all 1000+ EVM blockchains and private subnets."
              image={require("../../public/assets/landingpage/desktop/any-evm.png")}
              mobileImage={require("../../public/assets/landingpage/mobile/any-evm.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/engine"
            />
            <LandingCardWithImage
              title="Wallet and contract webhooks"
              description="Create automatic workflows triggered by wallet and contract events."
              image={require("../../public/assets/landingpage/desktop/webhooks.png")}
              mobileImage={require("../../public/assets/landingpage/mobile/webhooks.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/engine/features/webhooks"
              colSpan={1}
            />
            <LandingCardWithImage
              title="Advanced analytics"
              description="View transaction history trends, event logs for each transaction, a ledger of backend wallet funds, and more. (Coming soon)"
              image={require("../../public/assets/landingpage/desktop/analytics-v3.png")}
              mobileImage={require("../../public/assets/landingpage/mobile/analytics-v3.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/engine"
              direction="horizontal"
              colSpan={2}
            />
            <LandingCardWithImage
              title="Gasless Transactions"
              description="Sponsor user transactions with gasless relayers and user operations."
              image={require("../../public/assets/landingpage/desktop/gasless.png")}
              mobileImage={require("../../public/assets/landingpage/mobile/gasless.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/engine/features/gasless-transactions"
              colSpan={1}
            />
            <LandingCardWithImage
              title="Infrastructure"
              description="Built-in infrastructure so you don't have to worry about RPCs, storage, bundlers or paymasters."
              image={require("../../public/assets/landingpage/infastructure-desktop.png")}
              mobileImage={require("../../public/assets/landingpage/infastructure-mobile.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/rpc-edge"
              direction="horizontal"
            />
            <LandingCardWithImage
              title="Self-hosted or Managed"
              description="Set up on your own server for free with minimal configuration or use our managed service."
              image={require("../../public/assets/landingpage/selfhost.png")}
              mobileImage={require("../../public/assets/landingpage/selfhost.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/dashboard/engine"
            />
          </LandingGridSection>

          <PricingEngine trackingCategory={TRACKING_CATEGORY} onHomepage />

          <LandingCardWithMetrics
            title={
              <Center flexDir="column" textAlign="center">
                <Heading size="display.sm" color="white">
                  Trusted by the best
                </Heading>

                <Text fontSize={[16, 20]} mt={6}>
                  thirdweb Engine powers the best onchain apps, integrating into
                  any backend at scale.
                </Text>
              </Center>
            }
            desktopColumns={3}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            metrics={metrics}
          />
          <LandingGuidesShowcase
            title="Get started with thirdweb Engine"
            category={TRACKING_CATEGORY}
            description="See our quick-start guides to add powerful web3 infrastructure into your app, at scale."
            solution="Engine"
            guides={GUIDES}
          />
          <LandingEndCTA
            title="Start building with"
            titleWithGradient="thirdweb Engine."
            trackingCategory={TRACKING_CATEGORY}
            ctaText="Get started"
            ctaLink="/dashboard/engine"
            contactUsTitle="Book a demo"
            gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          />
        </Container>
      </Flex>
    </LandingLayout>
  );
};

EngineLanding.pageId = PageId.EngineLanding;

export default EngineLanding;
