import {
  Flex,
  GridItem,
  Icon,
  Input,
  LinkOverlay,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ChainIcon } from "components/icons/ChainIcon";
import Fuse from "fuse.js";
import { useAllChainsData } from "hooks/chains/allChains";
import { useConfiguredChains } from "hooks/chains/configureChains";
import { PageId } from "page-id";
import { useDeferredValue, useMemo, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

export const DashboardRPC: ThirdwebNextPage = () => {
  const { allChains } = useAllChainsData();
  const configuredChains = useConfiguredChains();
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(allChains, {
      keys: [
        {
          name: "name",
          weight: 2,
        },
        {
          name: "chainId",
          weight: 1,
        },
      ],
    });
  }, [allChains]);

  const deferredSearchTerm = useDeferredValue(query);

  const filteredChains = useMemo(() => {
    if (!deferredSearchTerm || !allChains.length) {
      return allChains || [];
    }

    return fuse.search(deferredSearchTerm).map((e) => e.item);
  }, [allChains, deferredSearchTerm, fuse]);

  return (
    <Flex flexDir="column" gap={8} mt={10}>
      <Heading size="title.lg" as="h1">
        RPC
      </Heading>
      <Flex>
        <Input
          spellCheck="false"
          autoComplete="off"
          bg="transparent"
          placeholder="Search by name or chain ID"
          borderColor="borderColor"
          w={{ base: "full", md: "40%" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {filteredChains.slice(0, 100).map((chain) => (
          <LinkOverlay
            key={chain.chainId}
            href={`/${chain.slug}`}
            position="relative"
            role="group"
          >
            <Card
              as={Flex}
              flexDir="column"
              gap={6}
              p={6}
              bg="transparent"
              _groupHover={{ borderColor: "blue.500" }}
              position="relative"
            >
              <Flex justifyContent="space-between">
                <Flex alignItems="center" gap={2}>
                  <ChainIcon size={20} ipfsSrc={chain?.icon?.url} sizes={[]} />
                  <Heading size="subtitle.sm" as="h3" noOfLines={1}>
                    {chain.name}
                  </Heading>
                </Flex>
                {configuredChains
                  .map(({ chainId }) => chainId === chain.chainId)
                  .some((e) => e) ? (
                  <Tooltip
                    p={0}
                    ml={3}
                    label={
                      <Flex p={2}>
                        <Text>Added to dashboard</Text>
                      </Flex>
                    }
                    bgColor="backgroundCardHighlight"
                    borderRadius="xl"
                    placement="right"
                    shouldWrapChildren
                    position="absolute"
                  >
                    <Flex alignItems="center">
                      <Icon as={BsCheck2Circle} color="green.500" boxSize={6} />
                    </Flex>
                  </Tooltip>
                ) : null}
              </Flex>
              <Flex>
                <Flex flexDir="column" gap={1}>
                  <Text opacity={0.6}>RPC URL</Text>
                  <Flex>
                    <Text size="label.md">{`${chain.slug}.rpc.thirdweb.com`}</Text>
                  </Flex>
                </Flex>
              </Flex>
              <SimpleGrid gap={12} columns={12}>
                <Flex as={GridItem} colSpan={4} flexDir="column" gap={1}>
                  <Text opacity={0.6}>Chain ID</Text>
                  <Text size="label.md">{chain.chainId}</Text>
                </Flex>
                <Flex as={GridItem} flexDir="column" colSpan={8} gap={1}>
                  <Text opacity={0.6}>Native Token</Text>
                  <Text size="label.md">{chain.nativeCurrency.symbol}</Text>
                </Flex>
              </SimpleGrid>
            </Card>
          </LinkOverlay>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

DashboardRPC.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);
DashboardRPC.pageId = PageId.DashboardRPC;

export default DashboardRPC;
