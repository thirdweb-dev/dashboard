import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Card } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingGridSection } from "components/landing-pages/grid-section";

const TRACKING_CATEGORY = "connect-wallet-landing";

const ConnectWalletLanding: ThirdwebNextPage = () => {
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
              url: `${getAbsoluteUrl()}/assets/og-image/embedded-wallets.png`,
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
          miniTitle="Connect Wallet"
          title="Web3 onboarding,"
          titleWithGradient="built for the next billion users"
          subtitle="Onboard all of your users to web3 with a beautiful Connect Wallet modal, fully-customizable auth flows, and flexible login options for web2 & web3 — all in a few lines of code."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/connect"
          contactUsTitle="Book Demo"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          image={require("public/assets/product-pages/hero/desktop-hero-connect-wallet.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-connect-wallet.png")}
        />

        <LandingGridSection title={<></>}>
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-1.png")}
            title="A Connect Wallet experience that's truly yours"
            description="Create intuitive onboarding flows for your users with an infinitely-customizable UI component — with your own branding, different button styles, and recommended wallets for your users."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-2.svg")}
            title="Instant onboarding for all"
            description="Easily authenticate & onboard any user with just an email, phone number, social login, or passkeys and automatically generate a wallet for them after they sign up — or empower them to create their first web3 wallet with an easy step-by-step beginner flow."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-7.png")}
            title="Best-in-class DX"
            description="Integrate thirdweb Connect with just a few lines of code — using it out of the box to save development time, or leveraging its composability to integrate it with your providers of choice — with an interactive builder for easy implementation, powerful hooks for fine-grained control, and wallet analytics & user management."
          />
        </LandingGridSection>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="An intuitive onboarding experience"
              description="Add the power of web3 to any app with our Connect Wallet UI component — with cross-platform support (Web, Mobile, Unity) and the smoothest user experience for every type of wallet."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/account-abstraction.png")}
              title="Web2 login flows"
              description="Instantly onboard any user with just an email, phone number, social login, or passkeys — and automatically generate a wallet for them after they sign up."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Cross-chain compatibility"
              description="Build web3 apps on any (or many) chains with native EVM-compatibility — and the smoothest UX with automatic network switching."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Personalized user experience"
              description="The Connect Wallet component automatically detects which wallets a user has installed on their browser, recommending them to select the wallet that they can get started with the most easily."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Reliable connectors"
              description="Use our connectors to integrate 170+ wallet providers into any app — including non-custodial wallets (MetaMask, Coinbase Wallet, Wallet Connect), email wallets, local wallets, & native Safe integration."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Guest mode"
              description="Onboard new users to any dApp in seconds, allowing them to 'Continue as guest' — at the press of a button or through a username-and-password flow — and automatically creating a wallet for them under the hood."
            />
          </Card>
        </SimpleGrid>

        <LandingEndCTA
          title="Start building"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/connect"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

ConnectWalletLanding.pageId = PageId.ConnectWalletLanding;

export default ConnectWalletLanding;
