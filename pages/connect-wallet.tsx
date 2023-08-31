import { Box, Container, Flex } from "@chakra-ui/react";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Card } from "tw-components";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { LandingHero } from "components/landing-pages/hero";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { SimpleConnectWalletWithPreview } from "components/wallets/SimpleConectWalletWithPreview";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";

const GUIDES = [
  {
    title: "Getting Started with Local Wallet",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/05/How-to-use-paper-wallet-with-thirdweb.png",
    link: "https://blog.thirdweb.com/guides/how-to-use-local-wallets/",
  },
  {
    title: "How to Deploy a Smart Wallet (ERC-4337)",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/06/How-to-use-smart-wallet.png",
    link: "https://blog.thirdweb.com/guides/how-to-use-erc4337-smart-wallets/",
  },
  {
    title: "Introducing our React Native SDK for Web3",
    image:
      "https://blog.thirdweb.com/content/images/2023/03/Screenshot-2023-03-31-at-11.54.14-AM.png",
    link: "https://blog.thirdweb.com/changelog/introducing-our-react-native-sdk/",
  },
];

const TRACKING_CATEGORY = "connect-wallet";

const ConnectWalletLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      seo={{
        title: "Connect any wallet",
        description: "Customize and connect any wallet to your app in minutes.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/solutions-pages/wallets/connect/connect_wallet.png`,
              width: 1200,
              height: 630,
              alt: "Connect Wallets",
            },
          ],
        },
      }}
    >
      <LandingHero
        title="Connect any"
        titleWithGradient={"wallet"}
        subtitle="Customize and connect any wallet to your app in minutes"
        trackingCategory={TRACKING_CATEGORY}
        ctaLink="https://portal.thirdweb.com/react/react.connectwallet"
        gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        image={require("public/assets/solutions-pages/wallets/connect/connect_wallet.png")}
        mobileImage={require("public/assets/solutions-pages/wallets/connect/connect_wallet.png")}
      />
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <LandingGridSection
          title={
            <Heading size="label.2xl" color="white">
              Connecting to your app. <br />
              Made easy.
            </Heading>
          }
        >
          <LandingIconSectionItem
            title="Flexible wallet connections"
            description="Delight your users by giving flexibility to connect with any wallet provider. Support for: non-custodial wallets, custodial wallets, MPC wallets, email wallets, smart wallets, and more. Cross-platform support (Web, React, React Native, Unity)."
          />
          <LandingIconSectionItem
            title="Fully customizable"
            description="You can fully customize the look and feel of your Connect Wallet button in thirdweb dashboard, including theme color, modal title, the order of wallet providers in dropdown modal, and more."
          />
          <LandingIconSectionItem
            title="Invisible wallet experience"
            description="Increase successful onboarding rates with a frictionless wallet experience. Enable end users to connect to your app using familiar web2-like logins, including: email, social, and mobile number. No more disruptive transaction pop-ups."
          />
        </LandingGridSection>
        <LandingSectionHeading
          blackToWhiteTitle={"Test Connect Wallet"}
          title={
            <>
              Customize the look and feel
              <br />
              of Connect Wallet
            </>
          }
        />
        <Box>
          <SimpleConnectWalletWithPreview />
        </Box>
        <LandingGridSection
          title={
            <LandingSectionHeading
              title="Connect Wallet."
              blackToWhiteTitle="Features"
            />
          }
        >
          <Card p={8}>
            <LandingIconSectionItem
              title=""
              description="170+ wallet providers supported"
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              title=""
              description="Cross-platform support (Web, React, React Native, Unity)"
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              title=""
              description="Gasless and signless end user wallet experience"
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              title=""
              description="Best-in-class smart wallet support"
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              title=""
              description="Fully customizable Connect Wallet button"
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem title="" description="SIWE support" />
          </Card>
        </LandingGridSection>
        <LandingEndCTA
          title="Get Started with Connect Wallets "
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/react/react.connectwallet"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
        {/* Guides */}
        <GuidesShowcase
          title="Learn how to use Connect Wallet"
          category={TRACKING_CATEGORY}
          description="Check out our guides to learn how to use Connect Wallet with your app."
          solution="Connect Wallet"
          guides={GUIDES}
        />
      </Container>
    </LandingLayout>
  );
};

ConnectWalletLanding.pageId = PageId.ConnectWalletLanding;

export default ConnectWalletLanding;
