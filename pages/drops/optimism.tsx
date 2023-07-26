import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { FAQ } from "components/bear-market-airdrop/Blocks/FAQ";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { ComponentWithChildren } from "types/component-with-children";
import { OptimismHero } from "components/drops/OptimismHero";

const DropsOptimismPage: ThirdwebNextPage = () => {
  const title = "Optimism Drop";
  const description =
    "thirdweb is giving back to brave builders that deploy contracts on Optimism Goerli.";

  return (
    <DropsOptimismSDK chainId={420}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              // TODO: Update og-image
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
        <OptimismHero />
        <FAQ />
      </Flex>
    </DropsOptimismSDK>
  );
};

export default DropsOptimismPage;
DropsOptimismPage.pageId = PageId.DropsOptimism;
DropsOptimismPage.getLayout = (page, props) => {
  return (
    <AppLayout
      layout={"custom-contract"}
      noSEOOverride
      dehydratedState={props.dehydratedState}
    >
      {page}
    </AppLayout>
  );
};

interface DropsOptimismSDKProps {
  chainId: number;
}

export const DropsOptimismSDK: ComponentWithChildren<DropsOptimismSDKProps> = ({
  chainId,
  children,
}) => {
  return (
    <CustomSDKContext
      desiredChainId={chainId}
      options={{
        gasless: {
          openzeppelin: {
            relayerUrl:
              "https://api.defender.openzeppelin.com/autotasks/6938e426-037f-4e79-b603-d94d04459a19/runs/webhook/27f09cf3-a007-4674-b3e9-25e4de196562/DQyoG2hpDWpTe1rFufV6Vu",
          },
        },
      }}
    >
      {children}
    </CustomSDKContext>
  );
};
