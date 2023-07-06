import { Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import { LandingHero } from "components/landing-pages/hero";
import { LandingIconSection } from "components/landing-pages/icon-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingMainImage } from "components/landing-pages/main-image";
import { LandingShowcaseImage } from "components/landing-pages/showcase-image";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "loyalty";

const CASE_STUDIES = [
  {
    title: "Paper",
    description:
      "Used thirdweb's embedded minting SDK to launch their Quickstart product allowing non-crypto customers to launch an NFT collection in two steps.",
    image: require("public/assets/solutions-pages/minting/paper-minting.png"),
    link: "https://blog.withpaper.com/deploy-thirdweb-nft-contracts-using-paper/",
  },
  {
    title: "Polygon 0xmint",
    description:
      "Integrated thirdweb's minting solution into the 0xmint minting API to allow developers to launch new NFT collections.",
    image: require("public/assets/solutions-pages/minting/polygon-0xmint.png"),
    link: "https://0xmint.io/",
  },
];

const Loyalty: ThirdwebNextPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
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
        ctaLink="https://portal.thirdweb.com/minting/getting-started/deploying-smart-contract"
        gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        inPartnershipWith={require("public/assets/solutions-pages/commerce/shopify.png")}
        /*         image={require("public/assets/solutions-pages/minting/hero.png")} */
      />
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <LandingIconSection
          title={
            <>
              Web3 Loyalty Programs. <br />
              Made easy.
            </>
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
        </LandingIconSection>
        <LandingMainImage
          blackToWhiteTitle="Products"
          title="Reimagine loyalty programs"
          image={require("public/assets/solutions-pages/minting/hero.png")}
        />
      </Container>
    </LandingLayout>
  );
};

Loyalty.pageId = PageId.SolutionsLoyalty;

export default Loyalty;
