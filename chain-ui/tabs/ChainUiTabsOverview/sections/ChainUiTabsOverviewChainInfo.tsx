import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { ChainUiComponentsSectionElement } from "chain-ui/components/ChainUiComponentsSectionElement";
import { useChainUiHooksChainStats } from "chain-ui/hooks/useChainUiHooksChainStats";
import { CHAIN_CATEGORY } from "pages/chain/[chainSlug]";
import { Heading, Text, TrackedCopyButton, TrackedLink } from "tw-components";

export const ChainUiTabsOverviewChainInfo: React.FC<{ chain: Chain }> = ({
  chain,
}) => {
  const rpcStats = useChainUiHooksChainStats(chain);

  return (
    <>
      <SimpleGrid as="section" columns={{ base: 6, md: 12 }} rowGap={12}>
        {chain.infoURL && (
          <ChainUiComponentsSectionElement colSpan={6} label="Info">
            <TrackedLink
              isExternal
              category={CHAIN_CATEGORY}
              label="info_url"
              href={chain.infoURL}
            >
              <Heading maxW="full" noOfLines={1} size="label.lg">
                {chain.infoURL.split("//").pop()}
              </Heading>
            </TrackedLink>
          </ChainUiComponentsSectionElement>
        )}

        <ChainUiComponentsSectionElement colSpan={3} label="Chain ID">
          <Heading maxW="full" noOfLines={1} size="label.lg">
            {chain.chainId}
          </Heading>
        </ChainUiComponentsSectionElement>
        <ChainUiComponentsSectionElement colSpan={3} label="Native Token">
          <Heading maxW="full" noOfLines={1} size="label.lg">
            {chain.nativeCurrency.name} ({chain.nativeCurrency.symbol})
          </Heading>
        </ChainUiComponentsSectionElement>
      </SimpleGrid>
      {/* only render rpc section if we have an rpc for this chain */}
      {chain.rpc?.[0] ? (
        <SimpleGrid columns={{ base: 6, md: 12 }} rowGap={12}>
          <ChainUiComponentsSectionElement
            colSpan={6}
            label="RPC"
            status={
              rpcStats.isSuccess ? "good" : rpcStats.isError ? "bad" : "neutral"
            }
          >
            <Flex gap={2}>
              <Heading maxW="full" noOfLines={2} size="label.lg">
                {chain.rpc[0].split(".com/")[0]}.com
              </Heading>
              <TrackedCopyButton
                category={CHAIN_CATEGORY}
                label="copy-rpc-url"
                mt={-2}
                aria-label="Copy RPC url"
                variant="ghost"
                size="sm"
                value={`${chain.rpc[0].split(".com/")[0]}.com`}
              />
            </Flex>
          </ChainUiComponentsSectionElement>
          <ChainUiComponentsSectionElement colSpan={3} label="Block Height">
            <Heading
              fontFamily="mono"
              maxW="full"
              noOfLines={1}
              size="label.lg"
            >
              {rpcStats.data?.blockNumber || 0}
            </Heading>
          </ChainUiComponentsSectionElement>
          <ChainUiComponentsSectionElement colSpan={3} label="Latency">
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
          </ChainUiComponentsSectionElement>
        </SimpleGrid>
      ) : null}
    </>
  );
};
