import { ThirdwebNextPage } from "./_app";
import { SimpleGrid } from "@chakra-ui/react";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { PageId } from "page-id";

const Web3SDK: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Web3 SDK",
        description: "Everything you need to build web3 apps.",
        openGraph: {
          title: "Web3 SDK | thirdweb",
          url: `https://thirdweb.com/web3-sdk`,
        },
      }}
    >
      <Hero
        name="Web3 SDK"
        title="Everything you need to build web3 apps."
        description="Easily build applications on top of your smart contracts."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/web3-sdk"
        image={require("public/assets/product-pages/authentication/auth.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #5BFF40 100.01%)"
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Interact with the blockchain"
            icon={require("/public/assets/product-pages/sdk/hero-icon-1.png")}
          >
            Read and write data from your smart contracts, query logs, listen
            for events, and more.
          </ProductCard>
          <ProductCard
            title="Frontend hooks and components"
            icon={require("/public/assets/product-pages/sdk/hero-icon-2.png")}
          >
            We provide frontend components like wallet connection and contract
            buttons, as well as easy-to-use hooks to speed up your app
            development.
          </ProductCard>
          <ProductCard
            title="Built for all developers"
            icon={require("/public/assets/product-pages/sdk/hero-icon-3.png")}
          >
            We provide SDKs in many languages, including JavaScript/TypeScript,
            Python, and Go so you can build with whatever tools you’re most
            comfortable using.
          </ProductCard>
        </SimpleGrid>
      </Hero>
    </ProductPage>
  );
};

Web3SDK.pageId = PageId.Web3SDKLanding;

export default Web3SDK;
