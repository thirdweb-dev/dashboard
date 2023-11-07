import { Box, Center, Container, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import LandingCardWithImageBackground from "components/landing-pages/card-with-image-background";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHero } from "components/landing-pages/hero";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingOptionSelector } from "components/landing-pages/option-selector";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Card, Heading, Text, TrackedLinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "chains-landing";

const SolutionsChains: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "All-in-one dev tools for your chain",
        description:
          "Accelerate the growth of your chain by providing an all-in-one web3 development stack that allows your developers to build production-ready web3 apps and games.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/chains-solutions.png`,
              width: 1200,
              height: 630,
              alt: "All-in-one dev tools for your chain",
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
          title="Empower developers, on your chain"
          titleWithGradient=""
          subtitle="The easiest way for developers to build on your EVM chain — with wallets, contracts, payments, and infrastructure for them to scale web3 apps."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/contact-us"
          noContactUs
          gradient="linear(to-r,  #F856C8, #F856C8)"
          ctaText="Contact Us"
          image={require("public/assets/product-pages/hero/desktop-hero-chains.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-chains.png")}
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
              <LandingSectionHeading
                title="Everything developers need to build apps"
                blackToWhiteTitle=""
              />
            </Box>
          }
          desktopColumns={4}
        >
          <LandingCardWithImage
            title="Wallets"
            description="Create backend wallets you can programatically use with automatic nonce and gas management. Eliminate gas spikes, stuck transactions and network instability."
            image={require("public/assets/landingpage/account-abstraction-desktop.png")}
            mobileImage={require("public/assets/landingpage/account-abstraction-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/wallet"
            direction="horizontal"
          />

          <LandingCardWithImage
            title="Smart Contracts"
            description="Deploy, read, & write to any smart contract across any EVM-compatible blockchain — and build with thirdweb's audited smart contracts."
            image={require("public/assets/landingpage/smart-contract-audits-desktop.png")}
            mobileImage={require("public/assets/landingpage/smart-contract-audits-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/explore"
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
          <LandingCardWithImage
            title="Infrastructure"
            description="Built-in infrastructure so you don't have to worry about RPCs, storage, bundlers or paymasters."
            image={require("public/assets/landingpage/infastructure-desktop.png")}
            mobileImage={require("public/assets/landingpage/infastructure-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/rpc-edge"
            direction="horizontal"
          />
          <LandingCardWithImage
            title="Account Abstraction"
            description="Create managed smart wallets with shared custody between the backend wallet & a user's EOA wallet."
            image={require("public/assets/landingpage/account-desktop.png")}
            mobileImage={require("public/assets/landingpage/account-mobile.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="/account-abstraction"
            direction="horizontal"
            colSpan={1}
          />
        </LandingGridSection>

        <LandingGridSection
          desktopColumns={4}
          title={
            <Center>
              <Heading fontSize={48}>
                Your chain&nbsp;s application layer, solved
              </Heading>
            </Center>
          }
        >
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-ship.svg")}
              title="Launch Ecosystem-Ready"
              description="Give developers a full web3 developer stack and production-grade infrastructure to build apps and games on your chain, from day one."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/accility.svg")}
              title="Accelerate Activity"
              description="Grow active wallets & transaction activity on your chain. Reduce time-to-market for developers with and accelerate your ecosystem."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/support.svg")}
              title="World-Class Support"
              description="Give developers access to best-in-class learning resources and support from professional web3 developers."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/worldclass.svg")}
              title="Innovation, Built-In"
              description="Don't let developers fall behind: Give them first access to new standards, infrastructure, and tools before anyone else."
            />
          </Card>
        </LandingGridSection>

        <LandingCardWithImageBackground
          image={require("public/assets/landingpage/ava.png")}
        >
          <Flex flexDir="column" gap="16px" maxWidth="600px">
            <ChakraNextImage
              width={128}
              height={38}
              src={require("/public/assets/product-icons/avacloud_tw.svg")}
              alt="avacloud"
            />
            <Heading fontSize="xx-large" fontWeight="600" color="white">
              Launch Production-Ready Subnets with thirdweb and AvaCloud
            </Heading>
            <Text fontSize="medium" fontWeight="400" color="white">
              thirdweb&apos;s integration into AvaCloud empowers anyone to
              deploy production-ready subnets — and empower developers to build
              end-to-end apps on them, from day one.
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
              label="solutions-chain-case-study"
              href="https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life"
              maxW="fit-content"
              marginTop="10px"
            >
              Learn More
            </TrackedLinkButton>
          </Flex>
        </LandingCardWithImageBackground>

        <LandingEndCTA
          title="Empower developers to grow your ecosystem"
          titleWithGradient=""
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/gamingkit"
          gradient="linear(to-r, #F213A4, #F97CCE)"
          noCta
        />
      </Container>
    </LandingLayout>
  );
};

SolutionsChains.pageId = PageId.SolutionsChains;

export default SolutionsChains;
