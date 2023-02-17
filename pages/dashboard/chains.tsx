import { Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ChainIcon } from "components/icons/ChainIcon";
import { PageId } from "page-id";
import { BsCheck2Circle } from "react-icons/bs";
import { Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

export const DashboardChains: ThirdwebNextPage = () => {
  return (
    <Flex flexDir="column" gap={8} mt={10}>
      <Heading size="title.lg" as="h1">
        Chains
      </Heading>
      <Flex>search</Flex>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
        <Card as={Flex} flexDir="column" gap={6} p={6}>
          <Flex justifyContent="space-between">
            <Flex alignItems="center" gap={2}>
              <ChainIcon size={20} ipfsSrc="" sizes={[]} />
              <Heading size="subtitle.sm" as="h3">
                Ethereum
              </Heading>
            </Flex>
            <Flex alignItems="center">
              <Icon as={BsCheck2Circle} color="green.500" boxSize={6} />
            </Flex>
          </Flex>
          <Flex gap={12}>
            <Flex flexDir="column" gap={1}>
              <Text color="paragraph">Chain ID</Text>
              <Text size="label.md">5</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text color="paragraph">Native Token</Text>
              <Text size="label.md">ETH</Text>
            </Flex>
          </Flex>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};

DashboardChains.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);
DashboardChains.pageId = PageId.DashboardChains;

export default DashboardChains;
