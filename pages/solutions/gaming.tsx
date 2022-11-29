import { Box, SimpleGrid } from "@chakra-ui/react";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { SolutionsTextImage } from "components/product-pages/common/SolutionsTextImage";
import { PageId } from "page-id";
import { NewsLetterSection } from "pages";
import { ThirdwebNextPage } from "pages/_app";

const GAMING_GUIDES = [
  {
    title: "How to Create a Token Gated Website on Shopify using thirdweb",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/create-token-gated-website-with-shopify-storefront-and-thirdweb.png",
    link: "https://blog.thirdweb.com/guides/token-nft-gated-shopify-website-thirdweb/",
  },
  {
    title: "Generate Shopify Discount Codes For NFT Holders",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/This-is-the-one--10-.png",
    link: "https://blog.thirdweb.com/guides/generate-shopify-discount-codes-for-nft-holders/",
  },
  {
    title: "Distribute NFTs on a Shopify Store",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/This-is-the-one--11-.png",
    link: "https://blog.thirdweb.com/guides/shopify-selling-an-nft-as-a-digital-asset-on-shopify-store/",
  },
];

const Gaming: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Gaming | Solutions",
        description:
          "Create web3 gaming apps, build token-gated websites, and sell NFTs to your audience—all with thirdweb's Shopify integration. Start here.",
        openGraph: {
          images: [
            {
              url: "https://thirdweb.com/thirdwebxshopify.png",
              width: 1200,
              height: 630,
              alt: "thirdweb x shopify",
            },
          ],
        },
      }}
    >
      <Hero
        name="Gaming"
        title="Reimagine gaming with web3 technologies"
        description="Easily integrate web3 features into your games. Build a stronger community around your game by giving players ownership of in-game assets."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/gamingkit"
        gradient="linear-gradient(147.15deg, #5CFFE1 30.17%, #410AB6 100.01%)"
        image={require("public/assets/solutions-pages/commerce/reimagine.png")}
        type="Solutions"
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
            from secondary sales for in-game assets represented as NFTs
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
            title="Interoperable in-game assets"
            icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
          >
            Game assets represented by NFTs can be designed to be interoperable
            across environments on the same blockchain. Assets can unlock perks
            and rewards throughout the web3 ecosystem.
          </ProductCard>
        </SimpleGrid>
      </Hero>

      <SolutionsTextImage
        image={require("public/assets/solutions-pages/commerce/hero.png")}
        title="Build creative gaming experiences with web3 technologies"
      />

      <ProductSection>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
          py={{ base: 12, md: 24 }}
        >
          <ProductLearnMoreCard
            title="Build"
            description="Prebuilt contracts to start building for gaming use cases quickly, e.g. in-game currencies, airdrop free-to-own NFTs, and more. Enforceable fees for NFT primary and secondary sales with marketplace contract."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            href="https://portal.thirdweb.com/contractkit"
          />
          <ProductLearnMoreCard
            title="Launch"
            description="Powerful Unity SDK enables you to integrate web3 into games built on Unity game engine. Easy integration with popular wallets. Easily bootstrap projects with a single command."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
            href="https://portal.thirdweb.com/gamingkit"
          />
          <ProductLearnMoreCard
            title="Manage"
            description="View and interact with your game smart contracts directly from a user interface, e.g. view all the NFTs owned by a player."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
            href="https://portal.thirdweb.com/dashboard"
          />
        </SimpleGrid>
      </ProductSection>

      <GuidesShowcase
        title="Start building web3 games"
        description="Check out our comprehensive guides to get you started building games with thirdweb"
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
      <NewsLetterSection />
    </ProductPage>
  );
};

Gaming.pageId = PageId.SolutionsGaming;

export default Gaming;
