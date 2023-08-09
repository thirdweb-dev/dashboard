import {
  Flex,
  GridItem,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { useAddress } from "@thirdweb-dev/react";
import { ChainUiComponentsSectionElement } from "chain-ui/components/ChainUiComponentsSectionElement";
import { CHAIN_CATEGORY } from "pages/chain/[chainSlug]";
import { FiExternalLink } from "react-icons/fi";
import { Card, Heading, Text, TrackedLink } from "tw-components";

export const ChainUiTabsOverviewChainReferences: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const address = useAddress();

  return (
    <>
      {chain.faucets?.length ? (
        <ChainUiComponentsSectionElement colSpan={12} label="Faucets">
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
                <GridItem colSpan={{ base: 6, md: 3 }} key={url.toString()}>
                  <Card
                    as={LinkBox}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                  >
                    <Flex gap={2} direction="column" maxW="75%">
                      <Heading as="h5" size="label.md" noOfLines={1}>
                        {displayTitle}
                      </Heading>
                      <LinkOverlay
                        as={TrackedLink}
                        category={CHAIN_CATEGORY}
                        href={url.toString()}
                        label="faucet"
                        trackingProps={{
                          faucet: url.toString(),
                        }}
                        isExternal
                      >
                        <Text size="body.sm" noOfLines={1}>
                          {url.toString().split("://")[1]}
                        </Text>
                      </LinkOverlay>
                    </Flex>
                    <Icon flexShrink={0} as={FiExternalLink} />
                  </Card>
                </GridItem>
              );
            })}
          </SimpleGrid>
        </ChainUiComponentsSectionElement>
      ) : null}
      {chain.explorers?.length ? (
        <ChainUiComponentsSectionElement colSpan={12} label="Explorers">
          <SimpleGrid columns={{ base: 6, md: 12 }} gridGap={6}>
            {chain.explorers.map((explorer) => {
              return (
                <GridItem colSpan={{ base: 6, md: 3 }} key={explorer.url}>
                  <Card
                    as={LinkBox}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Flex direction="column" gap={2} maxW="75%">
                      <Heading as="h5" size="label.md">
                        {explorer.name}
                      </Heading>
                      <LinkOverlay
                        as={TrackedLink}
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
                        <Text size="body.sm">
                          {explorer.url.split("://")[1]}
                        </Text>
                      </LinkOverlay>
                    </Flex>
                    <Icon as={FiExternalLink} />
                  </Card>
                </GridItem>
              );
            })}
          </SimpleGrid>
        </ChainUiComponentsSectionElement>
      ) : null}
    </>
  );
};
