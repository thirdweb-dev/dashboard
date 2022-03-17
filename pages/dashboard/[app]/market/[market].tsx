import {
  Flex,
  Heading,
  HStack,
  Stack,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { MarketItem } from "components/market/Item";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { useActiveMarketModule } from "context/sdk/modules/market-context";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
// import { FiFilePlus } from "react-icons/fi";

const MarketPage: NextPage = () => {
  const { metadata, address, items } = useActiveMarketModule((c) => c);

  const renderName = metadata?.name || address || "Market Module";

  return (
    <>
      <Head>
        <title>{renderName} | Console</title>
      </Head>
      <Stack spacing={16} my={8}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justify="space-between"
          align="center"
        >
          <Heading size="2xl">{renderName}</Heading>
          <HStack>
            {address && (
              <AddressCopyButton
                my={2}
                colorScheme="blackAlpha"
                variant="outline"
                address={address}
              />
            )}
            {/* <Button
              onClick={onOpen}
              colorScheme="teal"
              rightIcon={<Icon as={FiFilePlus} />}
            >
              Mint
            </Button> */}
          </HStack>
        </Flex>
        <Wrap>
          {items.map((listing: any) => {
            return <MarketItem key={listing?.id} listing={listing} />;
          })}
        </Wrap>
      </Stack>
    </>
  );
};

export default MarketPage;
