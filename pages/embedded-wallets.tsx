import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import { LandingDynamicSelector } from "components/landing-pages/dynamic-selector";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingGuidesShowcase } from "components/landing-pages/guide-showcase";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Card } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "embedded-wallets-landing";

const GUIDES = [
  {
    title: "Get Started with Embedded Wallets",
    image: require("/public/assets/product-pages/embedded-wallets/embedded-wallet.png"),
    link: "https://docs.withpaper.com/reference/embedded-wallet-service-overview",
  },
  {
    title: "How to Implement Email Wallets",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/05/How-to-Add-Paper-Wallet-to-your-Connect-Wallet-Button.png",
    link: "https://blog.thirdweb.com/guides/how-to-use-paper-wallet/",
  },
  {
    title: "How to Implement Smart Wallets",
    image: require("/public/assets/product-pages/smart-wallet/get-started.png"),
    link: "https://portal.thirdweb.com/smart-wallet/getting%20started",
  },
];

const EmbeddedWalletsLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Embedded Wallets: Onboard Everyone to your App",
        description:
          "Onboard anyone with an email or Google account—with 1-click login flows, flexible auth options, & secure account recovery. Learn more.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/embedded-wallets.png`,
              width: 1200,
              height: 630,
              alt: "Embedded Wallets: Onboard Everyone to your App",
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
          miniTitle="Embedded Wallets"
          title="The power of web3, "
          titleWithGradient="with web2 UX"
          subtitle="Onboard anyone with an email or Google account — with 1-click login flows, flexible auth options, and secure account recovery. Free up to 10k users."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/embedded"
          contactUsTitle="Book Demo"
          gradient="linear(to-r, #3385FF, #7BB0FF)"
          image={require("public/assets/product-pages/hero/desktop-hero-embedded-wallets.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-embedded-wallets.png")}
        />

        <LandingDynamicSelector
          gradient="linear(to-r, #4490FF, #4490FF)"
          title="Flexible flows so you can onboard your way"
          blackToWhiteTitle=""
          TRACKING_CATEGORY={TRACKING_CATEGORY}
          items={[
            {
              title: "Seamless onboarding with managed auth",
              description:
                "Let users access your app instantly with email, google, and social logins.",
              Component: (
                <ChakraNextImage
                  src={require("/public/assets/product-pages/embedded-wallets/seamless.png")}
                  alt=""
                  borderRadius="lg"
                />
              ),
            },
            {
              title:
                "Let users access your app instantly with email, google, and social logins.",
              description:
                "Spin up embedded wallets with the authentication system from your app or game.",
              Component: (
                <ChakraNextImage
                  src={require("/public/assets/product-pages/embedded-wallets/auth.png")}
                  alt=""
                  borderRadius="lg"
                />
              ),
            },
            {
              title: "Cross-platform support",
              description:
                "Let users access the same account across different devices with one-click. Support for web, mobile and unity.",
              Component: (
                <ChakraNextImage
                  src={require("/public/assets/product-pages/embedded-wallets/cross-platform.png")}
                  alt=""
                  borderRadius="lg"
                />
              ),
            },
          ]}
        />

        <LandingGridSection desktopColumns={4}>
          <LandingCardWithImage
            title="Onboard anyone, instantly"
            description="One-click login with a Google account, two-step verification with email, and custom auth integration for your existing users."
            image={require("public/assets/landingpage/desktop/onboard.png")}
            mobileImage={require("public/assets/landingpage/mobile/onboard.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            direction="horizontal"
          />

          <LandingCardWithImage
            title="Cross-platform support"
            description="Users can log into their accounts (and access their wallets) from any device, in one click. Support for web, mobile, & Unity."
            image={require("public/assets/landingpage/desktop/cross-platform.png")}
            mobileImage={require("public/assets/landingpage/mobile/cross-platform.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
          />

          <LandingCardWithImage
            title="Enterprise-grade wallet security"
            description="Self-custodial wallets with flexible & secure account recovery — powered by MPC."
            image={require("public/assets/landingpage/desktop/enterprise-security.png")}
            mobileImage={require("public/assets/landingpage/mobile/enterprise-security.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            colSpan={1}
          />

          <LandingCardWithImage
            title="User experiences that feel like magic"
            description="Seamless integration with Account Abstraction (ERC-4337) for gas-free, signless onboarding & user experiences."
            image={require("public/assets/landingpage/desktop/magic.png")}
            mobileImage={require("public/assets/landingpage/mobile/magic.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
          />

          <LandingCardWithImage
            title="Guest mode"
            description="Allow anyone to use your app in seconds — with a wallet that's generated automatically when they press Continue as guest."
            image={require("public/assets/landingpage/desktop/guest.png")}
            mobileImage={require("public/assets/landingpage/mobile/guest.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            colSpan={1}
          />

          <LandingCardWithImage
            title="Bring your own auth"
            description="Integrate your authentication system and spin up embedded wallets for your users — new and existing."
            image={require("public/assets/landingpage/desktop/auth.png")}
            mobileImage={require("public/assets/landingpage/mobile/auth.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
          />

          <LandingCardWithImage
            title="Everything a wallet needs"
            description="Give users the ability to send, receive, & view assets. Transaction history, ENS support, & more out of the box."
            image={require("public/assets/landingpage/desktop/wallet.png")}
            mobileImage={require("public/assets/landingpage/mobile/wallet.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            direction="horizontal"
          />

          <LandingCardWithImage
            title="Powerful hooks"
            description="Flexible hooks, functions, and low-level tools for fully custom Embedded Wallet experiences."
            image={require("public/assets/landingpage/desktop/powerful.png")}
            mobileImage={require("public/assets/landingpage/mobile/powerful.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            colSpan={1}
          />

          <LandingCardWithImage
            title="Sign-in with Ethereum"
            description="Verify a user's onchain identity with web3-first authentication, using the SIWE (Sign-in with Ethereum) standard."
            image={require("public/assets/landingpage/desktop/siwe.png")}
            mobileImage={require("public/assets/landingpage/mobile/siwe.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            direction="horizontal"
          />

          <LandingCardWithImage
            title="Wallet analytics"
            description="Comprehensive wallet insights to understand how users are interacting with your app."
            image={require("public/assets/landingpage/desktop/analytics.png")}
            mobileImage={require("public/assets/landingpage/mobile/analytics.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            colSpan={1}
          />
        </LandingGridSection>

        <LandingGuidesShowcase
          title="Get started with Embedded Wallets"
          category={TRACKING_CATEGORY}
          description="See our quick-start guides to implement embedded wallets & onboard anyone"
          guides={GUIDES}
        />

        <LandingEndCTA
          title="Integrate in"
          titleWithGradient="a few lines of code."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/embedded"
          gradient="linear(to-r, #3385FF, #7BB0FF)"
        />
      </Container>
    </LandingLayout>
  );
};

EmbeddedWalletsLanding.pageId = PageId.EmbeddedWalletsLanding;

export default EmbeddedWalletsLanding;
