import { Box, Container, Flex } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text, TrackedLink, TrackedLinkButton } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingPlan } from "components/landing-pages/plan";
import { LandingCardWithImage } from "components/landing-pages/card-with-image";
import LandingCardWithImageBackground from "components/landing-pages/card-with-image-background";
import { LandingSectionHeading } from "components/landing-pages/section-heading";

const TRACKING_CATEGORY = "engine-landing";

const EngineLanding: ThirdwebNextPage = () => {
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
        gap={{ base: "160px", md: "202px" }}
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
                  title="Scale your app without sacrificing performance or security"
                  blackToWhiteTitle=""
                />
              </Box>
            </Box>
          }
        >
          <LandingIconSectionItem
            icon={require("../../public/assets/solutions-pages/loyalty/icon-1.png")}
            title="Scale to millions"
            description="Production-grade infra that scales. Eliminate gas spikes, stuck transactions and network instability."
          />
          <LandingIconSectionItem
            icon={require("../../public/assets/solutions-pages/loyalty/icon-2.svg")}
            title="Go to market faster"
            description="Build web3 apps and games using familiar frameworks. Engine lowers the barrier to entry for developers and gives them the power of web3 with one http call."
          />
          <LandingIconSectionItem
            icon={require("../../public/assets/solutions-pages/loyalty/icon-7.png")}
            title="Any EVM support"
            description="Launch your app on any (or many) chains. Unlock ultimate cross-chain flexibility with support for any EVM."
          />
          <LandingIconSectionItem
            icon={require("../../public/assets/solutions-pages/loyalty/icon-3.svg")}
            title="Secure and reliable"
            description="Back up private keys to the cloud, leverage secure cloud key management for signing and custody, revoke access to backend wallets, and monitor flow of funds."
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
                title="Scale your app without sacrificing performance or security"
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

        <Flex width="full" flexDir="column" gap="80px">
          <LandingSectionHeading
            title="Flexible pricing for every team"
            blackToWhiteTitle=""
          />

          <LandingGridSection desktopColumns={3}>
            <LandingPlan
              title="Open-Source Developer Tools"
              description="Support for thirdweb products with public infrastructure."
              list={[
                {
                  id: "smart-contract",
                  description: "Smart Contract Deployment",
                },
                {
                  id: "cross-platform",
                  description: "Cross-Platform Connect Integration",
                },
                {
                  id: "in-app",
                  description: "In-App Wallets: Email, Social, Phone",
                },
                {
                  id: "engine",
                  description:
                    "thirdweb Engine: Backend Wallets & Nonce Management",
                },
                {
                  id: "chainlist",
                  description: (
                    <Text key="chainlist" size="body.lg" color="#B1B1B1">
                      Added to{" "}
                      <TrackedLink
                        href="/chainlist"
                        isExternal
                        category={TRACKING_CATEGORY}
                        label="thirdweb_chainlist"
                        textDecoration="underline"
                      >
                        thirdweb Chainlist
                      </TrackedLink>
                    </Text>
                  ),
                },
              ]}
              trackingCategory={TRACKING_CATEGORY}
            />

            <LandingPlan
              active
              title="Managed Ecosystem Services"
              description="Full-stack development tools & production-ready infra."
              listTitle="Everything in the Open-Source tier, plus:"
              list={[
                {
                  id: "aa",
                  description:
                    "Account Abstraction Infrastructure: Smart Accounts, Bundler, Paymaster",
                },
                {
                  id: "scale",
                  description:
                    "Point-of-sale tools for fiat & crypto payments with onramp, swapping, & bridging",
                },
                {
                  id: "uptime",
                  description: "99.9% Infrastructure uptime SLAs",
                },
                { id: "sla", description: "24 hour customer support SLAs" },
                {
                  id: "channel",
                  description: "Dedicated Slack support channel",
                },
                {
                  id: "premium",
                  description: "Premium placements for your chain",
                },
                {
                  id: "indexer",
                  description: "thirdweb Indexer (Coming in Q2)",
                },
              ]}
              btnTitle="Contact us"
              btnHref="https://share.hsforms.com/19M7W6QqDTGacrTRBC3Me_Aea58c"
              trackingCategory={TRACKING_CATEGORY}
            />
          </LandingGridSection>
        </Flex>

        <LandingCardWithImageBackground
          image={require("../../public/assets/landingpage/coinbase-event.png")}
        >
          <Flex flexDir="column" gap="27px" maxWidth="600px">
            <Heading fontSize="xx-large" fontWeight="600" color="white">
              Coinbase Brings Onchain Experiences to the Real World
            </Heading>
            <Text fontSize="medium" fontWeight="400" color="white">
              Scalable, fast, & reliable NFT infrastructure to power onchain
              experiences — bringing half of all Mainnet 2023 attendees onchain
              via Coinbase Wallet.
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
              href="https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life"
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
          ctaText="Get started"
          ctaLink="/dashboard/engine"
          contactUsTitle="Book a demo"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

EngineLanding.pageId = PageId.EngineLanding;

export default EngineLanding;
