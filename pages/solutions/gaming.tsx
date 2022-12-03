import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { GameShowcase } from "components/product-pages/common/GameShowcase";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { SolutionsTextImage } from "components/product-pages/common/SolutionsTextImage";
import { CodeSelector } from "components/product-pages/homepage/CodeSelector";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { Heading } from "tw-components";

const GAMING_GUIDES = [
  {
    title: "Get Started with the Unity SDK",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Group-625859--1-.png",
    link: "https://blog.thirdweb.com/guides/get-started-with-thirdwebs-unity-sdk/",
  },
  {
    title: "Add A Connect Wallet Button In A Unity Game",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Group-625859--6-.png",
    link: "https://blog.thirdweb.com/guides/add-a-connect-wallet-button-in-a-unity-game/",
  },
  {
    title: "Airdrop Free-To-Own NFTs For Your Web3 Game",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Group-625859--4-.png",
    link: "https://blog.thirdweb.com/guides/airdrop-free-to-own-nfts-for-a-web3-game/",
  },
];

const Gaming: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title:
          "thirdweb GamingKit | SDKs, Smart Contracts & Dev Tools for Web3 Games",
        description:
          "Everything you need to build web3 games. Build a stronger community around your game by giving players ownership of in-game assets.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/thirdwebxcoinbase.png`,
              width: 1200,
              height: 630,
              alt: "thirdweb x coinbase",
            },
          ],
        },
      }}
    >
      <Hero
        name="GamingKit"
        title="Reimagine gaming with web3 technologies"
        description="Everything you need to build web3 games. Build a stronger community around your game by giving players ownership of in-game assets."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/gamingkit"
        gradient="linear-gradient(145.96deg, rgba(205, 0, 238, 1) 5.07%, #1652F0 100%);"
        image={require("public/assets/solutions-pages/gaming/hero.png")}
        type="Solutions"
        underGetStarted={
          <Flex gap={3} justify="center" align="center" mt={4}>
            <Heading size="subtitle.xs" as="span" mt="4px">
              In partnership with
            </Heading>
            <ChakraNextImage
              src={require("public/assets/investors/coinbase.svg")}
              width="80px"
              alt="Coinbase"
            />
          </Flex>
        }
        largeImage
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Monetize with in-game asset sales"
            icon={require("/public/assets/product-pages/extensions/hero-icon-1.png")}
          >
            Get additional revenue streams with primary sales and royalty fees
            from secondary sales for in-game assets represented as NFTs.
          </ProductCard>
          <ProductCard
            title="Grow your gaming community"
            icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
          >
            Foster a more engaged community by empowering players to become
            owners of in-game assets, turning them into advocates for your
            games.
          </ProductCard>
          <ProductCard
            title="Create new gaming universes"
            icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
          >
            Game assets represented by NFTs can be designed to be interoperable
            across environments on the same blockchain. Assets can unlock perks
            and rewards throughout the web3 ecosystem.
          </ProductCard>
        </SimpleGrid>
      </Hero>

      <ProductSection pb={{ base: 12, lg: 24 }}>
        <Flex
          flexDir="column"
          pt={{ base: 12, lg: 24 }}
          align="center"
          gap={{ base: 6, md: 8 }}
        >
          <Heading as="h2" size="display.sm" textAlign="center">
            Connect to web3 easily.
          </Heading>
          <Heading
            as="h3"
            size="subtitle.lg"
            textAlign="center"
            maxW="container.md"
          >
            The ultimate development framework for all types of web3 games:
            free-to-own, play-to-earn, nft game, etc. Powerful Gaming Engine
            SDKs to integrate web3 features into your game.
          </Heading>
          <CodeSelector
            defaultLanguage="unity"
            docs="https://portal.thirdweb.com/gamingkit"
          />
        </Flex>
      </ProductSection>

      <SolutionsTextImage
        image={require("public/assets/solutions-pages/commerce/reimagine.png")}
        title="Bring your web2 game to web3 with Game Engine SDK, across any EVM blockchain"
      />

      <ProductSection>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
          py={{ base: 12, md: 24 }}
        >
          <ProductLearnMoreCard
            title="Build"
            description="Discover ready-to-go contracts or build your own with ContractKit for gaming use cases, e.g. NFT Marketplace, Multiwrap, Packs, Soulbound Tokens, and more. Integrate NFT marketplace into your game to enforce royalty fees."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            href="https://portal.thirdweb.com/contractkit"
          />
          <ProductLearnMoreCard
            title="Launch"
            description="Powerful Game Engine SDK enables you to integrate web3 features into browser-based games built on Unity. SDKs allow you to easily integrate popular wallets and marketplaces into your game. Unreal Engine SDK coming soon."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
            href="https://portal.thirdweb.com/gamingkit"
          />
          <ProductLearnMoreCard
            title="Manage"
            description="View and interact with your web3 game smart contracts directly from a user interface, e.g. view all NFTs owned by a player."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
            href="https://portal.thirdweb.com/dashboard"
          />
        </SimpleGrid>
      </ProductSection>

      <GameShowcase />

      <GuidesShowcase
        title="Start building web3 games"
        description="Check out our guides and templates to start building games with thirdweb"
        solution="Gaming"
        guides={GAMING_GUIDES}
      />

      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, rgba(24, 67, 78, 0.8) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />
      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, rgba(24, 67, 78, 0.8) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />
      <NewsletterSection />
    </ProductPage>
  );
};

Gaming.pageId = PageId.SolutionsGaming;

export default Gaming;
