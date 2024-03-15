import { Center, Container, Flex, Icon } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import LandingCaseStudyStaticSection from "components/contracts/LandingCaseStudyStaticSection";
import Stats from "components/contracts/Stats";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import LandingCardWithMetrics from "components/landing-pages/card-with-metrics";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Heading, Text, TrackedLinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "contracts";

const caseStudies = [
  {
    title: "Build an NFT drop",
    description:
      "Build a drop where users can claim NFTs. Determine who and when can claim the drop and configure advanced features such as delayed reveal.",
    image: require("public/assets/contracts/build-nft-drop.png"),
  },
  {
    title: "Build a marketplace",
    description:
      "Build an NFT marketplace where users can buy, sell or trade digital assets with crypto or fiat currency.",
    image: require("public/assets/contracts/build-marketplace.png"),
  },
  {
    title: "Build a token airdrop",
    description: "Let users claim an allocation of ERC20 tokens.",
    image: require("public/assets/contracts/build-token-airdrop.png"),
  },
  {
    title: "Build a loyalty program with evolving NFTs",
    description:
      "Give your loyal customers an NFT that evolves based on other asset holdings in user's wallet. Create an NFT that dynamically updates through different membership tiers.",
    image: require("public/assets/contracts/build-loyalty-program.png"),
  },
];

export const metrics = [
  {
    title: "Base Launches its First Builder Quest & Brings New Developers Onchain",
    description: "[Placeholder]",
    image: require("public/assets/landingpage/case-study-coinbase.png"),
    mobileImage: require("public/assets/landingpage/case-study-coinbase.png"),
    items: [
      {
        title: "$3.7M+",
        description: "GMV",
      },
      {
        title: "215K+",
        description: "Users",
        colSpan: 2,
      },
      {
        title: "79K+",
        description: "Transactions",
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/base-builder-quest-brings-developers-onchain/",
    hoverBackground: "#0053FF",
  },
  {
    title: "Pixels Builds an Onchain Ecosystem for its Open-World Web3 Game",
    description: "[Placeholder]",
    image: require("public/assets/landingpage/pixels.png"),
    mobileImage: require("public/assets/landingpage/mobile-pixels.png"),
    items: [
      {
        title: "100k+",
        description: "Daily Users",
      },
      {
        title: "1.5M+",
        description: "Monthly Transactions",
        colSpan: 2,
      },
      {
        title: "11k+",
        description: "VIP Members",
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/pixels-builds-an-onchain-ecosystem-for-its-web3-game",
    hoverBackground: "#622AFF",
  },
  {
    title: "Layer3 Powers Web3 Adoption through Gamified Experiences & NFT Rewards",
    description: "[Placeholder]",
    image: require("public/assets/landingpage/case-study-layer3.png"),
    mobileImage: require("public/assets/landingpage/case-study-layer3.png"),
    items: [
      {
        title: "$3.7M+",
        description: "GMV",
      },
      {
        title: "215K+",
        description: "Users",
        colSpan: 2,
      },
      {
        title: "79K+",
        description: "Transactions",
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/layer3-powers-web3-adoption-through-gamified-experiences-nft-rewards/",
    hoverBackground: "#8A5406",
  },
];

const Contracts: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
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
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <LandingHeroWithSideImage
          titleWithGradient="on any EVM chain"
          miniTitle="Contracts"
          title="Deploy smart contracts"
          subtitle="Everything you need to build, deploy, and integrate smart contracts into your app. Browse the largest smart contract library and deploy to any EVM chain."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/thirdweb.eth/LoyaltyCard"
          ctaText="Get started"
          contactUsTitle="Book a demo"
          gradient="linear(to-r, #9786DF, #9786DF)"
          image={require("public/assets/product-pages/contracts/desktop-hero.png")}
          mobileImage={require("public/assets/product-pages/contracts/mobile-hero.png")}
          miniImage={require("public/assets/product-icons/engine.png")}
        />

        <Stats
          stats={[
            { title: "2M+", description: "smart contracts deployed" },
            { title: "1M+", description: "monthly transactions" },
            { title: "1,000+", description: "EVM chains" },
          ]}
        />

        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          gap="27px"
        >
          <Heading fontSize={[30, 40]} color="white" textAlign="center">
            Any smart contract, on any EVM chain
          </Heading>

          <Text fontSize={[16, 20]} textAlign="center" maxW="720px">
            Explore and extend our library of audited, modular smart contracts
            and deploy to any EVM chain in seconds.
          </Text>

          <ChakraNextImage
            src={require("public/assets/contracts/mobile-any-smart-contract.png")}
            display={{ base: "flex", md: "none" }}
            mt="32px"
            alt=""
          />

          <Flex
            flexDir="column"
            alignItems="center"
            position="relative"
            gap="68px"
            mt="48px"
            display={{ base: "none", md: "flex" }}
          >
            <ChakraNextImage
              src={require("public/assets/contracts/black-gradient-right.png")}
              position="absolute"
              zIndex={2}
              top={0}
              right="-80px"
              bottom={0}
              height="100%"
              maxWidth="fit-content"
              alt=""
            />

            <ChakraNextImage
              src={require("public/assets/contracts/black-gradient-left.png")}
              position="absolute"
              zIndex={2}
              top={0}
              left="-80px"
              bottom={0}
              height="100%"
              maxWidth="fit-content"
              alt=""
            />

            <ChakraNextImage
              src={require("public/assets/contracts/contracts-scroll.png")}
              alt=""
            />

            <ChakraNextImage
              src={require("public/assets/contracts/icons-scroll.png")}
              alt=""
            />
          </Flex>
        </Flex>

        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          gap="27px"
        >
          <Heading fontSize={[30, 40]} color="white" textAlign="center">
            Complete Solidity SDK for your build
          </Heading>

          <Text fontSize={[16, 20]} textAlign="center" maxW="720px">
            Complete Solidity SDK with the tools you need to build custom smart
            contracts, with a set of pre-built base contracts and extensions.
          </Text>

          <LandingDesktopMobileImage
            image={require("public/assets/contracts/complete-solidity.png")}
            mobileImage={require("public/assets/contracts/mobile-complete-solidity.png")}
            mt="50px"
          />

          <TrackedLinkButton
            leftIcon={<Icon as={BsFillLightningChargeFill} boxSize={4} />}
            py={6}
            px={8}
            position="relative"
            zIndex={4}
            bgColor="white"
            _hover={{
              bgColor: "white",
              opacity: 0.8,
            }}
            mt={{ base: 8, md: 12 }}
            color="black"
            href="https://portal.thirdweb.com/contracts/interact/overview"
            category={TRACKING_CATEGORY}
            label="publish-your-contract-cta"
            fontWeight="bold"
          >
            CTA
          </TrackedLinkButton>
        </Flex>

        <LandingGridSection desktopColumns={4}>
          <LandingCardWithImage
            title="Integrate contracts into your app"
            description="The complete toolkit to add any smart contract into your app — and call functions for any type of onchain interaction."
            image={require("public/assets/contracts/integrate-contracts.png")}
            mobileImage={require("public/assets/contracts/mobile-integrate-contracts.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/contracts"
          />
          <LandingCardWithImage
            title="Contracts for every use case"
            description="Browse contracts from the world's leading web3 developers — for NFTs, marketplaces, smart accounts, staking, & more."
            image={require("public/assets/contracts/discover-idea.png")}
            mobileImage={require("public/assets/contracts/mobile-discover-idea.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/explore"
          />
          <LandingCardWithImage
            title="Ship onchain faster"
            description="Reduce development time with pre-built contracts — or use our SDK to build custom contracts with advanced features."
            image={require("public/assets/contracts/ship-faster.png")}
            mobileImage={require("public/assets/contracts/mobile-ship-faster.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/contracts"
            colSpan={1}
          />

          <LandingCardWithImage
            title="Deploy with peace of mind"
            description="Deploy securely from our dashboard: No need to share private keys, copy-paste ABIs, or deal with insecure & unfunded private keys required with local deploys."
            image={require("public/assets/contracts/full-chargeback-protection.png")}
            mobileImage={require("public/assets/contracts/mobile-full-chargeback-protection.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/dashboard/contracts/deploy"
            colSpan={2}
          />
          <LandingCardWithImage
            title="Onchain insights"
            description="Get onchain data & understand activity on your smart contracts with an easy-to-use analytics dashboard."
            image={require("public/assets/contracts/onchain-insights.png")}
            mobileImage={require("public/assets/contracts/mobile-onchain-insights.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/dashboard/contracts/deploy"
            colSpan={1}
          />
        </LandingGridSection>

        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          gap="27px"
        >
          <Heading fontSize={[30, 40]} color="white" textAlign="center">
            Smart contracts for every web3 use case
          </Heading>

          <LandingCaseStudyStaticSection studies={caseStudies} />
        </Flex>

        <LandingCardWithMetrics
          title={
            <Center flexDir="column" textAlign="center">
              <Heading size="display.sm" color="white">
                Trusted by the best
              </Heading>

              <Text fontSize={[16, 20]} mt={6}>
                Powering web3 apps across verticals — from onchain games to
                creator platforms.
              </Text>
            </Center>
          }
          desktopColumns={3}
          TRACKING_CATEGORY={TRACKING_CATEGORY}
          metrics={metrics}
        />
      </Container>
    </LandingLayout>
  );
};

Contracts.pageId = PageId.ContractsLanding;

export default Contracts;
