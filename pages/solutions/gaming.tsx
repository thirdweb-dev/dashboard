import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingGuidesShowcase } from "components/landing-pages/guide-showcase";
import { LandingHero } from "components/landing-pages/hero";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { ImageCard } from "components/product-pages/common/ImageCard";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Card, Heading, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "gaming_kit";

const CASE_STUDIES = [
  {
    title:
      "Heroic Story Uses Dynamic NFTs to Build a Web3, Free-to-Own MMORPG Fantasy Game",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Heroic-Story-thumbnail-2.png",
    link: "https://blog.thirdweb.com/case-studies/heroic-story-uses-dynamic-nfts-to-build-a-web3-free-to-own-mmorpg-fantasy-game/",
  },
  {
    title: "Pixels Builds an On-Chain Ecosystem for its Open-World Web3 Game",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/04/Pixels-Builds-an-Onchain-Ecosystem-for-its-Web3-Game-thirdweb-Case-Study.png",
    link: "https://blog.thirdweb.com/case-studies/pixels-builds-an-onchain-ecosystem-for-its-web3-game/",
  },
  {
    title:
      "Fractal, web3 Gaming Platform and Marketplace for the Best Blockchain Games, Expands to EVM Chains",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Fractal.png",
    link: "https://blog.thirdweb.com/case-studies/fractal-web3-gaming-platform-and-marketplace-for-blockchain-games-expands-to-evm-chains/",
  },
];

const SolutionsGaming: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Integrate smart contracts into your apps",
        description:
          "The complete toolkit to add any smart contract into your apps — and call functions for any type of onchain interaction. Learn more.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/interact.png`,
              width: 1200,
              height: 630,
              alt: "Integrate smart contracts into your apps",
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
        <LandingHero
          title="Build blockchain games"
          titleWithGradient="on any platform"
          subtitle="Add web3 features to your game on all platforms, including: Native, Mobile, Console, Browser and VR."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/gamingkit"
          gradient="linear(to-r, #F213A4, #F97CCE)"
          image={require("public/assets/product-pages/hero/desktop-hero-interact.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-interact.png")}
        />

        <LandingGridSection>
          <LandingIconSectionItem
            icon={require("public/assets/product-pages-icons/contracts/icon-contract-action.svg")}
            title="Unlock new revenue streams"
            description="Primary sales and royalty fees from secondary sales for in-game assets represented as NFTs."
          />
          <LandingIconSectionItem
            icon={require("public/assets/product-pages-icons/contracts/icon-monitor-contract.svg")}
            title="Increase user retention"
            description="Reward your players with in game currency and digital assets."
          />
          <LandingIconSectionItem
            icon={require("public/assets/product-pages-icons/contracts/icon-analytics.svg")}
            title="Engage with your community"
            description="Enable access to other games within the studio seamlessly by creating an immersive ecosystem."
          />
        </LandingGridSection>
        <Flex alignItems="center" flexDirection="column">
          <Heading
            as="h2"
            size="display.sm"
            textAlign="center"
            mb={12}
            maxW={800}
          >
            Create new gaming universes
          </Heading>
          <SimpleGrid
            justifyContent="flex-start"
            w={{ base: "100%", md: "60%" }}
            columns={{ base: 1, md: 2 }}
            gap={{ base: 12, md: 6 }}
          >
            <ImageCard
              title="Cat Attack Mobile"
              image={require("/public/assets/solutions-pages/gaming/catattack-square.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://catattack.thirdweb.com"
            >
              Viral web3 mobile game Cat Attack built in just 2 days using
              thirdweb.
            </ImageCard>
            <ImageCard
              title="Web3 Warriors"
              image={require("/public/assets/solutions-pages/gaming/web3warriors.png")}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
              href="https://web3warriors.thirdweb.com"
            >
              An Onchain Survival Game. Escape the dungeon by battling
              terrifying bosses.
            </ImageCard>
          </SimpleGrid>
        </Flex>
        <LandingGridSection>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-contract-action.svg")}
              title="APIs"
              description="Unity and Unreal SDK support."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-marketplace-1.svg")}
              title="Connect"
              description="Onboard all of your users with a beautiful Connect Wallet modal, flexible sign-in options for web2 & web3, and powerful hooks for full customizability."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-monitor-contract.svg")}
              title="Embedded Wallet"
              description="Give any user the keys to web3 with familiar web2 login flows. Choose from non-custodial or custodial solutions & enable users to sign in with an email, phone number, or social account."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-contract-action.svg")}
              title="Smart Wallet"
              description="Transform your app's user experience with signless transactions, multi-signature security, account recovery and more."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-marketplace-1.svg")}
              title="NFT Checkout"
              description="Let users buy digital assets with a credit card, via a one-click checkout flow. Onboard anyone, even if they've never create a wallet or bought crypto before."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-monitor-contract.svg")}
              title="Sponsored Transactions"
              description="Create seamless web3 UX by sponsoring users' gas fees — for any & all transactions. No more disruptive transaction popups or bridging & swapping funds."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-contract-action.svg")}
              title="Engine"
              description={
                <>
                  Power your Web3 app with production-grade APIs, including
                  auth, smart contracts, backend wallets, gasless transactions,
                  and managed infrastructure.{" "}
                  <TrackedLink
                    category={TRACKING_CATEGORY}
                    href="https://share.hsforms.com/1b5uu_0bSQ3GX5NCQyrIeGAea58c"
                    color="primary.500"
                  >
                    Get beta access
                  </TrackedLink>
                  .
                </>
              }
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-marketplace-1.svg")}
              title="Auth"
              description="Easy auth for the most popular web3 wallets and web2 login flows — so you can verify your users' identities & prove wallet ownership to off-chain systems."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-monitor-contract.svg")}
              title="Interact"
              description="The complete toolkit to add any smart contract into your apps — and call functions for any type of onchain interaction."
            />
          </Card>
        </LandingGridSection>

        <LandingGridSection
          title={
            <LandingSectionHeading
              title="What You Can Build"
              blackToWhiteTitle=""
            />
          }
        >
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-digital-collectible.svg")}
              title="NFT & token mints"
              description="Deploy any smart contract, add custom extensions for advanced functionality, & instantly add it to any app — with an auto-generated mint embed so that your users can claim & mint NFTs directly from within it."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-analytics.svg")}
              title="App clients & analytics"
              description="Plug any existing smart contract into your app via our SDK to read from & write to it — so that you can build anything from app clients to insights aggregators, complete with intuitive data feeds for onchain analytics."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages-icons/contracts/icon-marketplace.svg")}
              title="Web3 apps, games & marketplaces"
              description="Build blockchain-powered games & marketplaces using all of the smart contracts you need —  with functions for token minting & redemption, buying & selling, burning, and everything else you need to build full-stack web3 apps."
            />
          </Card>
        </LandingGridSection>

        <LandingGuidesShowcase
          title="The best web3 apps use thirdweb's smart contract tools"
          category={TRACKING_CATEGORY}
          description="Seamlessly integrate your smart contracts into any app so you can focus on building a great user experience."
          guides={CASE_STUDIES}
          caseStudies
        />

        <LandingEndCTA
          title="Start building"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/sdk"
          gradient="linear(to-r, #F213A4, #F97CCE)"
        />
      </Container>
    </LandingLayout>
  );
};

SolutionsGaming.pageId = PageId.SolutionsGaming;

export default SolutionsGaming;
