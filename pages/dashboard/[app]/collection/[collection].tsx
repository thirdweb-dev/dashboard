import {
  Button,
  Center,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { CollectionItem } from "components/collection/Item";
import { ListModal } from "components/collection/ListModal";
import { MintModal } from "components/collection/MintModal";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { useActiveCollectionModule } from "context/sdk/modules/collection-context";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { FiFilePlus, FiPlusSquare } from "react-icons/fi";
import { CgToolbox } from "react-icons/cg";

const CollectionListPage: NextPage = () => {
  const { metadata, address, isLoading, items } = useActiveCollectionModule(
    (c) => c,
  );
  const [activeListing, setActiveListing] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenListing,
    onOpen: onOpenListing,
    onClose: onCloseListing,
  } = useDisclosure();

  const onListItem = useCallback(
    (md) => {
      setActiveListing(md);
      onOpenListing();
    },
    [onOpenListing],
  );

  if (isLoading || !address) {
    return (
      <Center p={16}>
        <HStack>
          <Spinner size="sm" />
          <Text>Loading Module</Text>
        </HStack>
      </Center>
    );
  }

  const renderName = metadata?.name || address || "Collection Module";

  return (
    <>
      <MintModal isOpen={isOpen} onClose={onClose} />
      <ListModal
        isOpen={isOpenListing}
        onClose={onCloseListing}
        metadata={activeListing}
      />
      <Head>
        <title>{renderName} | Console</title>
      </Head>
      <Stack spacing={16} my={8}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justify="space-between"
          align="center"
        >
          <Flex flexDirection="column">
            <Heading size="2xl">{renderName}</Heading>
            <Text>{metadata?.description}</Text>
          </Flex>
          <HStack>
            {address && (
              <AddressCopyButton
                my={2}
                colorScheme="blackAlpha"
                variant="outline"
                address={address}
              />
            )}
            <Button
              onClick={onOpen}
              colorScheme="teal"
              rightIcon={<Icon as={FiFilePlus} />}
            >
              Mint
            </Button>
          </HStack>
        </Flex>
        <Wrap>
          {items.length ? (
            items.map((collection, idx) => (
              <CollectionItem
                key={collection.metadata?.id}
                collection={collection}
                idx={idx}
                onList={onListItem}
              />
            ))
          ) : (
            <Center width="100%">
              <Box textAlign="center">
                <Icon as={CgToolbox} boxSize={128} color="gray.300" />
                <Heading size="md" mt={8}>
                  You have no NFTs minted
                </Heading>{" "}
                <Button
                  mt={8}
                  leftIcon={<Icon as={FiPlusSquare} boxSize={4} />}
                  textDecor="none!important"
                  colorScheme="teal"
                  onClick={onOpen}
                >
                  Mint a NFT
                </Button>
              </Box>
            </Center>
          )}
        </Wrap>
      </Stack>
    </>
  );
};

export default CollectionListPage;
