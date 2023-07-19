import { getChainBySlug } from "@thirdweb-dev/chains";
import { paperWallet } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import {
  BlankDropAllowedNetworksSlugs,
  blankDropAllowedNetworksSlugs,
} from "components/blank-drop/allowedNetworks";
import { CustomProviderContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { BlankDropNetworkLogic } from "components/blank-drop/NetworkLogic";

const BlankDropNetworkPage: ThirdwebNextPage = () => {
  const slug = useSingleQueryParam("network");

  if (
    !slug ||
    !blankDropAllowedNetworksSlugs.includes(
      slug as BlankDropAllowedNetworksSlugs,
    )
  ) {
    return <></>;
  }

  const network = getChainBySlug(slug as string);

  const title = `Blank x thirdweb - $${network.name}}`;
  const description = `Claim this conmemorative NFT on ${network.name}.`;

  return (
    <CustomProviderContext
      activeChain={network.chainId}
      supportedWallets={[
        paperWallet({
          paperClientId: "9a2f6238-c441-4bf4-895f-d13c2faf2ddb",
        }),
      ]}
    >
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
      <BlankDropNetworkLogic slug={slug as BlankDropAllowedNetworksSlugs} />
    </CustomProviderContext>
  );
};

BlankDropNetworkPage.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>;
};

BlankDropNetworkPage.pageId = PageId.BlankDropNetwork;

export default BlankDropNetworkPage;
