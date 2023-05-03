import { Flex, SimpleGrid } from "@chakra-ui/react";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { YoutubeEmbed } from "components/video-embed/YoutubeEmbed";
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

      {/* Learn More section */}
      <ProductSection py={{ base: 12, lg: 24 }}>
        <Heading
          as="h2"
          size="display.sm"
          fontWeight={700}
          textAlign="center"
          mb={{ base: 16, lg: 24 }}
        >
          Contracts for every use case
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={14}>
          <ProductLearnMoreCard
            title="Base Contracts"
            category={TRACKING_CATEGORY}
            description="Fully featured base contracts, including ERC721, ERC1155 & ERC20. This provides capability to mint NFTs to sell on a marketplace, signature-based minting, batch lazy mint NFTs, delayed reveal and claim conditions to define how your NFTs can be claimed."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            href="https://portal.thirdweb.com/solidity/base-contracts"
          />
          <ProductLearnMoreCard
            title="Extensions"
            category={TRACKING_CATEGORY}
            description="Each extension that you implement in your smart contract unlocks corresponding functionality for you to utilize in the SDK."
            icon={require("/public/assets/product-pages/deploy/hero-icon-2.png")}
            href="https://portal.thirdweb.com/solidity/extensions"
          />
        </SimpleGrid>
      </ProductSection>

      {/* Guides */}
      <GuidesShowcase
        title="Learn how to build"
        category={TRACKING_CATEGORY}
        description="Check out our guides to learn how to build with the Solidity SDK"
        solution="Solidity SDK"
        guides={GUIDES}
      />
    </ProductPage>
  );
};

LocalWallet.pageId = PageId.LocalWalletLanding;

export default LocalWallet;
