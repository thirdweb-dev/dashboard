import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import {
  Arbitrum,
  Avalanche,
  Linea,
  Mumbai,
  Polygon,
} from "@thirdweb-dev/chains";
import { AppLayout } from "components/app-layouts/app";
import { FAQ } from "components/bear-market-airdrop/Blocks/FAQ";
import { Hero } from "components/bear-market-airdrop/Blocks/Hero";
import { PrizesDisplay } from "components/bear-market-airdrop/Blocks/Prizes";
import { Why } from "components/bear-market-airdrop/Blocks/Why";
import { Aurora } from "components/homepage/Aurora";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text } from "tw-components";
import { BlankDropSelectNetwork } from "components/blank-drop/SelectNetwork";

const title = "Blank Drop";
const description = "Claim this conmemorative NFT.";

const BlankDropPage: ThirdwebNextPage = () => {
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
        overflow="hidden"
      >
        <HomepageSection>
          <Aurora
            pos={{ top: "0%", left: "50%" }}
            size={{ width: "1400px", height: "1400px" }}
            color="hsl(289deg 78% 30% / 35%)"
          />
          <Flex
            gap={8}
            flexDir="column"
            justifyContent="center"
            h="full"
            mt={16}
          >
            <Heading
              bgGradient="linear(to-r, #743F9E, #BFA3DA)"
              bgClip="text"
              size="display.md"
              display="inline-block"
              textAlign="center"
            >
              thirdweb x Blank
            </Heading>
            <Text size="body.xl" textAlign="center">
              Join us on the road to mass adoption.
            </Text>
            <Text size="body.xl" textAlign="center">
              To celebrate our ***, we invite you to mint a free conmemorative
              NFT on the network of your choice.
            </Text>
            <Flex flexDir="column">
              <Text size="body.xl" textAlign="center">
                • Open Edition
              </Text>
              <Text size="body.xl" textAlign="center">
                • Free, gasless
              </Text>
              <Text size="body.xl" textAlign="center">
                • Open for the next 48 hours
              </Text>
              <Text size="body.xl" textAlign="center">
                • No roadmap, no utility
              </Text>
            </Flex>
            <BlankDropSelectNetwork />
          </Flex>
        </HomepageSection>
      </Flex>
    </>
  );
};

BlankDropPage.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>;
};

BlankDropPage.pageId = PageId.BlankDrop;

export default BlankDropPage;
