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
import { NFTItem } from "components/nft/Item";
import { ListModal } from "components/nft/ListModal";
import { MintModal } from "components/nft/MintModal";
import { TransferModal } from "components/nft/TransferModal";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { useActiveNFTModule } from "context/sdk/modules/nft-context";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { FiFilePlus, FiPlusSquare } from "react-icons/fi";
import { CgToolbox } from "react-icons/cg";
import { useEthers } from "@usedapp/core";

const NFTListPage: NextPage = () => {
  const { account } = useEthers();
  const { metadata, address, isLoading, items } = useActiveNFTModule((c) => c);
  const [activeListing, setActiveListing] = useState<any>(null);
  const [activeTransfer, setActiveTransfer] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenListing,
    onOpen: onOpenListing,
    onClose: onCloseListing,
  } = useDisclosure();

  const {
    isOpen: isOpenTransfer,
    onOpen: onOpenTransfer,
    onClose: onCloseTransfer,
  } = useDisclosure();

  const onListItem = useCallback(
    (md) => {
      setActiveListing(md);
      onOpenListing();
    },
    [onOpenListing, setActiveListing],
  );

  const onTransferItem = useCallback(
    (md) => {
      setActiveTransfer(md);
      onOpenTransfer();
    },
    [setActiveTransfer, onOpenTransfer],
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

  const renderName = metadata?.name || address || "NFT Module";

  return (
    <>
      <MintModal isOpen={isOpen} onClose={onClose} />
      <ListModal
        isOpen={isOpenListing}
        onClose={onCloseListing}
        metadata={activeListing}
      />
      <TransferModal
        isOpen={isOpenTransfer}
        onClose={onCloseTransfer}
        nft={activeTransfer}
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
            items
              .filter(({ owner }) => owner === account)
              .map(({ metadata: nft }, idx) => (
                <NFTItem
                  key={nft.id}
                  nft={nft as any}
                  idx={idx}
                  onList={onListItem}
                  onTransfer={onTransferItem}
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

export default NFTListPage;
