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
import { Heading, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const GRIDS = {
  "invisible-wallet-experience": (
    <SimpleGrid columns={12} spacing={12} mt={24}>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="1">
          User logs into mobile web3 game and select “continue as Guest”.
          <br />
          <br />
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
          User receives in-game assets as they play game
          <br />
          <br />
          (Initially, user does not have to be aware of “digital assets”
          ownership)
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="4">
          After user accumulates in-game assets they receive a message to
          upgrade their local wallet to export assets into personal
          non-custodial wallet
          <br />
          <br />
          (User only needs to set up wallets after they have invested time in
          game)
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
          User logs into app with their email address and confirms email with a
          one-time 6 digit email verification code.
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="2">
          Developer subsidizes gas costs with Gasless Relayer. Dev generates a
          local wallet on the backend on behalf of the user. Key is stored
          across device and email.
        </ProductValueWithHighlight>
      </GridItem>
      <GridItem colSpan={{ base: 8, md: 3 }} mt={12}>
        <ProductValueWithHighlight circleLabel="3">
          User uses app and selects “claim NFT” to get NFT
          <br />
          <br />
          (no wallet connection or transactions signing required)
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
      "Programmable wallets with on-chain transaction rules that can be upgraded over time",
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
        title="Build any wallet experience."
        description="Wallet SDK makes it easy for devs to build for any wallet experience, from onboarding web2 users with an invisible wallet experience to programmable smart wallets for web3 natives."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/wallet"
        image={require("public/assets/product-pages/wallet-sdk/hero.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)"
        imageHeight="650px"
        secondaryButton={{
          text: "Contact Us",
          link: "https://thirdweb.typeform.com/to/Q93CVgUc",
        }}
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
          py={{ base: 12, lg: 24 }}
        >
          <ProductCard
            title="Complete"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
          >
            Whether you’re building for web3 natives or you want to onboard web2
            users, we have wallet solutions that will match your use case.
            Support for non-custodial wallets, custodial wallets, smart contract
            wallets, and email wallets. Cross-platform support (Unity,
            ReactNative).
          </ProductCard>
          <ProductCard
            title="Simple"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
          >
            We&apos;ve made the entire web3 wallet development workflow simple.
            (delete: from integrating, building to managing wallets)
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
              provider/solutions to complement with parts of our{" "}
              <TrackedLink
                href="https://portal.thirdweb.com/wallet/smart-wallet"
                category={TRACKING_CATEGORY}
                textDecoration="underline"
                color="blue.200"
                target="_blank"
              >
                Wallet SDK
              </TrackedLink>
              .
            </Text>
          </ProductCard>
        </SimpleGrid>

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
              icon={require("/public/assets/product-pages/deploy/hero-icon-2.png")}
              titleLink="https://portal.thirdweb.com/unity/connectwalletnative"
              linkCategory={TRACKING_CATEGORY}
            >
              <UnorderedList>
                <ListItem>
                  Out-of-the-box UI components to easily integrate into your
                  apps and games with cross-platform support (Unity,
                  ReactNative).
                </ListItem>
                <ListItem mt={4}>
                  Enable end users to connect with popular wallets (170+
                  supported) across all types of wallets. Includes native Safe
                  multi-sig support.
                </ListItem>
              </UnorderedList>
            </ProductCard>
            <ProductCard
              title="Local Wallet"
              icon={require("/public/assets/product-pages/deploy/hero-icon-2.png")}
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
              icon={require("/public/assets/product-pages/deploy/hero-icon-2.png")}
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
                  . Base template follows account abstraction standard (fully
                  compliant ERC-4337).
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
            Build for any use case with Wallet SDK
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
