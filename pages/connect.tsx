import { Box, Center, Container, Flex, Spacer } from "@chakra-ui/react";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { MiniPlayground } from "components/wallets/ConnectWalletMiniPlayground/MiniPlayground";
import { SupportedPlatformLink } from "components/wallets/SupportedPlatformLink";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Card, Heading, TrackedLink, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "connect-wallet-landing";

const ConnectLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Web3 Onboarding, Built for the Next Billion Users",
        description:
          "Onboard your users to web3 with a beautiful Connect Wallet modal, customizable auth flows, and sign-in for web2 & web3 — in a few lines of code.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/thirdweb-connect.png`,
              width: 1200,
              height: 630,
              alt: "Web3 Onboarding, Built for the Next Billion Users",
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
          miniTitle="Connect"
          title="Web3 onboarding,"
          titleWithGradient="built for the next billion users"
          subtitle="Onboard all of your users with a beautiful Connect Wallet modal, flexible sign-in options for web2 & web3, and powerful hooks for full customizability."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/connect"
          contactUsTitle="Book Demo"
          gradient="linear(to-r, #3385FF, #7BB0FF)"
          image={require("public/assets/product-pages/hero/desktop-hero-connect-wallet.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-connect-wallet.png")}
        />

        <Box>
          <Spacer h={20} />
          {/* Title and Description */}
          <Heading fontSize={40} color="white" textAlign="center">
            A fully customizable Connect Wallet component
          </Heading>
          <Spacer h={6} />
          <Text fontSize={20} textAlign="center" maxW="800px" m="0 auto">
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
              size="sm"
              platform="React"
              href="https://portal.thirdweb.com/react/react.connectwallet"
            />
            <SupportedPlatformLink
              size="sm"
              platform="React Native"
              href="https://portal.thirdweb.com/react-native/react-native.connectwallet"
            />
            <SupportedPlatformLink
              size="sm"
              platform="Unity"
              href="https://portal.thirdweb.com/unity/connectwallet"
            />
          </Flex>

          <Spacer h={12} />

          <MiniPlayground />
        </Box>

        <Flex flexDir="column" gap={6}>
          <LandingGridSection
            title={
              <Center>
                <Heading size="display.sm" color="white">
                  Every way to connect a wallet
                </Heading>
              </Center>
            }
            desktopColumns={4}
          >
            <LandingCardWithImage
              title="Web3 onboarding, for everyone"
              description="Sign-in options for the most popular web3 wallets, and familiar web2 login flows."
              image={require("public/assets/product-pages/connect/desktop-onboarding-everyone.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-onboarding-everyone.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/dashboard/wallets/connect"
            />
            <LandingCardWithImage
              title="Infinite customizability"
              description="A Connect Wallet UI component with your branding, different modal styles, and everything else to make it yours."
              image={require("public/assets/product-pages/connect/desktop-customizability.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-customizability.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/dashboard/wallets/connect"
            />
          </LandingGridSection>
          <LandingGridSection desktopColumns={4}>
            <LandingCardWithImage
              title="Built-in auth"
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
              image={require("public/assets/product-pages/connect/desktop-auth.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-auth.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/auth"
              colSpan={1}
            />
            <LandingCardWithImage
              title="No wallet? No problem"
              description="Onboard users with just an email, phone, social account, or passkeys — and create wallets for them."
              image={require("public/assets/product-pages/connect/desktop-no-wallet.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-no-wallet.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/embedded-wallets"
            />
            <LandingCardWithImage
              title="Guest mode"
              description="Allow anyone to use your app in seconds — with a wallet that's generated automatically when they press Continue as guest."
              image={require("public/assets/product-pages/connect/desktop-guest.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-guest.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/wallet/local-wallet"
              colSpan={1}
            />
          </LandingGridSection>
          <LandingGridSection desktopColumns={4}>
            <LandingCardWithImage
              title="Reliable connectors"
              description="Integrate 170+ web3 wallets — including self-custodial, email, local, & smart wallets."
              image={require("public/assets/product-pages/connect/desktop-reliable-connectors.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-reliable-connectors.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/wallet"
            />
            <LandingCardWithImage
              title="Everything a wallet needs"
              description="Functions to send, receive, & view assets. ENS support, transaction history, & more."
              image={require("public/assets/product-pages/connect/desktop-everything-wallet-needs.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-everything-wallet-needs.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/wallet"
              direction="horizontal"
            />
          </LandingGridSection>
          <LandingGridSection desktopColumns={4}>
            <LandingCardWithImage
              title="Powerful hooks"
              description="Flexible hooks, functions, and low-level tools for fully custom Connect Wallet experiences."
              image={require("public/assets/product-pages/connect/desktop-hooks.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-hooks.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/wallet-sdk"
              colSpan={1}
            />
            <LandingCardWithImage
              title="Account abstraction, made simple"
              description="First-class support for account abstraction — with native smart wallet experiences that anyone can use."
              image={require("public/assets/product-pages/connect/desktop-account-abstraction.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-account-abstraction.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/smart-wallet"
            />
            <LandingCardWithImage
              title="Wallet analytics"
              description="Comprehensive wallet insights to understand how users are interacting with your app."
              image={require("public/assets/product-pages/connect/desktop-analytics.png")}
              mobileImage={require("public/assets/product-pages/connect/mobile-analytics.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="/dashboard/wallets/connect"
              colSpan={1}
            />
          </LandingGridSection>
        </Flex>

        <LandingGridSection>
          <LandingIconSectionItem
            icon={require("public/assets/product-pages-icons/wallets/icon-custom.svg")}
            title="Your Connect Wallet experience"
            description="Build custom onboarding flows with a powerful UI component — with web3 & web2 login options, personalized branding & themes, and everything you need to tailor it to your app."
          />
          <LandingIconSectionItem
            icon={require("public/assets/product-pages-icons/wallets/icon-email-signin.svg")}
            title="Instant onboarding for all"
            description="Onboard users with just an email, phone, or social account. Generate wallets for your users under the hood, or empower them to create their first self-custodial wallet."
          />
          <LandingIconSectionItem
            icon={require("public/assets/product-pages-icons/wallets/icon-simple-click.svg")}
            title="Best-in-class DX"
            description="Integrate with just a few lines of code — with an interactive builder, powerful hooks for full customization, and onchain analytics."
          />
        </LandingGridSection>
        <LandingGridSection>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/wallets/icon-custom.svg")}
              title="An intuitive onboarding experience"
              description="Add the power of web3 to any app with our Connect Wallet UI component — with cross-platform support (Web, Mobile, Unity) and the smoothest user experience for every type of wallet."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/wallets/icon-email-signin.svg")}
              title="Web2 login flows"
              description="Instantly onboard any user with just an email, phone number, social login, or passkeys — and automatically generate a wallet for them after they sign up."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/wallets/icon-evm.svg")}
              title="Cross-chain compatibility"
              description="Build web3 apps on any (or many) chains with native EVM-compatibility — and the smoothest UX with automatic network switching."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/wallets/icon-personalize.svg")}
              title="Personalized user experience"
              description="The Connect Wallet component automatically detects which wallets a user has installed on their browser, recommending them to select the wallet that they can get started with the most easily."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/wallets/icon-secure.svg")}
              title="Reliable connectors"
              description="Use our connectors to integrate 170+ wallet providers into any app — including non-custodial wallets (MetaMask, Coinbase Wallet, Wallet Connect), email wallets, local wallets, & native Safe integration."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/wallets/icon-guest.svg")}
              title="Guest mode"
              description="Onboard new users to any dApp in seconds, allowing them to 'Continue as guest' — at the press of a button or through a username-and-password flow — and automatically creating a wallet for them under the hood."
            />
          </Card>
        </LandingGridSection>

        <LandingEndCTA
          title="Integrate in"
          titleWithGradient="a few lines of code."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/connect"
          gradient="linear(to-r, #3385FF, #7BB0FF)"
        />
      </Container>
    </LandingLayout>
  );
};

ConnectLanding.pageId = PageId.ConnectLanding;

export default ConnectLanding;
