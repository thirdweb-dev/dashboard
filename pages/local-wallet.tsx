// import { GuidesShowcase } from "../components/product-pages/common/GuideShowcase";
import { ProductSection } from "../components/product-pages/common/ProductSection";
import {
  Flex,
  GridItem,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Hero } from "components/product-pages/common/Hero";
import { HighlightedButton } from "components/product-pages/common/HighlightedButton";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductValueWithHighlight } from "components/product-pages/common/ProductValueWithHighlight";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import React, { useState } from "react";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const GRIDS = {
  "local-wallet": (
    <SimpleGrid columns={12} spacing={12} mt={24}>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="1">
          User logs into mobile web3 game and select “continue as Guest”.
          (Initially, user does not have to set up a “web3 wallet” to reduce
          onboarding friction)
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="2">
          Developer generates local wallet on backend with key stored on device
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="3">
          User receives in-game assets as they play game (Initially, user does
          not have to be aware of “digital assets” ownership)
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="4">
          After user accumulates in-game assets they receive a message to
          upgrade their local wallet to export assets into personal
          non-custodial wallet (User only needs to set up wallets after they
          have invested time in game)
        </ProductValueWithHighlight>
      </GridItem>
    </SimpleGrid>
  ),
};

// const GUIDES = [
//   {
//     title: "How to verify a Custom Contract on Etherscan using the dashboard",
//     image:
//       "https://blog.thirdweb.com/content/images/size/w2000/2022/12/verification.png",
//     link: "https://blog.thirdweb.com/guides/how-to-verify-a-custom-contract-on-etherscan/",
//   },
//   {
//     title: "How to Add Permissions to Your Smart Contract in Solidity",
//     image:
//       "https://blog.thirdweb.com/content/images/size/w2000/2022/10/This-is-the-one--13-.png",
//     link: "https://blog.thirdweb.com/guides/how-to-add-permissions-to-your-smart-contract-contractkit/",
//   },
//   {
//     title: "How to Create an NFT Drop on Solana without writing any code",
//     image:
//       "https://blog.thirdweb.com/content/images/size/w2000/2022/10/This-is-the-one--12-.png",
//     link: "https://blog.thirdweb.com/guides/how-to-create-an-nft-collection-on-solana-without-code/",
//   },
// ];

const TRACKING_CATEGORY = "local-wallet";

const LocalWalletPage: ThirdwebNextPage = () => {
  const [selectedTab] = useState<"local-wallet">("local-wallet");

  const descriptions = {
    "local-wallet":
      "Improve user onboarding with an invisible web3 wallet experience ",
  };

  return (
    <ProductPage
      seo={{
        title: "Local Wallet: The Complete Web3 Wallet Toolkit",
        description:
          "Build any web3 wallet experience with thirdweb’s Wallet SDK for Ethereum. Connect Wallet UI, ERC-4337 smart accounts, local wallets, and more.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/wallet-sdk.png`,
              width: 2334,
              height: 1260,
              alt: "Local Wallet: The Complete Web3 Wallet Toolkit",
            },
          ],
        },
      }}
    >
      <Hero
        trackingCategory={TRACKING_CATEGORY}
        name="Local Wallet"
        title="Build your own fully featured wallet"
        description="A powerful tool with raw capabilities to build your own fully featured wallet."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/wallet/local-wallet"
        image={require("public/assets/product-pages/local-wallet/hero.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)"
        imageHeight="650px"
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
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
          >
            Enable a “continue as guest” experience without users needing to
            interact with a wallet. Simply onboard users with a username and
            password flow by generating wallets on the fly in backend.
          </ProductCard>
          <ProductCard
            title="Complete dev tools"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
          >
            Everything you need to build your own fully featured wallet— from
            generating wallets on the backend to managing wallets (importing &
            exporting keys, save keys to secure storage, and private key
            recovery).
          </ProductCard>
          <ProductCard
            title="Flexible use cases"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
          >
            Local wallets can be used to build any type of wallet, including:
            custodial wallet, non-custodial, semi-custodial wallet.
          </ProductCard>
        </SimpleGrid>

        {/* Use cases */}
        <ProductSection py={{ base: 12, lg: 24 }}>
          <Heading
            as="h2"
            size="display.sm"
            fontWeight={700}
            textAlign="center"
            mb={{ base: 16, lg: 24 }}
          >
            Build for any use case with Local Wallet
          </Heading>
          <Flex
            direction={{
              base: "column",
              md: "row",
            }}
            justifyContent="center"
            gap={12}
            mb={12}
          >
            <HighlightedButton
              isHighlighted={selectedTab === "local-wallet"}
              title="Local Wallet"
              minHeight="63px"
              width={{
                base: "full",
                md: "236px",
              }}
            />
          </Flex>
          <Text
            alignSelf="center"
            textAlign="center"
            mb={24}
            color="white"
            fontWeight="bold"
            fontSize="xl"
          >
            {descriptions[selectedTab]}
          </Text>
          {/* <ChakraNextImage
            mx="auto"
            alt="invisible-wallet-experience"
            src={require(`/public/assets/product-pages/local-wallet/${selectedTab}.svg`)}
          /> */}
          {GRIDS[selectedTab]}
        </ProductSection>

        {/* Guides */}
        {/* <GuidesShowcase
          title="Learn how to build"
          category={TRACKING_CATEGORY}
          description="Check out our guides to learn how to use Dashboard"
          guides={GUIDES}
        /> */}
      </Hero>
    </ProductPage>
  );
};

LocalWalletPage.pageId = PageId.LocalWalletLanding;

export default LocalWalletPage;
