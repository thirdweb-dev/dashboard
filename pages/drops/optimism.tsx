import { AspectRatio, Box, Flex } from "@chakra-ui/react";
import { OptimismGoerli } from "@thirdweb-dev/chains";
import { AppLayout } from "components/app-layouts/app";
import { FAQ } from "components/bear-market-airdrop/Blocks/FAQ";
import { StepsCard } from "components/dashboard/StepsCard";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import {
  Card,
  Heading,
  LinkButton,
  Text,
  TrackedLinkButton,
} from "tw-components";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useBalance,
  useContract,
  useNFTBalance,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useContractList } from "@3rdweb-sdk/react";
import { getDashboardChainRpc } from "lib/rpc";
import { ComponentWithChildren } from "types/component-with-children";
import { useMemo } from "react";
import { ChakraNextImage } from "components/Image";

const TRACKING_CATEGORY = "drops-optimism";

const DropsOptimismPage: ThirdwebNextPage = () => {
  const title = "Optimism Drop";
  const description =
    "thirdweb is giving back to brave builders that deploy contracts on Optimism Goerli.";

  const address = useAddress();
  const balance = useBalance();

  const nftContractAddress = "0x514A85Bcf5ce1a3735Fdb7F2f30B9fC757bf295C";
  const { contract } = useContract(nftContractAddress);
  const nftBalance = useNFTBalance(contract, address);
  const optimismGoerliQuery = useContractList(
    OptimismGoerli.chainId,
    getDashboardChainRpc(OptimismGoerli),
    address,
  );

  const hasMinted = BigNumber.from(nftBalance.data || 0).gt(0);

  const steps = [
    {
      title: "Connect your wallet",
      description: "Connect your wallet to see your eligibility",
      completed: !!address,
      children: <ConnectWallet />,
    },
    {
      title: "Get funds",
      description: "Claim testnet funds frorm the Superchain faucet",
      completed: BigNumber.from(balance.data?.value || 0).gt(0),
      children: (
        <LinkButton
          href="https://app.optimism.io/faucet"
          isExternal
          color="bgWhite"
          bgColor="bgBlack"
        >
          Visit Faucet
        </LinkButton>
      ),
    },
    {
      title: "Deploy a contract",
      description: "Deploy a smart contract on Optimism Goerli",
      completed: (optimismGoerliQuery?.data || [])?.length > 0,
      children: (
        <Flex gap={4}>
          <LinkButton
            href="/explore"
            isExternal
            noIcon
            color="bgWhite"
            bgColor="bgBlack"
          >
            Deploy with thirdweb
          </LinkButton>
          <LinkButton href="" isExternal color="bgBlack" bgColor="bgWhite">
            View Guide
          </LinkButton>
        </Flex>
      ),
    },
    {
      title: "Mint your NFT",
      description: "This action is free and gasless",
      completed: hasMinted,
      children: (
        <Web3Button
          contractAddress={nftContractAddress}
          action={(cntr) => cntr.erc721.claim(1)}
        >
          Claim
        </Web3Button>
      ),
    },
  ];

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
        <HomepageSection mt={16}>
          <Flex
            flexDir="column"
            gap={12}
            w={{ base: "100%", md: "70%" }}
            mx="auto"
          >
            <Flex flexDir="column" gap={2} textAlign="center" w="full">
              <Text
                bgGradient="linear(to-r, #FF0520, #FFA0AB)"
                bgClip="text"
                size="body.xl"
                fontWeight={700}
                letterSpacing="widest"
                textTransform="uppercase"
              >
                Optimism
              </Text>
              <Heading size="display.sm">Build on the Superchain.</Heading>
            </Flex>
            {!hasMinted ? (
              <StepsCard title="" steps={steps} />
            ) : (
              <NFTShowcase />
            )}
          </Flex>
        </HomepageSection>
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
              "https://api.defender.openzeppelin.com/autotasks/913c77e3-d1b2-40dc-90b7-7aefdc0634f1/runs/webhook/27f09cf3-a007-4674-b3e9-25e4de196562/YXKmKMpe56GZYsHLdtrmuj",
          },
        },
      }}
    >
      {children}
    </CustomSDKContext>
  );
};

const NFTShowcase = () => {
  const twitterIntentUrl = useMemo(() => {
    const textVariations = [
      `Proud to be a bear market builder. 💪
    
I just claimed a free NFT from @thirdweb

Claim yours at:`,
      `I'm a bear market builder and just got a free NFT from @thirdweb!
    
Join the party at:`,
      `Thrilled to be a bear market builder and claim my free NFT from @thirdweb!
    
Get yours now on:`,
      `Guess what? As a bear market builder, I got a free NFT from @thirdweb!
    
You can get one too at:`,
      `I'm a bear market builder, excited to announce I've claimed my free NFT from @thirdweb!
    
Now it's your turn at:`,
      `Being a bear market builder pays off! Now, I'm a proud owner of a free NFT from @thirdweb!
    
Find out how you can get yours at:`,
      `It's true - bear market builders like me get free NFTs from @thirdweb! 🎉
    
Claim yours today at:`,
      `Bear market builder grind pays off. Just got a free NFT from @thirdweb!
    
Secure yours at:`,
      `Feeling lucky to be a bear market builder and claim a free NFT from @thirdweb! 🎁
    
Don't miss out, go to:`,
      `Bear market builders rejoice! I just scored a free NFT from @thirdweb! 🌟
    
You can claim one too at:`,
    ];

    const url = new URL("https://twitter.com/intent/tweet");
    const randomTextIndex = Math.floor(Math.random() * textVariations.length);
    url.searchParams.append("text", textVariations[randomTextIndex]);
    url.searchParams.append("url", "https://thirdweb.com/drops/optimism");
    return url.href;
  }, []);

  return (
    <Flex direction="column" w="full" pb={16} overflowX="clip">
      <Box
        fontSize={{
          base: "2.5rem",
          lg: "3.5rem",
        }}
        position="relative"
        mb={5}
      >
        <ChakraNextImage
          src={require("public/assets/bear-market-airdrop/unboxedGif.gif")}
          alt="confetti1"
          position="absolute"
          top={{
            base: 0,
            lg: 0,
          }}
          left={{
            base: 0,
            lg: 0,
          }}
          width="30%"
        />
        <ChakraNextImage
          src={require("public/assets/bear-market-airdrop/unboxedGif.gif")}
          alt="confetti1"
          position="absolute"
          top={{
            base: 0,
          }}
          right={{
            base: 0,
            lg: 0,
          }}
          width="30%"
        />
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Heading size="title.xl" textAlign="center">
            Tasks successfully{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, #743F9E, #BFA3DA)"
              bgClip="text"
            >
              completed
            </Box>
          </Heading>
        </Flex>
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={4}
      >
        <Card p={0}>
          {/* <AspectRatio w="100%" ratio={1} overflow="hidden" rounded="xl">
             <NFTMediaWithEmptyState metadata={nft} width="100%" height="100%" />
          </AspectRatio>*/}
        </Card>
        <TrackedLinkButton
          href="/dashboard/contracts"
          isExternal
          py={3}
          px={6}
          bg="bgBlack"
          color="bgWhite"
          category={TRACKING_CATEGORY}
          label="see-contracts"
        >
          See your contracts
        </TrackedLinkButton>
        <Box textAlign="center">
          <TrackedLinkButton
            href={twitterIntentUrl}
            isExternal
            py={3}
            px={6}
            bg="bgWhite"
            color="bgBlack"
            category={TRACKING_CATEGORY}
            label="twitter-share"
          >
            <>
              <ChakraNextImage
                src={require("public/assets/bear-market-airdrop/socials/twitter.svg")}
                alt="twitter share"
                mr="2"
                bgClip="bgWhite"
              />
              Tell the world!
            </>
          </TrackedLinkButton>
        </Box>
      </Flex>
    </Flex>
  );
};
