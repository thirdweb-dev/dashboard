import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { Flex } from "@chakra-ui/react";
import { Mumbai } from "@thirdweb-dev/chains";
import { AppLayout } from "components/app-layouts/app";
import { Aurora } from "components/homepage/Aurora";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const activeChain = Mumbai;

const BlankDropMumbaiPage: ThirdwebNextPage = () => {
  const title = "Blank x thirdweb - Mumbai";
  const description = "Claim this conmemorative NFT on Mumbai.";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              // TODO: Replace this with the correct image
              url: `${getAbsoluteUrl()}/assets/og-image/bear-market-airdrop.png`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        mt={-8}
        pb={8}
        overflowX="hidden"
      >
        <HomepageSection>
          <Aurora
            pos={{ top: "0%", left: "50%" }}
            size={{ width: "1400px", height: "1400px" }}
            color="hsl(289deg 78% 30% / 35%)"
          />
        </HomepageSection>
        <ConnectWallet />
      </Flex>
    </>
  );
};

BlankDropMumbaiPage.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>;
};

BlankDropMumbaiPage.pageId = PageId.BlankDropMumbai;

export default BlankDropMumbaiPage;
