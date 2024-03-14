import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text, TrackedLinkButton } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingGridSection } from "components/landing-pages/grid-section";
import {
  LandingCardWithImage,
  LandingImages,
} from "components/landing-pages/card-with-image";
import LandingCardWithImageBackground from "components/landing-pages/card-with-image-background";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import LandingImageSectionItem from "components/landing-pages/image-section-item";
import { ChakraNextImage } from "components/Image";
import LandingTwitterCard from "components/landing-pages/twitter-card";

const TRACKING_CATEGORY = "engine-landing";

const trustedCompanies = [
  {
    title: "Coinbase Wallet",
    height: 74,
    width: 74,
    src: require("public/assets/partners/coinbase.png"),
  },
  {
    title: "Layer3",
    height: 74,
    width: 74,
    src: require("public/assets/partners/layer3.png"),
  },
  {
    title: "Infinigods",
    height: 74,
    width: 74,
    src: require("public/assets/partners/infinigods.png"),
  },
  {
    title: "Treasure",
    height: 74,
    width: 74,
    src: require("public/assets/partners/treasure.png"),
  },
  {
    title: "Cool Cats",
    height: 74,
    width: 74,
    src: require("public/assets/partners/coolcats.png"),
  },
];

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
          titleWithGradient="scalable apps"
          miniTitle="Engine"
          title="The open-source web3 backend for"
          subtitle="A production-grade HTTP server that interacts with smart contracts on any EVM chain. Create & manage backend wallets with automatic nonce queuing, gas management, and high throughput."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/engine"
          ctaText="Get started"
          contactUsTitle="Book a demo"
          gradient="linear(to-r, #9786DF, #9786DF)"
          image={require("public/assets/product-pages/engine/desktop-hero.png")}
          mobileImage={require("public/assets/product-pages/engine/mobile-hero.png")}
          miniImage={require("public/assets/product-icons/engine.png")}
        />
        <LandingGridSection desktopColumns={3}>
          <LandingImageSectionItem
            image={require("public/assets/landingpage/mobile/backend-list.png")}
            mobileImage={require("public/assets/landingpage/mobile/backend-list.png")}
            title="Backend Wallets"
            description="Sign & send transactions at scale. Eliminate stuck transactions and scale your app with automatic nonce management and gas-optimized transaction retries."
            justifyContent="flex-end"
            pr="0!important"
            pl="36px!important"
            maxHeightImage={{ base: "100%", md: "327px" }}
          />

          <LandingImageSectionItem
            image={require("public/assets/landingpage/desktop/web3warriors.png")}
            mobileImage={require("public/assets/landingpage/desktop/web3warriors.png")}
            title="Seamless UX"
            description="Create seamless UX by sponsoring gas fees — for any & all transaction, removing gas fees and transaction signing. Powered by Account Abstraction."
          />

          <LandingImageSectionItem
            image={require("public/assets/landingpage/desktop/infra.png")}
            mobileImage={require("public/assets/landingpage/desktop/infra.png")}
            title="Infrastructure handled"
            description="Focus on building your app with complete web3 infrastructure out-of-the box with RPC, IPFS, and Account Abstraction."
          />
        </LandingGridSection>

        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <LandingSectionHeading
            title="Integrate without the blockchain complexity"
            blackToWhiteTitle=""
          />

          <ChakraNextImage
            src={require("public/assets/landingpage/desktop/infastructure.png")}
            alt=""
            mt="56px"
            maxW={{ base: "100%", md: "60%" }}
            ml={{ base: "-35px", sm: "-65px" }}
          />
        </Flex>

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
            title="Smart Contracts"
            description="Deploy any smart contract including tokens, NFTs, marketplaces, and smart accounts."
            image={require("public/assets/landingpage/desktop/smart-contract-drop.png")}
            mobileImage={require("public/assets/landingpage/mobile/smart-contract-drop.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/contracts"
            colSpan={1}
          />

          <LandingCardWithImage
            title="Full Account Abstraction support"
            description="Deploy and manage smart wallets, use session keys for access controls, and transact on behalf of your users."
            image={require("public/assets/landingpage/desktop/account-abstraction.png")}
            mobileImage={require("public/assets/landingpage/mobile/account-abstraction.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/connect/account-abstraction"
            colSpan={2}
          />

          <LandingCardWithImage
            title="Any EVM chain"
            description="Engine supports contract calls on all 1000+ EVM blockchains and private subnets."
            image={require("public/assets/landingpage/mobile/any-evm.png")}
            mobileImage={require("public/assets/landingpage/mobile/any-evm.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://thirdweb.com/chainlist"
            colSpan={1}
          />
          <LandingCardWithImage
            title="Manage backend wallets"
            description="Verify a user's onchain identity with web3-first authentication, using the SIWE (Sign-in with Ethereum) standard. Make onchain identities work with traditional backends."
            image={require("public/assets/landingpage/desktop/sign-in.png")}
            mobileImage={require("public/assets/landingpage/mobile/sign-in.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/engine/features/backend-wallets"
          />
          <LandingCardWithImage
            title="High transaction throughput"
            description="Blockchain transactions are processed in parallel with nonce management, and stuck transactions are automatically retried."
            image={require("public/assets/landingpage/desktop/happy-people.png")}
            mobileImage={require("public/assets/landingpage/desktop/happy-people.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/engine"
          />
          <LandingCardWithImage
            title="Wallet and contract webhooks"
            description="Create automatic workflows triggered by wallet and contract events."
            image={require("public/assets/landingpage/desktop/webhooks.png")}
            mobileImage={require("public/assets/landingpage/mobile/webhooks.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/engine/features/webhooks"
            colSpan={1}
          />
          <LandingCardWithImage
            title="Advanced analytics"
            description="View transaction history trends, event logs for each transaction, a ledger of backend wallet funds, and more. (Coming soon)"
            image={require("public/assets/landingpage/desktop/analytics-v3.png")}
            mobileImage={require("public/assets/landingpage/mobile/analytics-v3.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/engine"
            direction="horizontal"
            colSpan={2}
          />
          <LandingCardWithImage
            title="Gasless Transactions"
            description="Sponsor user transactions with gasless relayers and user operations."
            image={require("public/assets/landingpage/desktop/gasless.png")}
            mobileImage={require("public/assets/landingpage/mobile/gasless.png")}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
            href="https://portal.thirdweb.com/engine/features/gasless-transactions"
            colSpan={1}
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

        <SimpleGrid columns={{ base: 1, md: 3 }} placeItems="center" gap={6}>
          <LandingTwitterCard
            src={require("public/assets/product-pages/engine/chusla.png")}
            name="chusla"
            username="@theahchu"
            showReactions={false}
            twitterContent={
              <Text color="#fff" fontWeight={500}>
                hot damn! using @thirdweb Engine for first time and i feel like
                i just got a superpower, holy crap, mind racing in terms of what
                i can build with this.
              </Text>
            }
          />

          <LandingTwitterCard
            src={require("public/assets/product-pages/engine/knight.png")}
            name="knight | metasky.ai"
            username="@SonuSharma0702"
            showReactions={false}
            twitterContent={
              <Flex flexDir="column" gap="20px">
                <Text color="#fff" fontWeight={500}>
                  After my parents I would like to give credit to @thirdweb for
                  my career 😂
                </Text>

                <Text color="#fff" fontWeight={500}>
                  I got hooked at wallet nonce management, automatic transaction
                  retrying and gas management. 🫣
                </Text>
              </Flex>
            }
          />

          <LandingTwitterCard
            src={require("public/assets/product-pages/engine/coolcats.png")}
            name="Adam Goodman"
            username="Backend Developer, Cool Cats"
            showReactions={false}
            twitterContent={
              <Text color="#fff" fontWeight={500}>
                Pretty crazy not having to worry about so many things I used to
                have to before, has very much sped up my flow
              </Text>
            }
          />
        </SimpleGrid>

        <LandingCardWithImageBackground
          image={require("public/assets/landingpage/coinbase-event.png")}
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
