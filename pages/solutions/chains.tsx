import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { CatAttackCard } from "pages/build/base";
import { Heading, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "chains-landing";

const Chains: ThirdwebNextPage = () => {
  return (
    <ProductPage
      accentColor="rgba(22,82,240,.75)"
      seo={{
        title: "Chains | SDKs, Smart Contracts & Dev Tools for Web3 Games",
        description:
          "Build web3 games with our Unity SDK for all supported platforms, including: Native, Mobile, Console, Browser, and VR.",
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
        name="Chains"
        title="Supercharge app builders on your chain"
        description="Provide a best-in-class web3 development experience to accelerate launching of an app ecosystem on your chain spanning drops, marketplaces, games, and e-commerce on your chain."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/chains"
        gradient="linear-gradient(145.96deg, rgba(205, 0, 238, 1) 5.07%, #1652F0 100%)"
        image={require("public/assets/solutions-pages/chains/hero.png")}
        type="Solutions"
        trackingCategory={TRACKING_CATEGORY}
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Build Faster"
            icon={require("/public/assets/product-pages/extensions/hero-icon-1.png")}
          >
            {`Enable devs to deploy contracts onto your chain in just 1-click from your chain’s own thirdweb.com/<your chain> landing page. Integrate contracts into apps with just 2 lines of code using our SDKs.`}
          </ProductCard>
          <ProductCard
            title="Complete"
            icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
          >
            Our framework is all-in-one solution that simplifies the entire web3
            development cycle. Devs only need to use thirdweb. No need to
            manually integrate with providers across ecosystems.
          </ProductCard>
          <ProductCard
            title="Best-in-class dev experience"
            icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
          >
            Build faster for every web3 use case with GamingKit, CommerceKit &
            MintingKit. SDK’s in multiple languages that is cross platform
            including web, mobile, consoles, VR/AR. Embedded RPC’s and IPFS
            storage makes connecting to your chain very easy for developers.
          </ProductCard>
        </SimpleGrid>
      </Hero>

      <ProductSection py={{ base: 12, lg: 24 }}>
        <Flex alignItems="center" flexDirection="column">
          <Heading as="h2" size="display.sm" textAlign="center" mb={12}>
            Launch NFT Quests to boost development on your chain
          </Heading>
          <Heading
            as="h3"
            size="subtitle.lg"
            textAlign="center"
            color="whiteAlpha.700"
            fontWeight={400}
            fontSize="20px"
            mb={8}
          >
            We’ve made it easy for you to reward NFTs to early builders who
            deploy to your chain using thirdweb. Our seamless contract
            development workflow gives developers the best onboarding experience
            to your chain. Chains that have launched NFT Quests with thirdweb
            have seen up to <strong>500k contract deployments</strong> to their
            chain in just <strong>1 week</strong>. Download and launch template{" "}
            <TrackedLink
              category={TRACKING_CATEGORY}
              href="/"
              color="blue.500"
              fontWeight={600}
              textDecoration="underline"
            >
              here.
            </TrackedLink>
          </Heading>
          <Container maxW="3xl">
            <CatAttackCard trackingCategory={TRACKING_CATEGORY} hideGithub />
          </Container>
        </Flex>
      </ProductSection>

      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, var(--product-accent-color) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />
    </ProductPage>
  );
};

Chains.pageId = PageId.SolutionsChains;

export default Chains;
