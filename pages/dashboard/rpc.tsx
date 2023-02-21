import {
  Flex,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  LinkOverlay,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ConfigureNetworkButton } from "components/contract-components/shared/configure-network-button";
import { ChainIcon } from "components/icons/ChainIcon";
import { useConfiguredChains } from "hooks/chains/configureChains";
import { PageId } from "page-id";
import { BsCheck2Circle } from "react-icons/bs";
import { Card, Heading, Text, TrackedCopyButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "rpc";

export const DashboardRPC: ThirdwebNextPage = () => {
  const configuredChains = useConfiguredChains();

  return (
    <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
      <Flex justifyContent="space-between">
        <Heading size="title.lg" as="h1">
          RPC
        </Heading>
        <ConfigureNetworkButton label="rpc-page">
          Add Network
        </ConfigureNetworkButton>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {configuredChains.map((chain) => (
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
              </Flex>
              <Flex>
                <Flex flexDir="column" gap={1} w="full">
                  <Text opacity={0.6}>RPC URL</Text>
                  {chain.rpc.findIndex((c) => c.indexOf("thirdweb.com") > -1) >
                  -1 ? (
                    <InputGroup>
                      <Input
                        readOnly
                        value={`${chain.slug}.rpc.thirdweb.com`}
                      />
                      <InputRightElement>
                        <TrackedCopyButton
                          category={TRACKING_CATEGORY}
                          label="copy-rpc-url"
                          aria-label="Copy RPC url"
                          size="sm"
                          colorScheme={undefined}
                          value={`${chain.slug}.rpc.thirdweb.com`}
                        />
                      </InputRightElement>
                    </InputGroup>
                  ) : (
                    <Input
                      readOnly
                      isDisabled
                      pointerEvents="none"
                      value="Coming Soon"
                    />
                  )}
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
