// import { GuidesShowcase } from "../components/product-pages/common/GuideShowcase";
import { ProductSection } from "../components/product-pages/common/ProductSection";
import {
  Box,
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
import { Heading, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const GRIDS = {
  "smart-wallet": (
    <SimpleGrid columns={12} spacing={12} mt={24}>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="1">
          Dev deploys smart contract wallet using thirdweb base template for
          smart wallets.
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <UnorderedList>
          <ProductValueWithHighlight circleLabel="2">
            Dev sets custom logic for their team wallet
            <ListItem mt={4}>
              Logic: for outgoing transactions greater than 10 ETH from team
              wallet, 3 designated signers (Dev team members) must sign off on
              transactions before it can be executed on chain
            </ListItem>
          </ProductValueWithHighlight>
        </UnorderedList>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="3">
          Dev team member wants to send transaction greater than 10 ETH to an
          infrastructure provider as part of ongoing expenses
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="4">
          Since this transaction is greater than 10 ETH, it requires Dev’s team
          members to sign transaction before it is executed on chain
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

const TRACKING_CATEGORY = "smart-wallet";

const SmartWalletPage: ThirdwebNextPage = () => {
  const [selectedTab] = useState<"smart-wallet">("smart-wallet");

  const descriptions = {
    "smart-wallet":
      "Programmable wallets with permissioned access by team role",
  };

  return (
    <ProductPage
      seo={{
        title: "Smart Wallets: The Account Abstraction Toolkit (ERC-4337)",
        description:
          "Build smart wallets with ERC-4337 compliance, full customizability, & powerful features. Learn more & implement account abstraction wallets.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/wallet-sdk.png`,
              width: 2334,
              height: 1260,
              alt: "Smart Wallet: The Complete Web3 Wallet Toolkit",
            },
          ],
        },
      }}
    >
      <Hero
        trackingCategory={TRACKING_CATEGORY}
        name="Smart Wallet"
        title="Your wallet, upgraded. Introducing: Smart Wallet."
        description="Create programmable wallets with on-chain rules to unlock new use cases for your apps and games."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/wallet/smart-wallet"
        image={require("public/assets/product-pages/smart-wallet/hero.png")}
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
          mb={{
            base: 12,
            md: 24,
          }}
        >
          <ProductCard
            title="Build Faster"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
          >
            <Text fontSize="lg">
              ERC-4337 compliant smart wallets to{" "}
              <TrackedLink
                href="https://thirdweb.com/explore"
                category={TRACKING_CATEGORY}
                textDecoration="underline"
                color="blue.200"
                target="_blank"
              >
                deploy in one click
              </TrackedLink>{" "}
              or{" "}
              <TrackedLink
                href="https://portal.thirdweb.com/wallet/smart-wallet"
                category={TRACKING_CATEGORY}
                textDecoration="underline"
                color="blue.200"
                target="_blank"
              >
                extend with your custom logic
              </TrackedLink>
            </Text>
          </ProductCard>
          <ProductCard
            title="Complete"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
          >
            <Text fontSize="lg">
              Account abstraction infrastructure out of the box with{" "}
              <TrackedLink
                href="https://thirdweb.com/wallet-sdk"
                category={TRACKING_CATEGORY}
                textDecoration="underline"
                color="blue.200"
                target="_blank"
              >
                Wallet SDK.
              </TrackedLink>{" "}
              Fully compatible with ERC-4337.
            </Text>
          </ProductCard>
          <ProductCard
            title="Best-in-class developer experience"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
          >
            Easily integrate smart wallets into your app or games using our
            intuitive web3 SDKs.
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
            Build for any use case with Smart Wallet
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
              isHighlighted={selectedTab === "smart-wallet"}
              title="Smart Wallet"
              minHeight="63px"
              pointerEvents="none"
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
          <ChakraNextImage
            mx="auto"
            alt="invisible-wallet-experience"
            src={require(`/public/assets/product-pages/wallet-sdk/${selectedTab}.svg`)}
          />
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

SmartWalletPage.pageId = PageId.SmartWalletLanding;

export default SmartWalletPage;
