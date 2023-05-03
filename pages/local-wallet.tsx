import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Heading } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const GUIDES = [
  {
    title: "Build An ERC721A NFT Collection using Solidity",
    image:
      "https://blog.thirdweb.com/content/images/size/w1000/2022/08/thumbnail-19.png",
    link: "https://blog.thirdweb.com/guides/get-started-with-the-contracts-sdk/",
  },
  {
    title: "Create A Generative Art NFT Collection Using Solidity & JavaScript",
    image:
      "https://blog.thirdweb.com/content/images/size/w1000/2022/08/This-is-the-one--8-.png",
    link: "https://blog.thirdweb.com/guides/create-a-generative-art-nft-collection-using-solidity-javascript/",
  },
  {
    title: "Build a Blockchain Game using the Solidity SDK",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/Group-625858--1-.png",
    link: "https://blog.thirdweb.com/guides/build-a-blockchain-game-using-contractkit/",
  },
];

const TRACKING_CATEGORY = "contract_kit";

const LocalWallet: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Local Wallet",
        description:
          "A powerful tool with raw capabilities to build your own fully featured wallet.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/solidity-sdk.png`,
              width: 2334,
              height: 1260,
              alt: "thirdweb Local Wallet",
            },
          ],
        },
      }}
    >
      {/* hero section */}
      <Hero
        trackingCategory={TRACKING_CATEGORY}
        name="Local Wallet"
        title="Build your own fully featured wallet"
        description="A powerful tool with raw capabilities to build your own fully featured wallet."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/wallet/local-wallet"
        image={require("public/assets/product-pages/local-wallet/hero.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #D45CFF 100.01%)"
        secondaryButton={{
          text: "Contact Us",
          link: "https://thirdweb.typeform.com/to/Q93CVgUc?typeform-source=thirdweb-www-git-mariano-ftd-1679.thirdweb-preview.com",
        }}
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Improve user experience"
            icon={require("/public/assets/product-pages/extensions/hero-icon-1.png")}
          >
            Enable a “continue as guest” experience without users needing to
            interact with a wallet. Simply onboard users with a username and
            password flow by generating wallets on the fly in backend.
          </ProductCard>
          <ProductCard
            title="Complete dev tools"
            icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
          >
            Everything you need to build your own fully featured wallet— from
            generating wallets on the backend to managing wallets (importing &
            exporting keys, save keys to secure storage, and private key
            recovery).
          </ProductCard>
          <ProductCard
            title="Flexible use cases"
            icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
          >
            Local wallets can be used to build any type of wallet, including:
            custodial wallet, non-custodial, semi-custodial wallet.
          </ProductCard>
        </SimpleGrid>
      </Hero>

      {/* Use Cases */}
      <ProductSection overflow="hidden">
        <Flex
          flexDir="column"
          py={{ base: 12, lg: 24 }}
          align="center"
          gap={{ base: 12, lg: 24 }}
        >
          <Box>
            <Heading
              as="h2"
              size="display.sm"
              fontWeight={700}
              textAlign="center"
              mb={6}
            >
              Build for any use case with Local Wallet
            </Heading>

            <Heading
              as="h3"
              size="subtitle.lg"
              textAlign="center"
              maxW="container.lg"
            >
              Improve user onboarding with an invisible web3 wallet experience
            </Heading>
          </Box>

          <SimpleGrid
            justifyContent="flex-start"
            w="100%"
            columns={{ base: 1, md: 3 }}
            gap={{ base: 12, md: 6 }}
          >
            <ProductCard
              title=""
              icon={require("/public/assets/product-pages/extensions/hero-icon-1.png")}
            >
              User logs into mobile web3 game and select “continue as Guest”.
              (Initially, user does not have to set up a “web3 wallet” to reduce
              onboarding friction)
            </ProductCard>
            <ProductCard
              title=""
              icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
            >
              Developer generates local wallet on backend with key stored on
              device
            </ProductCard>
            <ProductCard
              title=""
              icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
            >
              User receives in-game assets as they play game (Initially, user
              does not have to be aware of “digital assets” ownership)
            </ProductCard>
          </SimpleGrid>
        </Flex>
      </ProductSection>

      {/* Guides */}
      {/* <GuidesShowcase
        title="Learn how to build"
        category={TRACKING_CATEGORY}
        description="Check out our guides to learn how to build with the Solidity SDK"
        solution="Solidity SDK"
        guides={GUIDES}
      /> */}
    </ProductPage>
  );
};

LocalWallet.pageId = PageId.LocalWalletLanding;

export default LocalWallet;
