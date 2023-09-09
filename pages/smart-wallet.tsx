import { Box, Container, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingDynamicSelector } from "components/landing-pages/dynamic-selector";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingShowcaseImage } from "components/landing-pages/showcase-image";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";

const TRACKING_CATEGORY = "smart-wallet-landing";

const SmartWallet: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Web3 Loyalty Program: Engage, Reward, & Delight Customers",
        description:
          "Build brand loyalty programs that turn customers into champions — with digital collectibles, tradable points, & more. Try thirdweb, it's free.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/loyalty-solutions.png`,
              width: 1200,
              height: 630,
              alt: "Web3 Loyalty Programs",
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
          miniTitle="Powered by Account Abstraction (ERC-4337)"
          title="Transform UX with"
          titleWithGradient="Account Abstraction"
          subtitle="Transform your app’s user experience with signless transactions, multi-signature security, account recovery, and more."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://thirdweb.com/dashboard/wallets/smart-wallet"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          image={require("public/assets/product-pages/smart-wallet/desktop-hero.png")}
          mobileImage={require("public/assets/product-pages/smart-wallet/mobile-hero.png")}
        />
        <LandingDynamicSelector
          title="What can build with Smart Wallets?"
          blackToWhiteTitle="Use-Cases"
          items={[
            {
              title: "Invisible Wallet Experience",
              description:
                "Enable signless transactions, set spend limits, & cover users fees with gasless for the smoothest app UX.",
              Component: (
                <ChakraNextImage
                  src={require("/public/assets/product-pages/smart-wallet/invisible-wallet.png")}
                  alt=""
                  borderRadius="lg"
                />
              ),
            },
            {
              title: "Pair with any Wallet",
              description:
                "Use any wallet as the signer. Build a custom experience for your app using Email, Social or Web3 Wallet sign-in.",
              Component: (
                <ChakraNextImage
                  src={require("/public/assets/product-pages/smart-wallet/pair-any-wallet.png")}
                  alt=""
                  borderRadius="lg"
                />
              ),
            },
            {
              title: "Fully Programmable",
              description:
                "Batch transactions together, create multi-sig wallets and build wallet recovery flows for non-technical users.",
              Component: (
                <ChakraNextImage
                  src={require("/public/assets/product-pages/smart-wallet/fully-programmable.png")}
                  alt=""
                  borderRadius="lg"
                />
              ),
            },
          ]}
        />
        <Flex flexDir="column" gap={6} alignItems="center">
          <Heading
            as="h1"
            size="display.md"
            textAlign="center"
            px={{ base: 2, md: 0 }}
          >
            An all-in-one platform for{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
              bgClip="text"
            >
              Account Abstraction
            </Box>
          </Heading>
          <Text
            textAlign="center"
            size="body.xl"
            w={{ base: "100%", md: "60%" }}
          >
            Implement smart wallets into any web3 app — with a best-in-class
            SDK, full wallet customizability, and managed infrastructure.
          </Text>
        </Flex>
        <LandingShowcaseImage
          miniTitle="Smart Contracts"
          titleWithGradient="Easy Smart Wallet"
          title="Factory Deployment."
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          description="Pre-built, audited, & customizable smart contracts with extensions for advanced functionality. Compatible with ERC-4337 & deployable to any EVM network."
          image={require("public/assets/product-pages/smart-wallet/smart-contracts.png")}
        />
        <LandingShowcaseImage
          miniTitle="Account Abstraction SDK"
          titleWithGradient="Integrate smart wallets"
          title="into your web3 apps."
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          description="Everything you need to build apps powered by account abstraction — with contracts, UI components, infrastructure, & more."
          image={require("public/assets/product-pages/smart-wallet/account-abstraction.png")}
          imagePosition="left"
        />
        <LandingShowcaseImage
          miniTitle="UI Components"
          titleWithGradient="Let users connect"
          title="to your app."
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          description="Drag-and-drop components that let users connect their smart wallets to your app, easily."
          image={require("public/assets/product-pages/smart-wallet/ui-components.png")}
        />
        <LandingShowcaseImage
          miniTitle="Managed Infrastructure"
          titleWithGradient="Support millions"
          title="of users"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          description="Infrastructure that scales as you grow — with full bundler & paymaster support, out of the box."
          image={require("public/assets/product-pages/smart-wallet/managed-infrastructure.png")}
          imagePosition="left"
        />
        <LandingShowcaseImage
          miniTitle="Dashboard & Analytics "
          titleWithGradient="Manage Smart Wallets"
          title="and view onchain analytics."
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          description="Manage smart wallet deployments & view analytics of your app's usage."
          image={require("public/assets/product-pages/smart-wallet/dashboard.png")}
        />

        <LandingEndCTA
          title="Easily implement smart wallets"
          titleWithGradient="for your web3 app."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/smart-wallet"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

SmartWallet.pageId = PageId.SmartWalletLanding;

export default SmartWallet;
