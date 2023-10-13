import { Container, Flex } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHero } from "components/landing-pages/hero";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingOptionSelector } from "components/landing-pages/option-selector";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Card } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "marketplace-landing";

const SELECTOR_ITEMS = [
  {
    title: "Primary sales",
    description:
      "Allow your users to list, buy, and sell items, e.g. digital assets or loyalty memberships..",
    steps: [
      "Deploy Marketplace contract from Explore to any EVM chain (900+ supported)",
      "Create an ecosystem for collectors to Configure Marketplace contract, e.g. % platform fee collected on any sale",
      "Integrate Marketplace contract into your apps and games using SDK in multiple languages.",
    ],
    products: ["explore", "interact"],
  },
  {
    title: "Secondary marketplaces",
    description:
      "Sell NFTs on your own marketplace with flexible listing options, e.g. fixed price, auctions, and best offer.",
    steps: [
      "Deploy Marketplace contract from Explore to any EVM chain (900+ supported)",
      "Configure Marketplace contract, e.g. % platform fee collected on any sale",
      "Integrate Marketplace contract into your apps and games using SDK in multiple languages.y",
    ],
    products: ["explore", "interact"],
  },
  {
    title: "Subscription and All Access passes",
    description:
      "Create digital loyalty passes that provide access to early gameplay content, exclusive NFT drops, and in-game boosts",
    steps: [
      "User selects a digital loyalty pass NFT when they login",
      "Loyalty pass is used to unlock in-game experiences",
      "User collects rewards to upgrade their loyalty pass",
    ],
    products: ["explore", "interact", "nft-checkout"],
  },
  /* {
    title: "Add web3 to web2 game",
    description: "Easily integrate new web3 features into your existing application infrastructure using reusable UI components, SDK's and minting API's.",
    steps: ["", "", ""],
    products: ["connect", "auth", "interact", "engine", "sponsored-transactions", "nft-checkout"],
  }, */
  {
    title: "Interoperable game ecosystems",
    description:
      "Give a unified interface to users to login across your gaming ecosystem with the flexibility to import/export their digital assets",
    steps: [
      "User logs in using existing game login",
      "Game links User's gaming wallet to game issued Smart Wallet",
      "User selects assets they want to import and gives game scoped access to use assets for duration of game play",
    ],
    products: ["auth", "smart-wallet", "engine"],
  },
  {
    title: "Game appchain",
    description:
      "Connect seamlessly to any EVM compatible L1, L2 blockchains as well as build your game on your own app chain.",
    steps: [
      "Game devs can add their app chain to thirdweb Dashboard and SDK's",
      "An app chain landing page is generated with links to SDKs, contract deployment and infrastructure for their app chain",
      "Developers can easily deploy contracts to their app chain in just a few clicks and get code snippets to integrate contracts into their games",
    ],
    products: ["rpc-edge", "explore", "interact", "engine"],
  },
  {
    title: "Marketplace for digital assets",
    description:
      "Generate revenue through the launch of your own on-chain marketplace",
    steps: [
      "Deploy marketplace contract",
      "Set % platform fee (% collected by game dev on every in-game asset sale, e.g. when buyer buys tokens from listing)",
      "Players can list and trade NFTs for sale at a fixed price",
    ],
    products: ["explore", "interact", "nft-checkout", "engine", "storage"],
  },
];

const SolutionsMarketplace: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Add marketplaces to any app or game",
        description:
          "Deploy marketplace contract to any EVM chain. Multi-platform supported including desktop, mobile, and game engines.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/marketplace-solutions.png`,
              width: 1200,
              height: 630,
              alt: "Add marketplaces to any app or game",
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
          title="Add marketplaces"
          titleWithGradient="to any app or game"
          subtitle="Deploy marketplace contract to any EVM chain. Multi-platform supported including desktop, mobile, and game engines."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/pre-built-contracts/marketplace"
          gradient="linear(to-r, #F213A4, #F97CCE)"
          image={require("public/assets/product-pages/hero/desktop-hero-marketplace.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-marketplace.png")}
        />

        <LandingGridSection>
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/icons/icon-game.svg")}
            title="Any Platform"
            description="Multi-platform support including desktop, mobile and game engines."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/icons/icon-marketplace.svg")}
            title="Flexible configuration"
            description="Sell NFTs on your own marketplace with flexible listing options, e.g. fixed price, auctions, best offer. Create a secondary marketplace for your users to trade digital assets and collect % royalty fees."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/icons/icon-simple-click.svg")}
            title="Best-in-class DX"
            description="Integrate with just a few lines of code — with an interactive builder, powerful hooks for full customization, and onchain analytics."
          />
        </LandingGridSection>

        <LandingGridSection>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-contract.svg")}
              title="Marketplace Contract"
              description="thirdweb's marketplace contract is a dynamic contract that allows the marketplace to be upgraded over time with new functionality.."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-tool.svg")}
              title="Interact"
              description="The complete toolkit to add any smart contract into your apps — and call functions for any type of onchain interaction."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-lib.svg")}
              title="Explore"
              description="Browse smart contracts from the world's best engineers & protocols, for every use case — and deploy them to any EVM chain."
            />
          </Card>
        </LandingGridSection>

        <LandingOptionSelector
          items={SELECTOR_ITEMS}
          TRACKING_CATEGORY={TRACKING_CATEGORY}
          blackToWhiteTitle=""
          title="What You Can Build"
        />

        <LandingEndCTA
          title="Start building"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/pre-built-contracts/marketplace"
          gradient="linear(to-r, #F213A4, #F97CCE)"
        />
      </Container>
    </LandingLayout>
  );
};

SolutionsMarketplace.pageId = PageId.SolutionsMarketplace;

export default SolutionsMarketplace;
