import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useClaimBlankDrop } from "@3rdweb-sdk/react/hooks/useClaimBlankDrop";
import { Flex } from "@chakra-ui/react";
import { getChainBySlug } from "@thirdweb-dev/chains";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import {
  AllowedNetworksSlugs,
  allowedNetworksSlugs,
} from "components/blank-drop/allowedNetworks";
import { Aurora } from "components/homepage/Aurora";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { Button } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const BlankDropMumbaiPage: ThirdwebNextPage = () => {
  const address = useAddress();
  const claimDrop = useClaimBlankDrop();
  const slug = useSingleQueryParam("network");

  console.log(claimDrop.error);

  if (!allowedNetworksSlugs.includes(slug as AllowedNetworksSlugs)) {
    return <></>;
  }

  const network = getChainBySlug(slug as string);

  const title = `Blank x thirdweb - $${network.name}}`;
  const description = `Claim this conmemorative NFT on ${network.name}.`;

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
        {address && slug && (
          <Flex>
            <Button onClick={() => claimDrop.mutate(slug)}>Claim</Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};

BlankDropMumbaiPage.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>;
};

BlankDropMumbaiPage.pageId = PageId.BlankDropMumbai;

export default BlankDropMumbaiPage;
