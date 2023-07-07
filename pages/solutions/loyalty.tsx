import { Container, Flex } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHero } from "components/landing-pages/hero";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingMainImage } from "components/landing-pages/main-image";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { PageId } from "page-id";
import { Card, Heading } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "loyalty";

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
            description="Allow new customers to discover your brand by enabling customers to earn and redeem points from any company within your loyalty alliance ecosystem."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-2.png")}
            title="Increase customer lifetime value"
            description="Create communities and turn your customers into your biggest advocates by sending digital collectibles that they can own, trade, and redeem."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-3.png")}
            title="Unlock new revenue streams"
            description="Generate recurring revenue from membership subscriptions, sell digital assets from your storefront, and collect royalty fees from traded loyalty points."
          />
        </LandingGridSection>
        <LandingMainImage
          blackToWhiteTitle="Products"
          title="Reimagine loyalty programs"
          image={require("/public/assets/solutions-pages/loyalty/spider.png")}
          mobileImage={require("/public/assets/solutions-pages/loyalty/spider-mobile.png")}
        />
        {/*         <LandingDynamicSelector
          title="What you can build."
          blackToWhiteTitle="Use-Cases"
        /> */}
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
              description="A few lines of code to enable web3 use cases, including: loyalty program, digital coupons, memberships, and certificate of authenticity."
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
        <LandingEndCTA
          title="Build the future of loyalty programs"
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
