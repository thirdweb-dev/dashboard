import { Box, Container, Flex, IconButton, SimpleGrid } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { LinkCard } from "components/link-card";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Card, Heading } from "tw-components";

export default function DeployContract() {
  const wallet = useSingleQueryParam("wallet") || "dashboard";
  const network = useSingleQueryParam("network");
  const router = useRouter();
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
              href={`/contracts/new/token`}
              title="Create NFTs and Tokens"
              subtitle="Mint your own NFTs, packs and other tokens"
            />
            <LinkCard
              largeIcon
              bg="backgroundCardHighlight"
              borderWidth="2px"
              src={require("/public/assets/add-contract/drop.png")}
              alt="drop"
              href={`/contracts/new/drop`}
              title="Release a drop"
              subtitle=" Set up a drop that can be claimed by others"
            />
            <LinkCard
              largeIcon
              bg="backgroundCardHighlight"
              borderWidth="2px"
              src={require("/public/assets/add-contract/marketplace.png")}
              alt="marketplace"
              href={`/contracts/new/marketplace/marketplace`}
              title="Setup Marketplace"
              subtitle="Create marketplaces to list or auction assets"
            />
            <LinkCard
              largeIcon
              bg="backgroundCardHighlight"
              borderWidth="2px"
              src={require("/public/assets/add-contract/governance.png")}
              alt="governance"
              href={`/contracts/new/governance`}
              title="Governance & Splits"
              subtitle="Establish decentralized governance and split revenue"
            />
          </SimpleGrid>
        </Container>
      </Flex>
    </Card>
  );
}

DeployContract.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
