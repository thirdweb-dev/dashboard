import { Container, Flex } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Card } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingGuidesShowcase } from "components/landing-pages/guide-showcase";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingSectionHeading } from "components/landing-pages/section-heading";

const TRACKING_CATEGORY = "checkout-landing";

const CASE_STUDIES = [
  {
    title: "Balmain x Space Runners",
    description:
      "Pushed the boundaries of fashion and the Metaverse with a collection of limited-edition sneakers linked to a unique Balmain x Space Runners Unicorn NFT.",
    image: require("public/assets/product-pages/checkout/case-study-1.png"),
    link: "https://blog.withpaper.com/how-space-runners-and-balmain-are-shaping-the-future-of-fashion-with-nfts/",
  },
  {
    title: "Ostrich",
    description:
      "Used NFTs to crowdfund their new fintech startup, raising more money with a fiat checkout solution.",
    image: require("public/assets/product-pages/checkout/case-study-2.png"),
    link: "https://blog.withpaper.com/how-ostrich-crowdfunded-their-startup-with-the-help-of-paper/",
  },
];

const CheckoutLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Buy NFTs with Credit Card Checkout",
        description:
          "Let users buy digital assets with a credit card, via a one-click checkout flow. Onboard anyone, even if they've never create a wallet.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/checkout.png`,
              width: 1200,
              height: 630,
              alt: "Buy NFTs with Credit Card Checkout",
            },
          ],
        },
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <LandingHeroWithSideImage
          miniTitle="Checkout"
          title="One-click NFT checkout flows"
          titleWithGradient="with just a credit card"
          subtitle="Let users buy digital assets with a credit card, via a one-click checkout flow. Onboard anyone, even if they've never create a wallet or bought crypto before."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://withpaper.com/sign-up"
          contactUsTitle="Book Demo"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          image={require("public/assets/product-pages/hero/desktop-hero-checkout.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-checkout.png")}
        />

        <LandingGridSection title={<></>}>
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-2.svg")}
            title="Available worldwide & for all payment methods"
            description="Accept credit and debit cards, Apple Pay, Google Pay, iDEAL, and cross-chain crypto (with built-in bridging & swapping). Plus, the option to bring your own payment processor. Available in 190+ countries, all 50 U.S. states, with 10+ currencies and languages supported."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-7.png")}
            title="Wallets for those without them"
            description="Customers don't need wallets to buy your NFTs: we'll create non-custodial wallets for them to store their NFTs securely."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-1.png")}
            title="Enterprise-grade security"
            description="Fully compliant & enterprise-ready for ultimate peace of mind — with built-in fraud & AML detection and 90%+ authorization rates, out of the box."
          />
        </LandingGridSection>
        <LandingGridSection title={<></>} desktopColumns={2}>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Shareable Checkout Links"
              description="Public, reusable URLs that allows buyers to complete a purchase with Paper's prebuilt checkout experience."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/account-abstraction.png")}
              title="Checkout Elements"
              description="Portions of the checkout experience broken down into components for complete customizability. You can embed Checkout Elements onto any page and create a fully white-labelled experience for your customers."
            />
          </Card>
        </LandingGridSection>

        <LandingGridSection
          title={
            <LandingSectionHeading
              title="What You Can Build"
              blackToWhiteTitle=""
            />
          }
        >
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Digital Collectibles"
              description="Onboard mainstream users onto Web3 by building an NFT drop which you can purchase using your credit card."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Marketplaces"
              description="Build a marketplace where users can buy and sell digital assets using traditional payment methods."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Fundraising"
              description="Make it easy for your users to donate to charitable causes, or fund your business idea with digital collectibles which they can purchase using their credit cards."
            />
          </Card>
        </LandingGridSection>

        <LandingGuidesShowcase
          title="The best web3 apps use thirdweb's smart contract tools"
          category={TRACKING_CATEGORY}
          description="Seamlessly integrate your smart contracts into any app so you can focus on building a great user experience."
          guides={CASE_STUDIES}
          caseStudies
        />

        <LandingEndCTA
          title="Start building"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://withpaper.com/sign-up"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

CheckoutLanding.pageId = PageId.CheckoutLanding;

export default CheckoutLanding;
