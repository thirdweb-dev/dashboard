import { Box, Center, Container, Flex, Icon, Spacer } from "@chakra-ui/react";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingLayout } from "components/landing-pages/layout";
import { MiniPlayground } from "components/wallets/ConnectWalletMiniPlayground/MiniPlayground";
import { SupportedPlatformLink } from "components/wallets/SupportedPlatformLink";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Heading, TrackedLink, Text, TrackedLinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import connectLottie from "../public/assets/product-pages/connect/connect-lottie.json";
import checkoutLottie from "../public/assets/product-pages/checkout/checkout.json";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import { ChakraNextImage } from "components/Image";
import { BsFillLightningChargeFill } from "react-icons/bs";
import LandingCardWithMetrics from "components/landing-pages/card-with-metrics";

const TRACKING_CATEGORY = "connect-wallet-landing";

export const metrics = [
  {
    title: "Zepeto",
    description:
      "A virtual world that empowers creators and communities — powered by thirdweb Connect.",
    image: require("public/assets/product-pages/connect/desktop-ztx.png"),
    mobileImage: require("public/assets/product-pages/connect/desktop-ztx.png"),
    items: [
      {
        title: "13,000",
        description: "Smart wallets generated",
        colSpan: 4,
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/pixels-builds-an-onchain-ecosystem-for-its-web3-game",
    hoverBackground: "#622AFF",
  },
  {
    title: "Torque Motorsport",
    description:
      "Torque Motorsport is a racing game with in-game items as NFTs from Nissan, Subaru, & Mazda.",
    image: require("public/assets/product-pages/connect/desktop-motorsport.png"),
    mobileImage: require("public/assets/product-pages/connect/desktop-motorsport.png"),
    items: [
      {
        title: "330k",
        description: "Players Onboarded",
        colSpan: 4,
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life",
    hoverBackground: "#0053FF",
  },
  {
    title: "Courtyard",
    description:
      "A tokenization and marketplace app for anyone to buy, trade, & own collectibles onchain — with a seamless fiat checkout.",
    image: require("public/assets/landingpage/case-study-courtyard.png"),
    mobileImage: require("public/assets/landingpage/case-study-courtyard.png"),
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
    href: "https://blog.thirdweb.com/case-studies/courtyard-brings-collectors-onchain-with-fiat-payments/",
    hoverBackground: "#0053FF",
  },
];

const ConnectLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Web3 Onboarding, For Everyone | Connect",
        description:
          "Onboard your users to web3 with a beautiful Connect Wallet modal, customizable auth flows, and sign-in for web2 & web3 — in a few lines of code.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/connect-wallet.png`,
              width: 1200,
              height: 630,
              alt: "Web3 Onboarding, For Everyone",
            },
          ],
        },
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "180px" }}
      >
        <LandingHeroWithSideImage
          miniTitle="Connect"
          title="Build web3 apps that anyone can use"
          miniImage={require("public/assets/product-icons/wallet-sdk.png")}
          titleWithGradient="for everyone"
          subtitle="Seamless frontends for your web3 app or game with SDKs in every language. Onboard users with wallets, generate revenue with payments and build gasless apps with Account Abstraction."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/connect/playground"
          contactUsTitle="Book Demo"
          gradient="linear(to-r, #4490FF, #4490FF)"
          lottie={connectLottie}
          image={require("public/assets/product-pages/hero/desktop-hero-connect-wallet.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-connect-wallet.png")}
        />

        <Box>
          <Spacer h={[10, 20]} />
          {/* Title and Description */}
          <Heading fontSize={[30, 40]} color="white" textAlign="center">
            A fully customizable Connect Wallet component
          </Heading>
          <Spacer h={6} />
          <Text fontSize={[16, 20]} textAlign="center" maxW="800px" m="0 auto">
            Create a login experience that{`'s`} tailor-made for your app. Add
            your wallets of choice, enable web2 sign-in options and create a
            modal that fits your brand.
          </Text>

          <Spacer h={8} />

          {/* Supported platforms */}
          <Flex alignItems="center" gap={2} justifyContent={"center"}>
            <Text mr={2} display={["none", "block"]} fontSize={12}>
              Supports
            </Text>
            <SupportedPlatformLink
              trackingCategory={TRACKING_CATEGORY}
              size="sm"
              platform="React"
              href="https://portal.thirdweb.com/react/latest/components/ConnectWallet"
            />
            <SupportedPlatformLink
              trackingCategory={TRACKING_CATEGORY}
              size="sm"
              platform="React Native"
              href="https://portal.thirdweb.com/react-native/latest/components/ConnectWallet"
            />
            <SupportedPlatformLink
              trackingCategory={TRACKING_CATEGORY}
              size="sm"
              platform="Unity"
              href="https://portal.thirdweb.com/unity/wallets/prefab"
            />
          </Flex>

          <Spacer h={12} />

          <MiniPlayground trackingCategory={TRACKING_CATEGORY} />
        </Box>

        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          gap={6}
        >
          <ChakraNextImage
            src={require("public/assets/product-pages/connect/onboarding-icon.png")}
            maxW="109px"
            alt="connect-icon"
          />
          <Heading fontSize={[30, 40]} color="white" textAlign="center">
            Instant onboarding with App Wallets
          </Heading>
          <Spacer h={6} />
          <Text fontSize={[16, 20]} textAlign="center" maxW="800px" m="0 auto">
            Let users access your app instantly using an email address, Google
            account, social logins or any authentication method. Create seamless
            user experiences by sponsoring transactions and offering account
            recovery.
          </Text>

          <Spacer h={8} />
          <LandingDesktopMobileImage
            image={require("public/assets/product-pages/connect/desktop-onboarding.png")}
            mobileImage={require("public/assets/product-pages/connect/mobile-onboarding.png")}
            alt="connect"
            maxW={{ base: "100%", md: "60%" }}
          />

          <TrackedLinkButton
            leftIcon={<Icon as={BsFillLightningChargeFill} boxSize={4} />}
            py={6}
            px={8}
            bgColor="white"
            _hover={{
              bgColor: "white",
              opacity: 0.8,
            }}
            mt={12}
            color="black"
            href="https://portal.thirdweb.com/connect/embedded-wallet/overview"
            category={TRACKING_CATEGORY}
            label="add-to-app"
            fontWeight="bold"
          >
            Add to your app
          </TrackedLinkButton>
        </Flex>

        <Flex flexDir="column" gap={6}>
          <LandingGridSection
            title={
              <Center>
                <Heading
                  size="display.sm"
                  color="white"
                  textAlign="center"
                  maxW="3xl"
                >
                  Everything you need to build great web3 apps.
                </Heading>
              </Center>
            }
            desktopColumns={4}
          >
            <LandingCardWithImage
              title="Authenticate any user"
              description={
                <>
                  Verify a user&apos;s onchain identity with web3-first
                  authentication, using the SIWE (
                  <TrackedLink
                    href="https://eips.ethereum.org/EIPS/eip-4361"
                    category={TRACKING_CATEGORY}
                    label="siwe"
                    color="blue.500"
                    isExternal
                  >
                    Sign-in with Ethereum
                  </TrackedLink>
                  ) standard.
                </>
              }
              image={require("public/assets/product-pages/connect/desktop-authenticate.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-authenticate.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/dashboard/connect/playground"
            />
            <LandingCardWithImage
              title="Reliable connectors"
              description="Integrate 170+ web3 wallets — including self-custodial, email, local, & smart wallets."
              image={require("public/assets/product-pages/connect/desktop-rely.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-rely.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/dashboard/connect/playground"
            />
          </LandingGridSection>
          <LandingGridSection desktopColumns={4}>
            <LandingCardWithImage
              title="Infinite customizability"
              description="Custom components with your branding, different modal styles, and everything else to build your app."
              image={require("public/assets/product-pages/connect/desktop-customizability.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-customizability.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/auth"
            />
            <LandingCardWithImage
              title="In-depth analytics"
              description="Comprehensive insights to understand how users are interacting with your app."
              image={require("public/assets/product-pages/connect/desktop-connection.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-connection.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              direction="horizontal"
              href="/embedded-wallets"
            />
            <LandingCardWithImage
              title="Build on any platform"
              description="Best-in-class SDKs for mobile, web, unity and Unreal."
              image={require("public/assets/product-pages/connect/desktop-pixel.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-pixel.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/references/wallets/v2/LocalWallet"
            />

            <LandingCardWithImage
              title="Scale to millions"
              description="Best-in-class infra available out of the box. RPCs, decentralized storage (IPFS), and Account Abstraction infra (contracts, bundler, and paymaster)."
              image={require("public/assets/product-pages/connect/desktop-scale.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-scale.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/dashboard/connect/playground"
            />
          </LandingGridSection>
        </Flex>

        <LandingHeroWithSideImage
          title="Powerful NFT Checkouts"
          titleWithGradient="and Payment infrastructure."
          subtitle="Sell assets to users with a credit card — all of the onramp, offramp and bridging complexity handled."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/payments"
          gradient="linear(to-r, #4490FF, #4490FF)"
          lottie={checkoutLottie}
          noContactUs
        />

        <LandingCardWithMetrics
          title={
            <Center flexDir="column" textAlign="center">
              <Heading size="display.sm" color="white">
                Trusted by the best
              </Heading>

              <Text size="body.lg" mt={6}>
                thirdweb powers the best web3 projects across verticals
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

ConnectLanding.pageId = PageId.ConnectLanding;

export default ConnectLanding;
