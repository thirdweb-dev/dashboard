import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { PublishMetadata } from "components/contract-components/publish-metdata-card";
import { Card } from "components/layout/Card";
import { LinkCard } from "components/link-card";
import { LinkButton } from "components/shared/LinkButton";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { ConsolePage } from "pages/_app";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";

function usePublishedContractsQuery() {
  const sdk = useSDK();
  const address = useAddress();
  return useQueryWithNetwork(
    ["byoc-list", address],
    async () => {
      return address && sdk
        ? (await sdk.publisher.getAll(address)).filter((c) => c.id)
        : [];
    },
    {
      enabled: !!address && !!sdk,
    },
  );
}

const DeployContract: ConsolePage = () => {
  const wallet = useSingleQueryParam("wallet") || "dashboard";
  const network = useSingleQueryParam("network");
  const router = useRouter();
  const publishedContracts = usePublishedContractsQuery();

  return (
    <Card px={{ base: 4, md: 10 }} py={{ base: 6, md: 10 }}>
      <Flex direction="column" gap={8}>
        <Flex align="center" justify="space-between">
          <IconButton
            onClick={() => router.back()}
            size="sm"
            aria-label="back"
            icon={<FiChevronLeft />}
          />
          <Heading size="title.lg">What do you want to build?</Heading>
          <Box />
        </Flex>
        <Container maxW="container.md">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 3, md: 5 }}>
            <LinkCard
              largeIcon
              bg="backgroundCardHighlight"
              borderWidth="2px"
              src={require("/public/assets/add-contract/nft.png")}
              alt="token"
              href={`/${wallet}/${network}/new/token`}
              title="Create NFTs and Tokens"
              subtitle="Mint your own NFTs, packs and other tokens"
            />
            <LinkCard
              largeIcon
              bg="backgroundCardHighlight"
              borderWidth="2px"
              src={require("/public/assets/add-contract/drop.png")}
              alt="drop"
              href={`/${wallet}/${network}/new/drop`}
              title="Release a drop"
              subtitle=" Set up a drop that can be claimed by others"
            />
            <LinkCard
              largeIcon
              bg="backgroundCardHighlight"
              borderWidth="2px"
              src={require("/public/assets/add-contract/marketplace.png")}
              alt="marketplace"
              href={`/${wallet}/${network}/new/marketplace`}
              title="Setup Marketplace"
              subtitle="Create marketplaces to list or auction assets"
            />
            <LinkCard
              largeIcon
              bg="backgroundCardHighlight"
              borderWidth="2px"
              src={require("/public/assets/add-contract/governance.png")}
              alt="governance"
              href={`/${wallet}/${network}/new/governance`}
              title="Governance & Splits"
              subtitle="Establish decentralized governance and split revenue"
            />
          </SimpleGrid>
        </Container>
        {publishedContracts.data?.length ? (
          <Flex direction="column" gap={4}>
            <Heading textAlign="center" size="subtitle.sm">
              Published contracts
            </Heading>
            <SimpleGrid columns={2} gap={5}>
              {publishedContracts.data?.map((contract) => (
                <Flex
                  key={`${contract.id}_${contract.metadataUri}`}
                  direction="column"
                  gap={1}
                >
                  <PublishMetadata
                    uri={contract.metadataUri}
                    bg="backgroundCardHighlight"
                  />
                  <LinkButton
                    href={`/contracts/deploy?contract=${contract.metadataUri.replace(
                      "ipfs://",
                      "",
                    )}`}
                    colorScheme="primary"
                  >
                    Deploy
                  </LinkButton>
                </Flex>
              ))}
            </SimpleGrid>
          </Flex>
        ) : null}
      </Flex>
    </Card>
  );
};

DeployContract.Layout = AppLayout;

export default DeployContract;
