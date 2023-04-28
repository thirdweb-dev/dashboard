import {
  Box,
  Flex,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "mobile";

const MOBILE_GUIDES = [
  {
    title: "Start Building Web3 Mobile Apps",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/DreamWorks-Launches-NFT-Avatars-with-Gala-s-VOX---thirdweb-Case-Study-2.png",
    link: "https://blog.thirdweb.com/guides/getting-started-with-react-native-and-thirdweb/",
  },
];

const Mobile: ThirdwebNextPage = () => {
  return (
    <ProductPage
      accentColor="rgba(22,82,240,.75)"
      seo={{
        title:
          "thirdweb Mobile | SDKs, Smart Contracts & Dev Tools for Web3 Games",
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
        name="Mobile"
        title="Build full-stack web3 mobile apps"
        description={
          <>
            An all-in-one solution to build complete web3 mobile experiences,
            from selecting a wide range of digital asset types and minting
            strategies to creating wallets and credit card checkout.
          </>
        }
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/mobile"
        gradient="linear-gradient(145.96deg, rgba(205, 0, 238, 1) 5.07%, #1652F0 100%)"
        image={require("public/assets/solutions-pages/mobile/hero.png")}
        type="Solutions"
        trackingCategory={TRACKING_CATEGORY}
        secondaryButton={{
          text: "Request demo",
          link: "https://thirdweb.typeform.com/tw-solutions",
        }}
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
            Streamline web3 development by consolidating multiple libraries,
            vendors, and contract interactions into a single SDK. Out-of-the-box
            UI components that has been optimized for mobile experience,
            including “Connect Wallet” button which enables users to connect to
            popular wallets (170+ supported).
          </ProductCard>
          <ProductCard
            title="Flexible"
            icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
          >
            <span>
              Mobile SDK supports React Native, which lets devs build apps for
              both iOS and Android. More native languages support coming soon.
            </span>
          </ProductCard>
          <ProductCard
            title="Complete"
            icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
          >
            <span>
              Build complete web3 mobile app experiences, from selecting a wide
              range of digital asset types and minting strategies to creating
              wallets and credit card checkout.
            </span>
          </ProductCard>
        </SimpleGrid>
      </Hero>

      <ProductSection>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
          py={{ base: 12, md: 24 }}
        >
          <ProductLearnMoreCard
            title="Build"
            category={TRACKING_CATEGORY}
            description="A fully featured React Native SDK that supports tokens, NFTs and
            marketplaces. Unity Mobile SDK support (iOS, Android). Wallet
            SDK for integrating embeddable wallet and payment services that
            allow customers to easily register with email/social login and
            purchase with a credit card."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            href="https://portal.thirdweb.com/gamingkit"
          />
          <ProductLearnMoreCard
            title="Launch"
            category={TRACKING_CATEGORY}
            description="Deploy web3 games to any EVM chain (700+). Seamless contract deployment workflow designed for web3 dev teams to easily collaborate."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
            href="https://portal.thirdweb.com/gamingkit"
          />
          <ProductLearnMoreCard
            title="Manage"
            category={TRACKING_CATEGORY}
            description="A single dashboard to configure your contracts and monitor contract activity for all your mobile app’s deployed contracts. Get insights on transaction count, volume, gas spend per contract to inform your mobile app development."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
            href="https://portal.thirdweb.com/dashboard"
          />
        </SimpleGrid>
      </ProductSection>

      <ProductSection overflow="hidden">
        <Flex flexDir="column" py={24} align="center" gap={12}>
          <Heading as="h2" size="display.sm" textAlign="center" mb={12}>
            Build full-stack web3 mobile apps across multiple use cases
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            <ProductCard
              title="Gaming"
              icon={require("/public/assets/solutions-pages/commerce/hero-icon-2.png")}
            >
              <UnorderedList>
                <ListItem>
                  <Text size="body.lg">
                    Add web3 assets and experiences into casual and social games
                  </Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg" my={2}>
                    Incorporate blockchain based digital collectibles
                  </Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg">Access web3 marketplaces</Text>
                </ListItem>
              </UnorderedList>
            </ProductCard>
            <ProductCard
              title="Content & Streaming"
              icon={require("/public/assets/solutions-pages/commerce/hero-icon-4.png")}
            >
              <UnorderedList>
                <ListItem>
                  <Text size="body.lg">
                    Provide token gated access to content
                  </Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg" my={2}>
                    Reward user engagement with digital collectibles
                  </Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg">
                    Create a new platform for creators to engage and monetize
                    their audiences{" "}
                  </Text>
                </ListItem>
              </UnorderedList>
            </ProductCard>
            <ProductCard
              title="Mobile e-commerce"
              icon={require("/public/assets/solutions-pages/commerce/hero-icon-1.png")}
            >
              <UnorderedList>
                <ListItem>
                  <Text size="body.lg">Sell digital collectibles</Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg" my={2}>
                    Launch customer loyalty reward programs
                  </Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg">
                    Provide token gated access and discounts for merchandise and
                    other products
                  </Text>
                </ListItem>
              </UnorderedList>
            </ProductCard>
            <ProductCard
              title="Events and Ticketing"
              icon={require("/public/assets/solutions-pages/commerce/hero-icon-3.png")}
            >
              <UnorderedList>
                <ListItem>
                  <Text size="body.lg">NFT tickets</Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg" my={2}>
                    Claimable digital collectibles for event attendees
                  </Text>
                </ListItem>
                <ListItem>
                  <Text size="body.lg">
                    Exclusive event/ticket access via token gating
                  </Text>
                </ListItem>
              </UnorderedList>
            </ProductCard>
          </SimpleGrid>
        </Flex>
      </ProductSection>

      <GuidesShowcase
        title="The best web3 mobile apps are built using thirdweb"
        category={TRACKING_CATEGORY}
        description=""
        solution="Mobile"
        guides={MOBILE_GUIDES}
        caseStudies
      />

      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, var(--product-accent-color) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />
    </ProductPage>
  );
};

Mobile.pageId = PageId.SolutionsMobile;

export default Mobile;
