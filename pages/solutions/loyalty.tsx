import { Container, Flex } from "@chakra-ui/react";
import { LandingDynamicSelector } from "components/landing-pages/dynamic-selector";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHero } from "components/landing-pages/hero";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingMainImage } from "components/landing-pages/main-image";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { Guide } from "components/landing-pages/types";
import { GuideCard } from "components/product-pages/common/GuideCard";
import { PageId } from "page-id";
import { Card, Heading } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "loyalty";

const GUIDES: Guide[] = [
  {
    title: "Create a Shopify theme with thirdweb",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/03/Create-a-web3-Shopify-theme-with-thirdweb.png",
    link: "https://blog.thirdweb.com/guides/create-a-shopify-theme-with-thirdweb/",
  },
  {
    title: "How to Create a Token Gated Website on Shopify using thirdweb",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/03/Create-a-token-gated-Shopify-store-2.png",
    link: "https://blog.thirdweb.com/guides/token-nft-gated-shopify-website-thirdweb/",
  },
  {
    title: "Generate Shopify Discount Codes For NFT Holders",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/03/Generate-Shopify-Discount-Codes-for-NFT-Holders.png",
    link: "https://blog.thirdweb.com/guides/generate-shopify-discount-codes-for-nft-holders/",
  },
];

const Loyalty: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      seo={{
        title: "Loyalty",
        description:
          "Activate new customer experiences that go beyond traditional tiered loyalty programs.",
      }}
    >
      <LandingHero
        title="Revitalize your"
        titleWithGradient="loyalty programs."
        subtitle="Activate new customer experiences that go beyond traditional tiered loyalty programs."
        trackingCategory={TRACKING_CATEGORY}
        ctaLink="https://thirdweb.com/explore"
        gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        inPartnershipWith={require("public/assets/solutions-pages/commerce/shopify.png")}
        image={require("public/assets/solutions-pages/loyalty/hero.png")}
        mobileImage={require("public/assets/solutions-pages/loyalty/hero-mobile.png")}
      />
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <LandingGridSection
          title={
            <Heading size="label.2xl" color="white">
              Web3 Loyalty Programs. <br />
              Made easy.
            </Heading>
          }
        >
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-1.png")}
            title="Grow your customer base"
            description="Partner with other brands' loyalty programs to allow new customers to discover your brand. Enable your loyalty points to be ported and redeemed through other brands."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-2.png")}
            title="Deepen customer relationships "
            description="Foster more brand loyalty by giving customers ownership of unique branded digital rewards. Increase customer lifetime value by providing more flexibility with loyalty programs."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-3.png")}
            title="Unlock new revenue streams"
            description="Generate recurring revenue from membership subscriptions. Sell branded digital assets and collect royalty fees from points and memberships that are traded between customers."
          />
        </LandingGridSection>
        <LandingMainImage
          blackToWhiteTitle="Products"
          title="Reimagine loyalty programs"
          image={require("/public/assets/solutions-pages/minting/what-can-you-build.png")}
          mobileImage={require("/public/assets/solutions-pages/minting/what-can-you-build-mobile.png")}
        />
        <LandingDynamicSelector
          title="What you can build."
          blackToWhiteTitle="Use-Cases"
        />
        <LandingGridSection
          title={
            <LandingSectionHeading
              title="CommerceKit."
              blackToWhiteTitle="Features"
            />
          }
        >
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/loyalty/icon-4.png")}
              title="Commerce Web3 SDK"
              description="Integrate loyalty contracts into your store with just a few lines of code."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/loyalty/icon-5.png")}
              title="Email Wallet"
              description="Enable familiar web2-like sign in flows to increase user onboarding rates."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/loyalty/icon-6.png")}
              title="Contracts"
              description="Loyalty contracts with metadata that stores specific membership details. Token-bound accounts."
            />
          </Card>
        </LandingGridSection>
        <LandingGridSection
          title={
            <LandingSectionHeading
              title="Let's get started."
              blackToWhiteTitle="Guides"
            />
          }
        >
          {GUIDES.map((guide, idx) => (
            <GuideCard
              key={guide.title}
              category={TRACKING_CATEGORY}
              index={idx}
              {...guide}
            />
          ))}
        </LandingGridSection>
        <LandingEndCTA
          title="Kickstart your loyalty program"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://thirdweb.com/explore"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

Loyalty.pageId = PageId.SolutionsLoyalty;

export default Loyalty;
