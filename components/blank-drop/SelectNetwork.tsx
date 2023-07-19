import { Flex, SimpleGrid } from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Card, Heading, Link } from "tw-components";
import { blankDropAllowedNetworks } from "./allowedNetworks";

export const BlankDropSelectNetwork = () => {
  return (
    <Flex flexDir="column" gap={6}>
      <Heading size="display.sm" textAlign="center">
        Choose your network
      </Heading>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={6}>
        {blankDropAllowedNetworks.map((network) => (
          <Link key={network.chainId} href={`/blank-drop/${network.slug}`}>
            <Card px={8} py={0} as={Flex} bg="backgroundCardHighlight">
              <MediaRenderer src={network.icon.url} />
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
