import { GuidesShowcase } from "../components/product-pages/common/GuideShowcase";
import { ProductSection } from "../components/product-pages/common/ProductSection";
import { YoutubeEmbed } from "../components/video-embed/YoutubeEmbed";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Heading } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const GUIDES = [
  {
    title: "How to verify a Custom Contract on Etherscan using the dashboard",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/12/verification.png",
    link: "https://blog.thirdweb.com/guides/how-to-verify-a-custom-contract-on-etherscan/",
  },
  {
    title: "How to Add Permissions to Your Smart Contract in Solidity",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/This-is-the-one--13-.png",
    link: "https://blog.thirdweb.com/guides/how-to-add-permissions-to-your-smart-contract-contractkit/",
  },
  {
    title: "How to Create an NFT Drop on Solana without writing any code",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/This-is-the-one--12-.png",
    link: "https://blog.thirdweb.com/guides/how-to-create-an-nft-collection-on-solana-without-code/",
  },
];

const TRACKING_CATEGORY = "dashboards";

const WalletSDK: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Wallet SDK",
        description: "Build any wallet experience.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/dashboards.png`,
              width: 2334,
              height: 1260,
              alt: "thirdweb Wallet SDK",
            },
          ],
        },
      }}
    >
      <Hero
        trackingCategory={TRACKING_CATEGORY}
        name="Wallet SDK"
        title="Build any wallet experience."
        description="Wallet SDK makes it easy for devs to build any wallet experience. Integrate with any existing wallet provider (non-custodial, custodial, smart wallets, and email wallets), build your own fully featured custom wallet solutions, and create on-chain smart wallets."
        buttonText="Get started"
        buttonLink="/dashboard"
        image={require("public/assets/product-pages/wallet-sdk/hero.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)"
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
            We’ve made the entire web3 wallet development simple— from
            integrating, building to managing wallets. Out-of-the-box UI
            components for ConnectWallet button. SDK hooks to connect with any
            wallet providers with our Connectors. Ready-to-deploy starter bases
            for smart wallets. Fully managed account abstraction infrastructure
            services.
          </ProductCard>
          <ProductCard
            title="Composable"
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
          >
            Use Wallet SDK as a turnkey out-of-the box solution or bring your
            own provider/solutions to complement with parts of our Wallet SDK.
          </ProductCard>
        </SimpleGrid>

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
            <ProductCard
              title="What can you build with Wallet SDK?"
              icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            ></ProductCard>
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
          description="Check out our guides to learn how to use Dashboard"
          guides={GUIDES}
        />
      </Hero>
    </ProductPage>
  );
};

WalletSDK.pageId = PageId.WalletSDKLanding;

export default WalletSDK;
