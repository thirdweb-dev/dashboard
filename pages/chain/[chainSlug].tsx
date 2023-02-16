import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  GridItem,
  GridItemProps,
  Icon,
  IconButton,
  SimpleGrid,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Chain, allChains } from "@thirdweb-dev/chains";
import { useAddress } from "@thirdweb-dev/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { ChainIcon } from "components/icons/ChainIcon";
import { useTrack } from "hooks/analytics/useTrack";
import {
  useConfiguredChainsRecord,
  useUpdateConfiguredChains,
} from "hooks/chains/configureChains";
import { getDashboardChainRpc } from "lib/rpc";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { useMemo } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { Button, Card, Heading, Text, TrackedLink } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";
import { getAllChainRecords } from "utils/allChainsRecords";
import { ThirdwebNextPage } from "utils/types";

type EVMContractProps = {
  chain: Chain;
};

const CHAIN_CATEGORY = "chain_page";

type ChainStats = {
  latency: number;
  blockNumber: number;
};

function useChainStats(
  chain: Chain,
  placeholderData: ChainStats = { latency: 0, blockNumber: 0 },
) {
  const rpcUrl = getDashboardChainRpc(chain);

  return useQuery({
    queryKey: ["chain_stats", { chainId: chain.chainId, rpcUrl }],
    queryFn: async () => {
      // we'll just ... manually fetch?
      const startTimeStamp = performance.now();
      const res = await fetch(rpcUrl, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });

      const json = await res.json();
      const latency = performance.now() - startTimeStamp;

      return {
        latency,
        blockNumber: parseInt(json.result, 16),
      };
    },
    refetchInterval: 5 * 1000,
    enabled: !!rpcUrl,
    placeholderData,
  });
}

const ChainPage: ThirdwebNextPage = ({ chain }: EVMContractProps) => {
  const configuredChainRecord = useConfiguredChainsRecord();
  const updateConfiguredNetworks = useUpdateConfiguredChains();
  const trackEvent = useTrack();
  const isConfigured = useMemo(() => {
    return (
      chain.chainId in configuredChainRecord &&
      !configuredChainRecord[chain.chainId].isAutoConfigured
    );
  }, [chain.chainId, configuredChainRecord]);

  const rpcStats = useChainStats(chain);
  const toast = useToast();

  const { hasCopied, onCopy } = useClipboard(chain.rpc[0]);

  const address = useAddress();

  return (
    <>
      <NextSeo
        title={`${chain.name} (${chain.nativeCurrency.symbol})`}
        // thx chatgpt - TODO replace with @juan approved desc
        description={`Build advanced decentralized applications easily with thirdweb on ${chain.name}. Deploy and interact with smart contracts quickly and efficiently.`}
        openGraph={{
          title: `${chain.name} (${chain.nativeCurrency.symbol})`,
          images: [
            {
              url: `${getAbsoluteUrl()}/api/og/chain/${chain.chainId}`,
              width: 1200,
              height: 630,
              alt: `${chain.name} (${chain.nativeCurrency.symbol}) on thirdweb`,
            },
          ],
        }}
      />
      <Container
        maxW="container.page"
        py={6}
        as={Flex}
        flexDirection="column"
        gap={10}
      >
        <Flex
          pt={10}
          justify="space-between"
          as="header"
          gap={4}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex gap={4} align="center" flexGrow={1}>
            <Center boxSize={12} overflow="hidden">
              <ChainIcon ipfsSrc={chain.icon?.url} size={48} />
            </Center>

            <Heading size="title.lg" as="h1">
              {chain.name} {chain.chain.length > 10 && <br />}
              <Box as="span" opacity={0.6} fontWeight={400} fontSize="0.8em">
                ({chain.chain})
              </Box>
            </Heading>

            <Box ml="auto">
              <ClientOnly ssr={null}>
                {isConfigured && (
                  <Tooltip
                    label="Added"
                    placement="top"
                    bg="bgBlack"
                    color="bgWhite"
                  >
                    <Flex>
                      <Icon
                        aria-label="Chain Added"
                        w={8}
                        h={8}
                        _dark={{
                          color: "green.300",
                        }}
                        _light={{
                          color: "green.600",
                        }}
                        as={FiCheck}
                      />
                    </Flex>
                  </Tooltip>
                )}
              </ClientOnly>
            </Box>
          </Flex>

          <ClientOnly ssr={null}>
            {!isConfigured && (
              <Button
                background="bgBlack"
                color="bgWhite"
                _hover={{
                  opacity: 0.8,
                }}
                leftIcon={<Icon w={5} h={5} color="inherit" as={IoIosAdd} />}
                onClick={() => {
                  updateConfiguredNetworks.add([chain]);
                  trackEvent({
                    category: CHAIN_CATEGORY,
                    chain,
                    action: "add_chain",
                    label: chain.slug,
                  });

                  toast({
                    title: "Chain added",
                    description: `You can now use ${chain.name} on Thirdweb`,
                    status: "success",
                    duration: 3000,
                  });
                }}
              >
                Add this chain
              </Button>
            )}
          </ClientOnly>
        </Flex>
        <Divider />
        <SimpleGrid as="section" columns={{ base: 6, md: 12 }} rowGap={12}>
          {chain.infoURL && (
            <ChainSectionElement colSpan={6} label="Info">
              <TrackedLink
                isExternal
                category={CHAIN_CATEGORY}
                label="info_url
            "
                href={chain.infoURL}
              >
                <Heading maxW="full" noOfLines={1} size="label.lg">
                  {chain.infoURL.split("//").at(-1)}
                </Heading>
              </TrackedLink>
            </ChainSectionElement>
          )}

          <ChainSectionElement colSpan={3} label="Chain ID">
            <Heading maxW="full" noOfLines={1} size="label.lg">
              {chain.chainId}
            </Heading>
          </ChainSectionElement>
          <ChainSectionElement colSpan={3} label="Native Token">
            <Heading maxW="full" noOfLines={1} size="label.lg">
              {chain.nativeCurrency.name} ({chain.nativeCurrency.symbol})
            </Heading>
          </ChainSectionElement>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 6, md: 12 }} rowGap={12}>
          <ChainSectionElement colSpan={6} label="RPC">
            <Flex gap={2}>
              <Heading maxW="full" noOfLines={2} size="label.lg">
                {chain.rpc[0].split(".com/")[0]}.com
              </Heading>
              <IconButton
                mt={-2}
                aria-label="copy rpc url"
                variant="ghost"
                size="sm"
                onClick={onCopy}
                icon={
                  hasCopied ? (
                    <Icon
                      color="green.400"
                      _light={{ color: "green.600" }}
                      as={FiCheck}
                    />
                  ) : (
                    <Icon as={FiCopy} />
                  )
                }
              />
            </Flex>
          </ChainSectionElement>
          <ChainSectionElement colSpan={3} label="Block Height">
            <Heading
              fontFamily="mono"
              maxW="full"
              noOfLines={1}
              size="label.lg"
            >
              {rpcStats.data?.blockNumber || 0}
            </Heading>
          </ChainSectionElement>
          <ChainSectionElement colSpan={3} label="Latency">
            <Heading
              fontFamily="mono"
              maxW="full"
              noOfLines={1}
              size="label.lg"
            >
              {(rpcStats.data?.latency || 0).toFixed(0)}
              <Text as="span" color="accent.700">
                {" "}
                ms
              </Text>
            </Heading>
          </ChainSectionElement>
        </SimpleGrid>
        {chain.faucets?.length ? (
          <ChainSectionElement colSpan={12} label="Faucets">
            <SimpleGrid columns={{ base: 6, md: 12 }} gridGap={6}>
              {chain.faucets.map((faucet) => {
                const url = new URL(faucet);
                const hostnameSplit = url.hostname.split(".");
                const tld = hostnameSplit.pop();
                const domain = hostnameSplit.pop();
                const displayTitle = `${domain}.${tld}`;
                // eslint-disable-next-line no-template-curly-in-string
                if (url.search.includes("${ADDRESS}")) {
                  if (address) {
                    // eslint-disable-next-line no-template-curly-in-string
                    url.search = url.search.replace("${ADDRESS}", address);
                  } else {
                    url.search = "";
                  }
                }
                return (
                  <GridItem
                    as={Card}
                    bg="transparent"
                    colSpan={3}
                    key={url.toString()}
                    gap={2}
                    display="flex"
                    flexDirection="column"
                  >
                    <Heading as="h5" size="label.md">
                      {displayTitle}
                    </Heading>
                    <TrackedLink
                      category={CHAIN_CATEGORY}
                      href={url.toString()}
                      label="faucet"
                      trackingProps={{
                        faucet: url.toString(),
                      }}
                      noOfLines={1}
                      isExternal
                    >
                      <Text size="body.sm">
                        {url.toString().split("://")[1]}
                      </Text>
                    </TrackedLink>
                  </GridItem>
                );
              })}
            </SimpleGrid>
          </ChainSectionElement>
        ) : null}
        {chain.explorers?.length ? (
          <ChainSectionElement colSpan={12} label="Explorers">
            <SimpleGrid columns={{ base: 6, md: 12 }} gridGap={6}>
              {chain.explorers.map((explorer) => {
                return (
                  <GridItem
                    as={Card}
                    bg="transparent"
                    colSpan={3}
                    key={explorer.url}
                    gap={2}
                    display="flex"
                    flexDirection="column"
                  >
                    <Heading as="h5" size="label.md">
                      {explorer.name}
                    </Heading>
                    <TrackedLink
                      category={CHAIN_CATEGORY}
                      href={explorer.url}
                      label="explorer"
                      trackingProps={{
                        explorerName: explorer.name,
                        explorerUrl: explorer.url,
                      }}
                      noOfLines={1}
                      isExternal
                    >
                      <Text size="body.sm">{explorer.url.split("://")[1]}</Text>
                    </TrackedLink>
                  </GridItem>
                );
              })}
            </SimpleGrid>
          </ChainSectionElement>
        ) : null}
      </Container>
    </>
  );
};

interface ChainSectionElementProps extends Pick<GridItemProps, "colSpan"> {
  label: string;
}

const ChainSectionElement: ComponentWithChildren<ChainSectionElementProps> = ({
  colSpan,
  label,
  children,
}) => {
  return (
    <GridItem colSpan={colSpan} as={Flex} flexDir="column" gap={2}>
      <Heading as="h3" size="label.lg" opacity={0.6} fontWeight={400}>
        {label}
      </Heading>
      {children}
    </GridItem>
  );
};

export default ChainPage;
ChainPage.pageId = PageId.DeployedContract;
ChainPage.getLayout = (page) => {
  // app layout has to come first in both getLayout and fallback
  return (
    <AppLayout
      layout={"custom-contract"}
      noSEOOverride
      // dehydratedState={props.dehydratedState}
      // has to be passed directly because the provider can not be above app layout in the tree
      // contractInfo={props.contractInfo}
    >
      {page}
    </AppLayout>
  );
};
// server side ---------------------------------------------------------------

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

  const chainRpc = getDashboardChainRpc(chain);

  if (!chainRpc) {
    return {
      notFound: true,
    };
  }

  // overwrite with the dashboard chain RPC (add the api key)
  chain.rpc = [chainRpc];

  return {
    props: {
      chain,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: false,
    paths: allChains.map((chain) => `/chain/${chain.slug}`),
  };
};
