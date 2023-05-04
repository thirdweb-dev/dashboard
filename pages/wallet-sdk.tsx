// import { GuidesShowcase } from "../components/product-pages/common/GuideShowcase";
import { ProductSection } from "../components/product-pages/common/ProductSection";
import {
  Flex,
  GridItem,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraNextImage } from "components/Image";
import { Hero } from "components/product-pages/common/Hero";
import { HighlightedButton } from "components/product-pages/common/HighlightedButton";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductValueWithHighlight } from "components/product-pages/common/ProductValueWithHighlight";
import { DemoCodeSnippet } from "components/wallet-sdk/DemoCodeSnippet";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import React, { useState } from "react";
import { Heading, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const GRIDS = {
  "invisible-wallet-experience": (
    <SimpleGrid columns={12} spacing={12} mt={24}>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="1">
          User logs into mobile web3 game as “guest”
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="2">
          Developer generates a local wallet for user
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="3">
          User receives digital assets as they play game
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="4">
          Later on, user can upgrade local wallet to a non-custodial wallet so
          they can have full control of their digital assets
        </ProductValueWithHighlight>
      </GridItem>
    </SimpleGrid>
  ),
  "email-sign-in": (
    <SimpleGrid columns={12} spacing={12} mt={24}>
      <GridItem
        display={{
          base: "none",
          md: "block",
        }}
        colSpan={{ md: 2 }}
      />
      {/* Empty GridItem for centering */}
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="1">
          User logs into app with their email address
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="2">
          Dev generates a local wallet for the user
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="3">
          User selects “claim digital asset” in app with no transaction signing
          required
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem
        display={{
          base: "none",
          md: "block",
        }}
        colSpan={{ md: 1 }}
      />
      {/* Empty GridItem for centering */}
    </SimpleGrid>
  ),
  "smart-wallet": (
    <SimpleGrid columns={12} spacing={12} mt={24}>
      <GridItem
        display={{
          base: "none",
          md: "block",
        }}
        colSpan={{ md: 2 }}
      />
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="1">
          User logs into app to buy digital assets from marketplace
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="2">
          User selects multiple digital assets to purchase
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="3">
          Multiple transactions are combined together into a single transaction
          and executed on-chain in 1-click
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem
        display={{
          base: "none",
          md: "block",
        }}
        colSpan={{ md: 1 }}
      />
      {/* Empty GridItem for centering */}
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

const TRACKING_CATEGORY = "wallet-sdk";

const WalletSDK: ThirdwebNextPage = () => {
  const [selectedTab, setSelectedTab] = useState<
    "invisible-wallet-experience" | "email-sign-in" | "smart-wallet"
  >("invisible-wallet-experience");

  const descriptions = {
    "invisible-wallet-experience":
      "Improve your onboarding with an invisible web3 wallet experience",
    "email-sign-in":
      "Increase user activation rates with familiar web2 email sign-in flows",
    "smart-wallet":
      "Programmable wallets to enable 1-click batch transactions user experience",
  };

  return (
    <ProductPage
      seo={{
        title: "Wallet SDK: The Complete Web3 Wallet Toolkit",
        description:
          "Build any web3 wallet experience with thirdweb’s Wallet SDK for Ethereum. Connect Wallet UI, ERC-4337 smart accounts, local wallets, and more.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/wallet-sdk.png`,
              width: 2334,
              height: 1260,
              alt: "Wallet SDK: The Complete Web3 Wallet Toolkit",
            },
          ],
        },
      }}
    >
      <Hero
        trackingCategory={TRACKING_CATEGORY}
        name="Wallet SDK"
        title="Connect any wallet"
        description="Connect any wallet to your apps, from custodial wallets to non-custodial wallets."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/wallet"
        image={require("public/assets/product-pages/wallet-sdk/hero.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)"
        imageHeight="650px"
        secondaryButton={{
          text: "Request Demo",
          link: "https://thirdweb.typeform.com/to/Q93CVgUc",
        }}
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Complete"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
          >
            Build any wallet experience, including support for: non-custodial
            wallets, custodial wallets, MPC wallets, email wallets, and more.
            Cross-platform support (Unity, ReactNative).
          </ProductCard>
          <ProductCard
            title="Simple"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
          >
            We’ve made the entire web3 wallet development simple. Out-of-the-box
            UI components for ConnectWallet button. SDK hooks to connect with
            any wallet providers with our Connectors. Ready-to-deploy starter
            bases for smart wallets.
          </ProductCard>
          <ProductCard
            title="Composable"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
          >
            <Text fontSize="lg">
              Use{" "}
              <TrackedLink
                href="https://portal.thirdweb.com/wallet"
                category={TRACKING_CATEGORY}
                textDecoration="underline"
                color="blue.200"
                target="_blank"
              >
                Wallet SDK
              </TrackedLink>{" "}
              as a turnkey out-of-the box solution or bring your own
              provider/solutions to complement with parts of our Wallet SDK.
            </Text>
          </ProductCard>
        </SimpleGrid>

        {/* Connect Wallet Button */}
        {/* <ProductSection py={{ base: 12, lg: 24 }}>
          <Heading
            as="h2"
            size="display.sm"
            fontWeight={700}
            textAlign="center"
            mb={{ base: 8, lg: 16 }}
          >
            Connect Wallet Button
          </Heading>
          <ThirdwebProvider activeChain="goerli">
            <DemoCodeSnippet
              text={`\
              <ConnectWallet
                theme='dark'
                dropdownPosition={{
                  align: 'center',
                  side: 'bottom',
                }}
              />`}
            />
          </ThirdwebProvider>
        </ProductSection> */}

        {/* Products */}
        <ProductSection py={{ base: 12, lg: 24 }}>
          <Heading
            as="h2"
            size="display.sm"
            fontWeight={700}
            textAlign="center"
            mb={{ base: 8, lg: 16 }}
          >
            How it works
          </Heading>
          <ChakraNextImage
            src={require("/public/assets/product-pages/wallet-sdk/how-it-works.png")}
            alt="How it works"
            mb={16}
            maxH="700px"
          />
          <SimpleGrid
            justifyContent="flex-start"
            w="100%"
            columns={{ base: 1, md: 3 }}
            gap={{ base: 12, md: 6 }}
          >
            <ProductCard
              title="ConnectWallet"
              icon={require("/public/assets/product-pages/wallet-sdk/connect-wallet.png")}
              titleLink="https://portal.thirdweb.com/unity/connectwalletnative"
              linkCategory={TRACKING_CATEGORY}
            >
              <UnorderedList>
                <ListItem>
                  Out-of-the-box UI components to easily integrate into your
                  apps and games with cross-platform support (Unity, React,
                  ReactNative).
                </ListItem>
                <ListItem mt={4}>
                  Enable end users to connect with popular wallets (170+
                  supported) across all types of wallets. Includes Safe
                  multi-sig support.
                </ListItem>
              </UnorderedList>
            </ProductCard>
            <ProductCard
              title="Local Wallet"
              icon={require("/public/assets/product-pages/wallet-sdk/local-wallet.png")}
              titleLink="https://portal.thirdweb.com/wallet/local-wallet"
              linkCategory={TRACKING_CATEGORY}
            >
              <UnorderedList>
                <ListItem>
                  Powerful tool with raw capabilities to build your own fully
                  featured wallet solution
                </ListItem>
                <ListItem mt={4}>
                  Everything you need to build your own fully featured wallet—
                  from generating wallets on the backend to managing wallets
                  (importing & exporting keys, save keys to secure storage, and
                  private key recovery).
                </ListItem>
              </UnorderedList>
            </ProductCard>
            <ProductCard
              title="Smart Wallet"
              icon={require("/public/assets/product-pages/wallet-sdk/smart-wallet.png")}
              titleLink="https://portal.thirdweb.com/wallet/smart-wallet"
              linkCategory={TRACKING_CATEGORY}
            >
              <UnorderedList>
                <ListItem>
                  Build, launch, and manage your own smart contract wallets
                  easily using Solidity SDK, which includes 3 base starter
                  templates specific for{" "}
                  <TrackedLink
                    href="https://portal.thirdweb.com/wallet/smart-wallet"
                    category={TRACKING_CATEGORY}
                    textDecoration="underline"
                    color="blue.200"
                    target="_blank"
                  >
                    smart wallets
                  </TrackedLink>
                  . Easily deploy ERC-4337 smart contracts wallets for your
                  users. Programmable wallets that you can customize to your
                  application needs.
                </ListItem>
              </UnorderedList>
            </ProductCard>
          </SimpleGrid>
        </ProductSection>

        {/* Use cases */}
        <ProductSection py={{ base: 12, lg: 24 }}>
          <Heading
            as="h2"
            size="display.sm"
            fontWeight={700}
            textAlign="center"
            mb={{ base: 16, lg: 24 }}
          >
            What you can build with Wallet SDK
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
              isHighlighted={selectedTab === "invisible-wallet-experience"}
              title="Invisible wallet experience"
              minHeight="63px"
              width={{
                base: "full",
                md: "236px",
              }}
              onClick={() => {
                setSelectedTab("invisible-wallet-experience");
              }}
            />
            <HighlightedButton
              isHighlighted={selectedTab === "email-sign-in"}
              title="Email sign-in"
              minHeight="63px"
              width={{
                base: "full",
                md: "236px",
              }}
              onClick={() => {
                setSelectedTab("email-sign-in");
              }}
            />
            <HighlightedButton
              isHighlighted={selectedTab === "smart-wallet"}
              title="Smart wallet"
              minHeight="63px"
              width={{
                base: "full",
                md: "236px",
              }}
              onClick={() => {
                setSelectedTab("smart-wallet");
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

WalletSDK.pageId = PageId.WalletSDKLanding;

export default WalletSDK;
