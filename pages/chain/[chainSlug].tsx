import { Box, Center, Container, DarkMode, Flex } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Chain } from "@thirdweb-dev/chains";
import { ChainUiTabs__Page } from "chain-ui/tabs/ChainUiTabs__Page";
import color from "color";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { ChainIcon } from "components/icons/ChainIcon";
import { ExploreCategory, prefetchCategory } from "data/explore";
import { getDashboardChainRpc } from "lib/rpc";
import { StorageSingleton } from "lib/sdk";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import Vibrant from "node-vibrant";
import { PageId } from "page-id";
import { useMemo } from "react";
import { Heading, LinkButton, TrackedLink } from "tw-components";
import { getAllChainRecords } from "utils/allChainsRecords";
import { ThirdwebNextPage } from "utils/types";

type EVMContractProps = {
  chain: Chain;
  category: ExploreCategory;
  gradientColors: [string, string] | null;
};

export const CHAIN_CATEGORY = "chain_page";

const ChainPage: ThirdwebNextPage = ({
  chain,
  category,
  gradientColors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const sanitizedChainName = chain.name.replace("Mainnet", "").trim();

  const title = `${sanitizedChainName}: RPC and Chain Settings`;
  const description = `Use the best ${sanitizedChainName} RPC and add to your wallet. Discover the chain ID, native token, explorers, and ${
    chain.testnet && chain.faucets?.length ? "faucet options" : "more"
  }.`;

  const gradient = useMemo(() => {
    if (!gradientColors?.length) {
      return "#000";
    }
    return `linear-gradient(180deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`;
  }, [gradientColors]);

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
              url: `${getAbsoluteUrl()}/api/og/chain/${chain.chainId}`,
              width: 1200,
              height: 630,
              alt: `${sanitizedChainName} (${chain.nativeCurrency.symbol}) on thirdweb`,
            },
          ],
        }}
      />
      <Box
        w="full"
        py={{ base: 12, md: 20 }}
        mb={{ base: 2, md: 6 }}
        mt={-8}
        boxShadow="lg"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: gradient,
        }}
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          bg: "linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25))",
        }}
      >
        <DarkMode>
          <Container
            zIndex={2}
            position="relative"
            maxW="container.page"
            as={Flex}
            flexDirection="column"
            gap={6}
          >
            <Flex
              justify="space-between"
              as="header"
              gap={4}
              align="center"
              flexDirection={{ base: "column", md: "row" }}
            >
              <Flex
                gap={6}
                align="center"
                flexGrow={1}
                flexDir={{ base: "column", md: "row" }}
              >
                {chain.icon && (
                  <Center
                    boxSize={20}
                    overflow="hidden"
                    bg="linear-gradient(180deg, rgba(255,255,255, 0.8), rgba(255,255,255, 1), rgba(255,255,255, 0.8))"
                    border={`2px solid ${
                      gradientColors ? gradientColors[0] : "#fff"
                    }`}
                    borderRadius="full"
                    p={3}
                  >
                    <ChainIcon ipfsSrc={chain.icon?.url} size={128} />
                  </Center>
                )}
                <Flex
                  direction="column"
                  gap={3}
                  alignItems={{ base: "center", md: "flex-start" }}
                >
                  <Heading size="title.lg" as="h1">
                    {sanitizedChainName}{" "}
                    {sanitizedChainName.length > 10 && <br />}
                    <Box
                      as="span"
                      opacity={0.6}
                      fontWeight={400}
                      fontSize="0.8em"
                    >
                      ({chain.nativeCurrency.symbol})
                    </Box>
                  </Heading>
                </Flex>
              </Flex>
              <ClientOnly ssr={null}>
                <LinkButton
                  as={TrackedLink}
                  {...{
                    category: CHAIN_CATEGORY,
                  }}
                  background="bgBlack"
                  color="bgWhite"
                  _hover={{
                    opacity: 0.8,
                  }}
                  href="/explore"
                >
                  Deploy to {chain.name}
                </LinkButton>
              </ClientOnly>
            </Flex>
          </Container>
        </DarkMode>
      </Box>

      <Container
        maxW="container.page"
        py={6}
        as={Flex}
        flexDirection="column"
        gap={10}
      >
        <ChainUiTabs__Page chain={chain} category={category} />
      </Container>
    </>
  );
};

export default ChainPage;
ChainPage.pageId = PageId.ChainLanding;
ChainPage.getLayout = (page, props) => {
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

// server side ---------------------------------------------------------------

const CHAIN_PAGE_CONTRACTS_CATEGORY = {
  id: "chain_page",
  name: "",
  description: "",
  contracts: [
    "thirdweb.eth/DropERC721",
    "thirdweb.eth/Marketplace",
    "thirdweb.eth/TokenERC721",
    "thirdweb.eth/DropERC1155",
    "thirdweb.eth/TokenERC20",
    "thirdweb.eth/TokenERC1155",
  ],
} as const;

const { slugToChain, chainIdToChain } = getAllChainRecords();
export const getStaticProps: GetStaticProps<EVMContractProps> = async (ctx) => {
  let chainSlug = ctx.params?.chainSlug;

  if (!chainSlug) {
    return {
      notFound: true,
    };
  }
  if (Array.isArray(chainSlug)) {
    chainSlug = chainSlug[0];
  }

  if (chainSlug === "localhost") {
    return {
      notFound: true,
    };
  }

  // if the chain slug is a chain id, redirect to the chain slug
  if (chainSlug in chainIdToChain) {
    return {
      redirect: {
        destination: `/${chainIdToChain[parseInt(chainSlug)].slug}`,
        permanent: false,
      },
    };
  }

  const chain = chainSlug in slugToChain ? slugToChain[chainSlug] : null;
  if (!chain) {
    return {
      notFound: true,
    };
  }
  let gradientColors = null;
  try {
    gradientColors = await getGradientColorStops(chain);
  } catch (e) {
    // ignore
  }

  const chainRpc = getDashboardChainRpc(chain);
  // overwrite with the dashboard chain RPC (add the api key)
  if (chainRpc) {
    chain.rpc = [chainRpc];
  } else {
    chain.rpc = [];
  }

  const category = CHAIN_PAGE_CONTRACTS_CATEGORY;
  const queryClient = new QueryClient();
  if (category) {
    await prefetchCategory(category, queryClient);
  }

  return {
    props: {
      chain,
      category,
      gradientColors,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

async function getGradientColorStops(
  chain: Chain,
): Promise<[string, string] | null> {
  if (!chain.icon) {
    return null;
  }
  const chainIconUrl = StorageSingleton.resolveScheme(chain.icon.url);
  const data = await fetch(chainIconUrl);
  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const palette = await new Vibrant(buffer).getPalette();
  const colorStops = Object.values(palette)
    .map((color_) => {
      return color_?.hex;
    })
    .filter(Boolean) as string[];
  if (colorStops.length === 0) {
    return null;
  }
  const firstAndLast = [colorStops[0], colorStops[colorStops.length - 1]] as [
    string,
    string,
  ];

  const firstColorRGB = color(firstAndLast[0]).rgb().array();
  // if all rgb values are *close* to the same count it as grayscale
  if (firstColorRGB.every((rgb) => Math.abs(rgb - firstColorRGB[0]) < 10)) {
    return null;
  }
  const lastColorRGB = color(firstAndLast[1]).rgb().array();
  // if all rgb values are *close* to the same count it as grayscale
  if (lastColorRGB.every((rgb) => Math.abs(rgb - lastColorRGB[0]) < 10)) {
    return null;
  }

  return firstAndLast;
}
