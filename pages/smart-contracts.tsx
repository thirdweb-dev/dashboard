import { SimpleGrid } from "@chakra-ui/react";
import { SDKSection } from "components/homepage/sections/SDKSection";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const CONTRACTS_GUIDES = [
  {
    title: "Build An ERC721A NFT Collection using Solidity",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/08/thumbnail-19.png",
    link: "https://blog.thirdweb.com/guides/get-started-with-the-contracts-sdk/",
  },
  {
    title: "Build A Mutant Ape Yacht Club (MAYC) NFT Collection Clone",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/09/This-is-the-one-4.png",
    link: "https://blog.thirdweb.com/guides/create-an-mayc-collection-clone/",
  },
  {
    title:
      "How To Build An Upgradeable Smart Contract and Upgrade it Using a Proxy Contract",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/This-is-the-one--17-.png",
    link: "https://blog.thirdweb.com/guides/how-to-upgrade-smart-contracts-upgradeable-smart-contracts/",
  },
];

const PreBuiltContracts: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Discover and deploy contracts in 1-click",
        description:
          "Explore gives developers a trusted place to discover contracts that have been built by thirdweb and other contract developers. Discover contracts for every use case.",
      }}
    >
      <Hero
        trackingCategory="smart_contracts"
        name="Explore"
        title="Discover and deploy contracts in 1-click"
        description="Explore gives developers a trusted place to discover contracts that have been built by thirdweb and other contract developers. Discover contracts for every use case."
        buttonText="Get started"
        buttonLink="/explore"
        image={require("public/assets/product-pages/pre-builts/hero.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #AB2E2E 100.01%)"
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Designed to be discovered"
            icon={require("/public/assets/product-pages/pre-builts/hero-icon-1.png")}
          >
            Get inspired with our curated library of contracts- organized and
            categorized by the most common builds and use cases.
          </ProductCard>
          <ProductCard
            title="Unlock powerful tooling"
            icon={require("/public/assets/product-pages/pre-builts/hero-icon-2.png")}
          >
            When you deploy a contract from Explore, you unlock access to our
            tools that makes building and managing your web3 apps seamless.
          </ProductCard>
          <ProductCard
            title="1-click deploy"
            icon={require("/public/assets/product-pages/pre-builts/hero-icon-3.png")}
          >
            Deploy to any supported chain with a single click. No need for
            private keys or scripts.
          </ProductCard>
        </SimpleGrid>
      </Hero>
      <ProductSection py={{ base: 12, lg: 24 }}>
        <SDKSection title="Integrate web3 into your apps and games." />
      </ProductSection>

      <ProductSection>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: 12, md: 6 }}
          py={{ base: 12, md: 24 }}
        >
          <ProductLearnMoreCard
            title="Frontend applications"
            description="Build the frontend of your apps and games using our SDKs. This is best suited for when you need users to connect their wallets to interact with contracts."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
            href="https://portal.thirdweb.com/sdk/set-up-the-sdk/frontend"
          />
          <ProductLearnMoreCard
            title="Backend applications"
            description="Build the backend of your apps and games using our SDKs. Backend apps are best suited for when you need to perform actions from your wallet or simply need to read data."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            href="https://portal.thirdweb.com/sdk/set-up-the-sdk/backend"
          />
        </SimpleGrid>
      </ProductSection>

      <GuidesShowcase
        title="Learn how to build"
        description="Check out our guides to starty building with our SDKs."
        solution="SDK"
        guides={CONTRACTS_GUIDES}
      />
    </ProductPage>
  );
};

PreBuiltContracts.pageId = PageId.PreBuiltContractsLanding;

export default PreBuiltContracts;
