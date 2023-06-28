import { useBreakpointValue } from "@chakra-ui/react";
import { LandingHero } from "components/landing-pages/hero";
import { LandingLayout } from "components/landing-pages/layout";
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
    </LandingLayout>
  );
};

Loyalty.pageId = PageId.SolutionsLoyalty;

export default Loyalty;
