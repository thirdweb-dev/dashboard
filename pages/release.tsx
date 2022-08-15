import { ThirdwebNextPage } from "./_app";
import { SimpleGrid } from "@chakra-ui/react";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { PageId } from "page-id";
import { Text } from "tw-components";

const Release: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Release",
        description: "The public home for your smart contracts.",
        openGraph: {
          title: "Release | thirdweb",
          url: `https://thirdweb.com/release`,
        },
      }}
    >
      <Hero
        name="Release"
        title="The public home for your smart contracts"
        description="Everything you need to release your contracts to users."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/release"
        image={require("public/assets/product-pages/authentication/auth.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #FBFF5C 100.01%)"
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Register contracts on-chain"
            icon={require("/public/assets/product-pages/release/hero-icon-1.png")}
          >
            When you officially release a contract, it gets added to our{" "}
            <Text as="span" fontWeight="medium" color="white">
              trusted on-chain registry
            </Text>{" "}
            of contracts.
          </ProductCard>
          <ProductCard
            title="Get an official contract page"
            icon={require("/public/assets/product-pages/release/hero-icon-2.png")}
          >
            Get a dedicated page where users can learn more about your contract,
            view relevant links and socials, and explore.
          </ProductCard>
          <ProductCard
            title="Easy one-click deployment"
            icon={require("/public/assets/product-pages/release/hero-icon-3.png")}
          >
            Once you release your contract, users will be able to deploy it
            themselves with a single click.
          </ProductCard>
        </SimpleGrid>
      </Hero>
    </ProductPage>
  );
};

Release.pageId = PageId.ReleaseLanding;

export default Release;
