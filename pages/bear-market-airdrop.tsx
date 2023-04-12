import { Flex } from "@chakra-ui/react";
import { Polygon } from "@thirdweb-dev/chains";
import { AppLayout } from "components/app-layouts/app";
import { FAQ } from "components/bear-market-airdrop/Blocks/FAQ";
import { Hero } from "components/bear-market-airdrop/Blocks/Hero";
import { PrizesDisplay } from "components/bear-market-airdrop/Blocks/Prizes";
import { Why } from "components/bear-market-airdrop/Blocks/Why";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const desiredChain = Polygon;

const BearMarketAirdropPage: ThirdwebNextPage = () => {
  const title = "Bear Market Builders Airdrop";
  const description =
    "thirdweb is giving back to brave builders that deployed contracts during the bear market, in 2022.";

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
              url: `${getAbsoluteUrl()}/api/og/bear-market-airdrop}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <Flex
        direction="column"
        maxW={{
          base: "100%",
          lg: "container.page",
        }}
        justifyContent="center"
        alignItems="center"
        mx="auto"
        mt={-8}
        pb={8}
        overflowX="hidden"
      >
        <Hero desiredChain={desiredChain} />
        <PrizesDisplay />
        <Why />
        <FAQ />
      </Flex>
    </>
  );
};

export default BearMarketAirdropPage;
BearMarketAirdropPage.pageId = PageId.BearMarketAirdrop;
BearMarketAirdropPage.getLayout = (page, props) => {
  return (
    <AppLayout
      layout={"custom-contract"}
      noSEOOverride
      dehydratedState={props.dehydratedState}
    >
      <CustomSDKContext
        desiredChainId={desiredChain.chainId}
        options={{
          gasless: {
            openzeppelin: {
              relayerUrl: process.env.NEXT_PUBLIC_OPENZEPELLIN_URL as string,
              relayerForwarderAddress:
                "0xEbc1977d1aC2fe1F6DAaF584E2957F7c436fcdEF",
            },
            experimentalChainlessSupport: true,
          },
        }}
      >
        {page}
      </CustomSDKContext>
    </AppLayout>
  );
};

interface BearMarketBuilderSDKProps {
  children: React.ReactNode;
  isPack?: boolean;
}

export const BearkMarketBuilderSDK: React.FC<BearMarketBuilderSDKProps> = ({
  children,
  isPack = false,
}) => {
  const forwarderAddress = isPack
    ? "0x4f247c69184ad61036EC2Bb3213b69F10FbEDe1Fs"
    : "0xEbc1977d1aC2fe1F6DAaF584E2957F7c436fcdEF";

  return (
    <CustomSDKContext
      desiredChainId={desiredChain.chainId}
      options={{
        gasless: {
          openzeppelin: {
            relayerUrl: process.env.NEXT_PUBLIC_OPENZEPELLIN_URL as string,
            relayerForwarderAddress: forwarderAddress,
          },
          experimentalChainlessSupport: true,
        },
      }}
    >
      {children}
    </CustomSDKContext>
  );
};
