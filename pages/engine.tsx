import { Box, Container, Flex } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text, TrackedLinkButton } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import {
  LandingCardWithImage,
  LandingImages,
} from "components/landing-pages/card-with-image";
import LandingCardWithImageBackground from "components/landing-pages/card-with-image-background";
import { LandingSectionHeading } from "components/landing-pages/section-heading";

const TRACKING_CATEGORY = "engine-landing";

const trustedCompanies = [
  {
    title: "Coinbase",
    height: 74,
    width: 74,
    src: require("public/assets/partners/coinbase.png"),
  },
  {
    title: "Layer3",
    height: 90,
    width: 90,
    src: require("public/assets/partners/layer3.png"),
  },
  {
    title: "Ava Labs",
    height: 74,
    width: 74,
    src: require("public/assets/partners/ava.png"),
  },
  {
    title: "Treasure",
    height: 74,
    width: 74,
    src: require("public/assets/partners/treasure.png"),
  },
  {
    title: "Ex Populus",
    height: 74,
    width: 74,
    src: require("public/assets/partners/ex.png"),
  },
];

const linkBoxBg = "#131418";

const EngineLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title:
          "The Blockchain API for Production-Grade Web3 Apps | thirdweb Engine",
        description:
          "Connect any app to the blockchain via API — with auth, smart contracts, wallets, gasless transactions, & managed infrastructure. Learn more.",
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
          titleWithGradient=""
          miniTitle="Engine"
          title="All-in-one API for enterprise-grade Web3 apps"
          subtitle="Onboard all of your users with a powerful Connect Wallet modal, flexible sign-in options for web2 & web3, and hooks for full customizability."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/engine"
          ctaText="Get started"
          contactUsTitle="Book a demo"
          gradient="linear(to-r, #BFA3DA, #3385FF)"
          image={require("public/assets/product-pages/engine/desktop-hero.png")}
          mobileImage={require("public/assets/product-pages/engine/desktop-hero.png")}
        />
        <LandingGridSection
          desktopColumns={4}
          title={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom={{ base: "35px", md: "55px" }}
            >
              <Box width="full" maxWidth="800px" textAlign="center">
                <LandingSectionHeading
                  title="Connect your app to web3, without the complexity"
                  blackToWhiteTitle=""
                />
              </Box>
            </Box>
          }
        >
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-1.png")}
            title="Go to market faster"
            description="Save months of development time with solutions that work out-of-the-box and abstract away all of the blockchain complexity for you."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-2.svg")}
            title="Cross-chain EVM support"
            description="Launch your web3 app on any (or many) chains. Don't lock your users into one network — unlock ultimate cross-chain flexibility with support for any EVM."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-7.png")}
            title="Scale to billions"
            description="Nonce, key and fund management handled for you. Scale your app without sacrificing performance or security."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-3.svg")}
            title="Secure and reliable"
            description="Best-in-class security for your users and 99.9% infrastructure uptime."
          />
        </LandingGridSection>

        <LandingImages
          title={
            <LandingSectionHeading
              title="Trusted by the best"
              blackToWhiteTitle=""
            />
          }
          gap="44px"
          images={trustedCompanies}
        />

        <LandingGridSection
          title={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="full"
              marginBottom="38px"
            >
              <Box maxWidth="1000px">
                <LandingSectionHeading
                  title="Solutions for every web3-powered feature in your app"
                  blackToWhiteTitle=""
                />
              </Box>
            </Box>
          }
          desktopColumns={4}
        >
          <LandingCardWithImage
            title="Smart Contracts"
            description="Deploy, read, & write to any smart contract across any EVM-compatible blockchain — and build with thirdweb's audited smart contracts."
            image={require("public/assets/landingpage/smart-contract-audits-desktop.png")}
            mobileImage={require("public/assets/landingpage/smart-contract-audits-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/explore"
          />

          <LandingCardWithImage
            title="Account Abstraction"
            description="Create managed smart wallets with shared custody between the backend wallet & a user's EOA wallet."
            image={require("public/assets/landingpage/account-abstraction-desktop.png")}
            mobileImage={require("public/assets/landingpage/account-abstraction-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/account-abstraction"
            direction="horizontal"
          />

          <LandingCardWithImage
            title="Web3 auth"
            description="Create permissions to enable users' wallets to directly interact with certain endpoints on the thirdweb Engine."
            image={require("public/assets/product-pages/connect/desktop-auth.png")}
            mobileImage={require("public/assets/product-pages/connect/mobile-auth.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/auth"
            colSpan={1}
          />
          <LandingCardWithImage
            title="Wallet Management"
            description="Nonce management to create backend wallets, store keys securely and sign & send transactions at scale. Eliminate stuck transactions and scale your app to millions."
            image={require("public/assets/landingpage/managment-desktop.png")}
            mobileImage={require("public/assets/landingpage/managment-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
          />
          <LandingCardWithImage
            title="Gasless Transactions"
            description="Onboard users in an instant & create seamless web3 UX by sponsoring gas fees — for any & all transactions."
            image={require("public/assets/landingpage/transaction-fee-desktop.png")}
            mobileImage={require("public/assets/landingpage/transaction-fee-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/sponsored-transactions"
            colSpan={1}
          />
        </LandingGridSection>

        <LandingCardWithImageBackground
          image={require("public/assets/landingpage/coinbase-event.png")}
        >
          <Flex flexDir="column" gap="27px" maxWidth="600px">
            <Heading fontSize="xx-large" fontWeight="600" color="white">
              Coinbase Brings Onchain Experiences to the Real World
            </Heading>
            <Text fontSize="medium" fontWeight="400" color="white">
              Scalable, fast, & reliable NFT infrastructure to power web3
              experiences — bringing half of Mainnet 2023 attendees onchain via
              Coinbase Wallet.
            </Text>
            <TrackedLinkButton
              variant="outline"
              isExternal
              bgColor="#FFF"
              color="#000"
              border="none"
              _hover={{
                opacity: 0.9,
              }}
              py={6}
              category={TRACKING_CATEGORY}
              label="coinbase-case-study"
              href="https://blog.thirdweb.com/case-study/coinbase-brings-onchain-experiences-to-life"
              maxW="fit-content"
            >
              See the case study
            </TrackedLinkButton>
          </Flex>
        </LandingCardWithImageBackground>

        <LandingEndCTA
          title="Start building with"
          titleWithGradient="thirdweb Engine."
          trackingCategory={TRACKING_CATEGORY}
          ctaText="Get beta access"
          ctaLink="https://portal.thirdweb.com/engine"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

EngineLanding.pageId = PageId.EngineLanding;

export default EngineLanding;
